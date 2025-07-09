# 📋 任务5: 性能优化实现

## 5.1 输出缓存策略

### 5.1.1 多层缓存服务

```csharp
// Services/CacheService.cs
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;

public interface ICacheService
{
    Task<T> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
    Task RemovePatternAsync(string pattern);
    Task ClearAllAsync();
    Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expiration = null);
}

public class CacheService : ICacheService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IDistributedCache _distributedCache;
    private readonly ILogger<CacheService> _logger;
    private readonly CacheOptions _options;

    public CacheService(
        IMemoryCache memoryCache,
        IDistributedCache distributedCache,
        ILogger<CacheService> logger,
        IOptions<CacheOptions> options)
    {
        _memoryCache = memoryCache;
        _distributedCache = distributedCache;
        _logger = logger;
        _options = options.Value;
    }

    public async Task<T> GetAsync<T>(string key)
    {
        try
        {
            // 首先检查内存缓存
            if (_memoryCache.TryGetValue(key, out T value))
            {
                _logger.LogDebug("Cache hit (Memory): {Key}", key);
                return value;
            }

            // 然后检查分布式缓存
            var distributedValue = await _distributedCache.GetStringAsync(key);
            if (!string.IsNullOrEmpty(distributedValue))
            {
                var deserializedValue = JsonSerializer.Deserialize<T>(distributedValue);
                
                // 将分布式缓存的值放入内存缓存
                _memoryCache.Set(key, deserializedValue, TimeSpan.FromMinutes(_options.MemoryCacheExpirationMinutes));
                
                _logger.LogDebug("Cache hit (Distributed): {Key}", key);
                return deserializedValue;
            }

            _logger.LogDebug("Cache miss: {Key}", key);
            return default(T);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting cache value for key: {Key}", key);
            return default(T);
        }
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        try
        {
            var exp = expiration ?? TimeSpan.FromMinutes(_options.DefaultExpirationMinutes);
            
            // 设置内存缓存
            _memoryCache.Set(key, value, exp);
            
            // 设置分布式缓存
            var serializedValue = JsonSerializer.Serialize(value);
            var distributedOptions = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = exp
            };
            
            await _distributedCache.SetStringAsync(key, serializedValue, distributedOptions);
            
            _logger.LogDebug("Cache set: {Key}, Expiration: {Expiration}", key, exp);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error setting cache value for key: {Key}", key);
        }
    }

    public async Task RemoveAsync(string key)
    {
        try
        {
            _memoryCache.Remove(key);
            await _distributedCache.RemoveAsync(key);
            
            _logger.LogDebug("Cache removed: {Key}", key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing cache value for key: {Key}", key);
        }
    }

    public async Task RemovePatternAsync(string pattern)
    {
        try
        {
            // 对于内存缓存，需要通过反射获取所有键
            var field = typeof(MemoryCache).GetField("_coherentState", BindingFlags.NonPublic | BindingFlags.Instance);
            var coherentState = field?.GetValue(_memoryCache);
            var entriesCollection = coherentState?.GetType().GetProperty("EntriesCollection", BindingFlags.NonPublic | BindingFlags.Instance);
            var entries = (IDictionary)entriesCollection?.GetValue(coherentState);

            if (entries != null)
            {
                var keysToRemove = new List<object>();
                foreach (DictionaryEntry entry in entries)
                {
                    if (entry.Key.ToString().Contains(pattern))
                    {
                        keysToRemove.Add(entry.Key);
                    }
                }

                foreach (var key in keysToRemove)
                {
                    _memoryCache.Remove(key);
                }
            }

            // 对于分布式缓存，这里使用Redis的模式删除
            if (_distributedCache is IRedisCache redisCache)
            {
                await redisCache.RemovePatternAsync(pattern);
            }

            _logger.LogDebug("Cache pattern removed: {Pattern}", pattern);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing cache pattern: {Pattern}", pattern);
        }
    }

    public async Task ClearAllAsync()
    {
        try
        {
            // 清空内存缓存
            if (_memoryCache is MemoryCache mc)
            {
                mc.Compact(1.0);
            }

            // 清空分布式缓存
            if (_distributedCache is IRedisCache redisCache)
            {
                await redisCache.FlushAllAsync();
            }

            _logger.LogDebug("All cache cleared");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error clearing all cache");
        }
    }

    public async Task<T> GetOrSetAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expiration = null)
    {
        var value = await GetAsync<T>(key);
        
        if (value != null)
        {
            return value;
        }

        value = await factory();
        
        if (value != null)
        {
            await SetAsync(key, value, expiration);
        }

        return value;
    }
}

// Configuration/CacheOptions.cs
public class CacheOptions
{
    public int DefaultExpirationMinutes { get; set; } = 30;
    public int MemoryCacheExpirationMinutes { get; set; } = 5;
    public int ApiCacheExpirationMinutes { get; set; } = 15;
    public int ContentCacheExpirationMinutes { get; set; } = 60;
    public int MediaCacheExpirationMinutes { get; set; } = 120;
    public bool EnableDistributedCache { get; set; } = true;
    public string RedisConnectionString { get; set; }
}
```

### 5.1.2 缓存键生成器

```csharp
// Services/CacheKeyGenerator.cs
public interface ICacheKeyGenerator
{
    string GenerateContentKey(string contentType, int? id = null, string culture = null);
    string GenerateApiKey(string endpoint, object parameters = null);
    string GenerateMediaKey(int mediaId);
    string GenerateSearchKey(string query, string contentType = null);
    string GenerateListKey(string contentType, int page, int pageSize, string filter = null);
}

public class CacheKeyGenerator : ICacheKeyGenerator
{
    private const string CONTENT_PREFIX = "content";
    private const string API_PREFIX = "api";
    private const string MEDIA_PREFIX = "media";
    private const string SEARCH_PREFIX = "search";
    private const string LIST_PREFIX = "list";

    public string GenerateContentKey(string contentType, int? id = null, string culture = null)
    {
        var key = $"{CONTENT_PREFIX}:{contentType}";
        
        if (id.HasValue)
        {
            key += $":{id}";
        }
        
        if (!string.IsNullOrEmpty(culture))
        {
            key += $":{culture}";
        }
        
        return key;
    }

    public string GenerateApiKey(string endpoint, object parameters = null)
    {
        var key = $"{API_PREFIX}:{endpoint}";
        
        if (parameters != null)
        {
            var paramString = JsonSerializer.Serialize(parameters);
            var paramHash = ComputeHash(paramString);
            key += $":{paramHash}";
        }
        
        return key;
    }

    public string GenerateMediaKey(int mediaId)
    {
        return $"{MEDIA_PREFIX}:{mediaId}";
    }

    public string GenerateSearchKey(string query, string contentType = null)
    {
        var key = $"{SEARCH_PREFIX}:{ComputeHash(query)}";
        
        if (!string.IsNullOrEmpty(contentType))
        {
            key += $":{contentType}";
        }
        
        return key;
    }

    public string GenerateListKey(string contentType, int page, int pageSize, string filter = null)
    {
        var key = $"{LIST_PREFIX}:{contentType}:{page}:{pageSize}";
        
        if (!string.IsNullOrEmpty(filter))
        {
            key += $":{ComputeHash(filter)}";
        }
        
        return key;
    }

    private string ComputeHash(string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes)[..8]; // 取前8位作为短hash
    }
}
```

### 5.1.3 缓存标签和依赖

```csharp
// Services/CacheTagService.cs
public interface ICacheTagService
{
    Task InvalidateTagAsync(string tag);
    Task InvalidateTagsAsync(params string[] tags);
    Task<string[]> GetTagsForContent(string contentType, int contentId);
    Task<string[]> GetTagsForContentType(string contentType);
}

public class CacheTagService : ICacheTagService
{
    private readonly ICacheService _cacheService;
    private readonly ILogger<CacheTagService> _logger;

    public CacheTagService(ICacheService cacheService, ILogger<CacheTagService> logger)
    {
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task InvalidateTagAsync(string tag)
    {
        try
        {
            await _cacheService.RemovePatternAsync(tag);
            _logger.LogInformation("Cache invalidated for tag: {Tag}", tag);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error invalidating cache tag: {Tag}", tag);
        }
    }

    public async Task InvalidateTagsAsync(params string[] tags)
    {
        var tasks = tags.Select(tag => InvalidateTagAsync(tag));
        await Task.WhenAll(tasks);
    }

    public async Task<string[]> GetTagsForContent(string contentType, int contentId)
    {
        var tags = new List<string>
        {
            $"content:{contentType}",
            $"content:{contentType}:{contentId}",
            $"content:all",
            $"api:{contentType}",
            $"list:{contentType}"
        };

        // 根据内容类型添加特定标签
        switch (contentType)
        {
            case "caseStudy":
                tags.Add("api:case-studies");
                tags.Add("search:case-study");
                break;
            case "carbonInsight":
                tags.Add("api:carbon-insights");
                tags.Add("search:carbon-insight");
                break;
            case "project":
                tags.Add("api:projects");
                tags.Add("search:project");
                break;
            case "businessService":
                tags.Add("api:services");
                break;
        }

        return tags.ToArray();
    }

    public async Task<string[]> GetTagsForContentType(string contentType)
    {
        var tags = new List<string>
        {
            $"content:{contentType}",
            $"api:{contentType}",
            $"list:{contentType}",
            $"search:{contentType}"
        };

        return tags.ToArray();
    }
}
```

## 5.2 数据库查询优化

### 5.2.1 Examine搜索引擎集成

```csharp
// Services/SearchService.cs
using Examine;
using Examine.Search;

public interface ISearchService
{
    Task<SearchResult<T>> SearchAsync<T>(string query, string contentType = null, int page = 1, int pageSize = 10);
    Task<SearchResult<T>> SearchByFieldAsync<T>(string field, string value, string contentType = null, int page = 1, int pageSize = 10);
    Task<IEnumerable<string>> GetSuggestionsAsync(string query, int maxSuggestions = 10);
    Task RebuildIndexAsync();
}

public class SearchService : ISearchService
{
    private readonly IExamineManager _examineManager;
    private readonly IPublishedContentQuery _contentQuery;
    private readonly ICacheService _cacheService;
    private readonly ILogger<SearchService> _logger;

    public SearchService(
        IExamineManager examineManager,
        IPublishedContentQuery contentQuery,
        ICacheService cacheService,
        ILogger<SearchService> logger)
    {
        _examineManager = examineManager;
        _contentQuery = contentQuery;
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task<SearchResult<T>> SearchAsync<T>(string query, string contentType = null, int page = 1, int pageSize = 10)
    {
        try
        {
            var cacheKey = $"search:{ComputeHash(query)}:{contentType}:{page}:{pageSize}";
            
            return await _cacheService.GetOrSetAsync(cacheKey, async () =>
            {
                if (!_examineManager.TryGetIndex("ExternalIndex", out var index))
                {
                    throw new InvalidOperationException("External index not found");
                }

                var searcher = index.Searcher;
                var searchBuilder = searcher.CreateQuery("content");

                // 构建搜索查询
                var searchQuery = searchBuilder.GroupedAnd(
                    new[] { "nodeName", "title", "summary", "content", "description" },
                    query.MultipleCharacterWildcard());

                // 按内容类型过滤
                if (!string.IsNullOrEmpty(contentType))
                {
                    searchQuery = searchQuery.And().Field("contentTypeAlias", contentType);
                }

                // 只搜索已发布的内容
                searchQuery = searchQuery.And().Field("published", "y");

                // 执行搜索
                var results = searchQuery.Execute();
                
                var totalCount = results.TotalItemCount;
                var items = results
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(result => ConvertToSearchItem<T>(result))
                    .Where(item => item != null)
                    .ToList();

                return new SearchResult<T>
                {
                    Items = items,
                    TotalCount = totalCount,
                    Page = page,
                    PageSize = pageSize,
                    Query = query
                };
            }, TimeSpan.FromMinutes(10));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error performing search for query: {Query}", query);
            return new SearchResult<T>
            {
                Items = new List<T>(),
                TotalCount = 0,
                Page = page,
                PageSize = pageSize,
                Query = query
            };
        }
    }

    public async Task<SearchResult<T>> SearchByFieldAsync<T>(string field, string value, string contentType = null, int page = 1, int pageSize = 10)
    {
        try
        {
            var cacheKey = $"search:field:{field}:{ComputeHash(value)}:{contentType}:{page}:{pageSize}";
            
            return await _cacheService.GetOrSetAsync(cacheKey, async () =>
            {
                if (!_examineManager.TryGetIndex("ExternalIndex", out var index))
                {
                    throw new InvalidOperationException("External index not found");
                }

                var searcher = index.Searcher;
                var searchBuilder = searcher.CreateQuery("content");

                var searchQuery = searchBuilder.Field(field, value);

                if (!string.IsNullOrEmpty(contentType))
                {
                    searchQuery = searchQuery.And().Field("contentTypeAlias", contentType);
                }

                searchQuery = searchQuery.And().Field("published", "y");

                var results = searchQuery.Execute();
                
                var totalCount = results.TotalItemCount;
                var items = results
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Select(result => ConvertToSearchItem<T>(result))
                    .Where(item => item != null)
                    .ToList();

                return new SearchResult<T>
                {
                    Items = items,
                    TotalCount = totalCount,
                    Page = page,
                    PageSize = pageSize,
                    Query = $"{field}:{value}"
                };
            }, TimeSpan.FromMinutes(15));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error performing field search for {Field}:{Value}", field, value);
            return new SearchResult<T>();
        }
    }

    public async Task<IEnumerable<string>> GetSuggestionsAsync(string query, int maxSuggestions = 10)
    {
        try
        {
            var cacheKey = $"suggestions:{ComputeHash(query)}:{maxSuggestions}";
            
            return await _cacheService.GetOrSetAsync(cacheKey, async () =>
            {
                if (!_examineManager.TryGetIndex("ExternalIndex", out var index))
                {
                    return new List<string>();
                }

                var searcher = index.Searcher;
                var searchBuilder = searcher.CreateQuery("content");

                var searchQuery = searchBuilder
                    .GroupedAnd(new[] { "nodeName", "title" }, query.MultipleCharacterWildcard())
                    .And().Field("published", "y");

                var results = searchQuery.Execute();
                
                return results
                    .Take(maxSuggestions)
                    .Select(result => result.Values["nodeName"])
                    .Where(name => !string.IsNullOrEmpty(name))
                    .Distinct()
                    .ToList();
            }, TimeSpan.FromMinutes(30));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting suggestions for query: {Query}", query);
            return new List<string>();
        }
    }

    public async Task RebuildIndexAsync()
    {
        try
        {
            if (_examineManager.TryGetIndex("ExternalIndex", out var index))
            {
                await Task.Run(() => index.RebuildIndex());
                _logger.LogInformation("Search index rebuilt successfully");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error rebuilding search index");
        }
    }

    private T ConvertToSearchItem<T>(ISearchResult searchResult)
    {
        try
        {
            var nodeId = searchResult.Values["id"];
            if (int.TryParse(nodeId, out var id))
            {
                var content = _contentQuery.Content(id);
                if (content != null)
                {
                    return (T)Activator.CreateInstance(typeof(T), content);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error converting search result to type {Type}", typeof(T).Name);
        }
        
        return default(T);
    }

    private string ComputeHash(string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes)[..8];
    }
}

// Models/SearchResult.cs
public class SearchResult<T>
{
    public IEnumerable<T> Items { get; set; } = new List<T>();
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public string Query { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
}
```

### 5.2.2 数据库连接池优化

```csharp
// Configuration/DatabaseOptimizationExtensions.cs
public static class DatabaseOptimizationExtensions
{
    public static IServiceCollection AddDatabaseOptimization(this IServiceCollection services, IConfiguration configuration)
    {
        // 数据库连接池配置
        services.Configure<SqlServerOptions>(options =>
        {
            options.ConnectionString = configuration.GetConnectionString("UmbracoDbDSN");
            options.MinPoolSize = 5;
            options.MaxPoolSize = 100;
            options.ConnectionTimeout = 30;
            options.CommandTimeout = 300;
            options.EnableRetryOnFailure = true;
            options.MaxRetryCount = 3;
            options.MaxRetryDelay = TimeSpan.FromSeconds(30);
        });

        // 查询优化服务
        services.AddScoped<IQueryOptimizationService, QueryOptimizationService>();
        
        return services;
    }
}

// Services/QueryOptimizationService.cs
public interface IQueryOptimizationService
{
    Task<IEnumerable<T>> GetOptimizedContentAsync<T>(string contentType, int take = 50, int skip = 0);
    Task<IEnumerable<T>> GetOptimizedContentWithFiltersAsync<T>(string contentType, Dictionary<string, object> filters);
    Task<int> GetContentCountAsync(string contentType, Dictionary<string, object> filters = null);
}

public class QueryOptimizationService : IQueryOptimizationService
{
    private readonly IUmbracoDatabase _database;
    private readonly ICacheService _cacheService;
    private readonly ILogger<QueryOptimizationService> _logger;

    public QueryOptimizationService(
        IUmbracoDatabase database,
        ICacheService cacheService,
        ILogger<QueryOptimizationService> logger)
    {
        _database = database;
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task<IEnumerable<T>> GetOptimizedContentAsync<T>(string contentType, int take = 50, int skip = 0)
    {
        var cacheKey = $"optimized:{contentType}:{take}:{skip}";
        
        return await _cacheService.GetOrSetAsync(cacheKey, async () =>
        {
            var sql = @"
                SELECT TOP (@take) n.*, d.*, p.*
                FROM umbracoNode n
                INNER JOIN umbracoContent c ON n.id = c.nodeId
                INNER JOIN umbracoDocument d ON c.nodeId = d.nodeId
                INNER JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId
                INNER JOIN umbracoPropertyData p ON c.nodeId = p.contentNodeId
                WHERE ct.alias = @contentType
                AND n.trashed = 0
                AND d.published = 1
                ORDER BY n.createDate DESC
                OFFSET @skip ROWS";

            var results = await _database.QueryAsync<dynamic>(sql, new { contentType, take, skip });
            
            // 转换结果为强类型对象
            return ConvertToTypedResults<T>(results);
        }, TimeSpan.FromMinutes(30));
    }

    public async Task<IEnumerable<T>> GetOptimizedContentWithFiltersAsync<T>(string contentType, Dictionary<string, object> filters)
    {
        var filterKey = string.Join(":", filters.Select(f => $"{f.Key}={f.Value}"));
        var cacheKey = $"optimized:filtered:{contentType}:{ComputeHash(filterKey)}";
        
        return await _cacheService.GetOrSetAsync(cacheKey, async () =>
        {
            var sql = new StringBuilder(@"
                SELECT n.*, d.*, p.*
                FROM umbracoNode n
                INNER JOIN umbracoContent c ON n.id = c.nodeId
                INNER JOIN umbracoDocument d ON c.nodeId = d.nodeId
                INNER JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId
                INNER JOIN umbracoPropertyData p ON c.nodeId = p.contentNodeId
                WHERE ct.alias = @contentType
                AND n.trashed = 0
                AND d.published = 1");

            var parameters = new { contentType };
            
            // 动态添加过滤条件
            foreach (var filter in filters)
            {
                sql.Append($" AND p.alias = '{filter.Key}' AND p.textValue = '{filter.Value}'");
            }
            
            sql.Append(" ORDER BY n.createDate DESC");

            var results = await _database.QueryAsync<dynamic>(sql.ToString(), parameters);
            
            return ConvertToTypedResults<T>(results);
        }, TimeSpan.FromMinutes(20));
    }

    public async Task<int> GetContentCountAsync(string contentType, Dictionary<string, object> filters = null)
    {
        var filterKey = filters != null ? string.Join(":", filters.Select(f => $"{f.Key}={f.Value}")) : "all";
        var cacheKey = $"count:{contentType}:{ComputeHash(filterKey)}";
        
        return await _cacheService.GetOrSetAsync(cacheKey, async () =>
        {
            var sql = new StringBuilder(@"
                SELECT COUNT(*)
                FROM umbracoNode n
                INNER JOIN umbracoContent c ON n.id = c.nodeId
                INNER JOIN umbracoDocument d ON c.nodeId = d.nodeId
                INNER JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId");

            if (filters?.Any() == true)
            {
                sql.Append(" INNER JOIN umbracoPropertyData p ON c.nodeId = p.contentNodeId");
            }

            sql.Append(@"
                WHERE ct.alias = @contentType
                AND n.trashed = 0
                AND d.published = 1");

            var parameters = new { contentType };
            
            if (filters?.Any() == true)
            {
                foreach (var filter in filters)
                {
                    sql.Append($" AND p.alias = '{filter.Key}' AND p.textValue = '{filter.Value}'");
                }
            }

            return await _database.ExecuteScalarAsync<int>(sql.ToString(), parameters);
        }, TimeSpan.FromMinutes(60));
    }

    private IEnumerable<T> ConvertToTypedResults<T>(IEnumerable<dynamic> results)
    {
        // 这里需要实现动态结果到强类型对象的转换
        // 具体实现取决于T的类型
        return new List<T>();
    }

    private string ComputeHash(string input)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes)[..8];
    }
}
```

## 5.3 图片自动压缩和CDN集成

### 5.3.1 图片处理服务

```csharp
// Services/ImageProcessingService.cs
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;

public interface IImageProcessingService
{
    Task<ProcessedImage> ProcessImageAsync(Stream imageStream, ImageProcessingOptions options);
    Task<ProcessedImage[]> GenerateResponsiveImagesAsync(Stream imageStream, ResponsiveImageOptions options);
    Task<string> ConvertToWebPAsync(Stream imageStream, int quality = 80);
    Task<bool> IsImageOptimized(Stream imageStream, long maxSizeKB = 500);
}

public class ImageProcessingService : IImageProcessingService
{
    private readonly ILogger<ImageProcessingService> _logger;
    private readonly ImageProcessingConfig _config;

    public ImageProcessingService(ILogger<ImageProcessingService> logger, IOptions<ImageProcessingConfig> config)
    {
        _logger = logger;
        _config = config.Value;
    }

    public async Task<ProcessedImage> ProcessImageAsync(Stream imageStream, ImageProcessingOptions options)
    {
        try
        {
            using var image = await Image.LoadAsync(imageStream);
            
            // 自动旋转
            image.Mutate(x => x.AutoOrient());
            
            // 调整大小
            if (options.MaxWidth > 0 || options.MaxHeight > 0)
            {
                var resizeOptions = new ResizeOptions
                {
                    Size = new Size(options.MaxWidth, options.MaxHeight),
                    Mode = ResizeMode.Max,
                    Sampler = KnownResamplers.Lanczos3
                };
                
                image.Mutate(x => x.Resize(resizeOptions));
            }
            
            // 应用滤镜
            if (options.ApplyFilters)
            {
                image.Mutate(x => x
                    .GaussianSharpen()
                    .Contrast(1.1f));
            }
            
            // 保存为指定格式
            var outputStream = new MemoryStream();
            
            switch (options.Format.ToLower())
            {
                case "webp":
                    await image.SaveAsWebpAsync(outputStream, new WebpEncoder { Quality = options.Quality });
                    break;
                case "png":
                    await image.SaveAsPngAsync(outputStream, new PngEncoder { CompressionLevel = PngCompressionLevel.BestCompression });
                    break;
                case "jpg":
                case "jpeg":
                default:
                    await image.SaveAsJpegAsync(outputStream, new JpegEncoder { Quality = options.Quality });
                    break;
            }
            
            return new ProcessedImage
            {
                Data = outputStream.ToArray(),
                Format = options.Format,
                Width = image.Width,
                Height = image.Height,
                SizeKB = outputStream.Length / 1024
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing image");
            throw;
        }
    }

    public async Task<ProcessedImage[]> GenerateResponsiveImagesAsync(Stream imageStream, ResponsiveImageOptions options)
    {
        var results = new List<ProcessedImage>();
        
        try
        {
            using var image = await Image.LoadAsync(imageStream);
            
            foreach (var breakpoint in options.Breakpoints)
            {
                var processedImage = await ProcessImageAsync(imageStream, new ImageProcessingOptions
                {
                    MaxWidth = breakpoint.Width,
                    MaxHeight = breakpoint.Height,
                    Quality = breakpoint.Quality,
                    Format = breakpoint.Format ?? "webp",
                    ApplyFilters = options.ApplyFilters
                });
                
                processedImage.Breakpoint = breakpoint.Name;
                results.Add(processedImage);
                
                // 重置流位置
                imageStream.Position = 0;
            }
            
            return results.ToArray();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating responsive images");
            throw;
        }
    }

    public async Task<string> ConvertToWebPAsync(Stream imageStream, int quality = 80)
    {
        try
        {
            using var image = await Image.LoadAsync(imageStream);
            using var outputStream = new MemoryStream();
            
            await image.SaveAsWebpAsync(outputStream, new WebpEncoder { Quality = quality });
            
            return Convert.ToBase64String(outputStream.ToArray());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error converting image to WebP");
            throw;
        }
    }

    public async Task<bool> IsImageOptimized(Stream imageStream, long maxSizeKB = 500)
    {
        try
        {
            using var image = await Image.LoadAsync(imageStream);
            
            var currentSizeKB = imageStream.Length / 1024;
            var pixelCount = image.Width * image.Height;
            var expectedSizeKB = pixelCount * 3 / 1024; // 粗略估算
            
            return currentSizeKB <= maxSizeKB && currentSizeKB <= expectedSizeKB;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking image optimization");
            return false;
        }
    }
}

// Models/ImageProcessingModels.cs
public class ProcessedImage
{
    public byte[] Data { get; set; }
    public string Format { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public long SizeKB { get; set; }
    public string Breakpoint { get; set; }
}

public class ImageProcessingOptions
{
    public int MaxWidth { get; set; } = 1920;
    public int MaxHeight { get; set; } = 1080;
    public int Quality { get; set; } = 85;
    public string Format { get; set; } = "webp";
    public bool ApplyFilters { get; set; } = true;
}

public class ResponsiveImageOptions
{
    public ImageBreakpoint[] Breakpoints { get; set; }
    public bool ApplyFilters { get; set; } = true;
}

public class ImageBreakpoint
{
    public string Name { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int Quality { get; set; } = 85;
    public string Format { get; set; } = "webp";
}

public class ImageProcessingConfig
{
    public int MaxImageSizeKB { get; set; } = 2048;
    public int DefaultQuality { get; set; } = 85;
    public string DefaultFormat { get; set; } = "webp";
    public bool EnableResponsiveImages { get; set; } = true;
    public ImageBreakpoint[] ResponsiveBreakpoints { get; set; }
}
```

### 5.3.2 CDN集成服务

```csharp
// Services/CdnService.cs
public interface ICdnService
{
    Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType);
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType);
    Task<bool> DeleteFileAsync(string fileName);
    Task<string> GetOptimizedImageUrlAsync(string fileName, int width = 0, int height = 0, string format = null);
    Task<CdnStats> GetUsageStatsAsync();
}

public class CdnService : ICdnService
{
    private readonly HttpClient _httpClient;
    private readonly CdnConfig _config;
    private readonly ILogger<CdnService> _logger;

    public CdnService(HttpClient httpClient, IOptions<CdnConfig> config, ILogger<CdnService> logger)
    {
        _httpClient = httpClient;
        _config = config.Value;
        _logger = logger;
    }

    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string contentType)
    {
        try
        {
            var formData = new MultipartFormDataContent();
            var streamContent = new StreamContent(imageStream);
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            formData.Add(streamContent, "file", fileName);

            var response = await _httpClient.PostAsync($"{_config.ApiEndpoint}/upload", formData);
            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<CdnUploadResult>();
                var cdnUrl = $"{_config.BaseUrl}/{result.FileName}";
                
                _logger.LogInformation("Image uploaded to CDN: {FileName} -> {Url}", fileName, cdnUrl);
                return cdnUrl;
            }
            else
            {
                _logger.LogError("Failed to upload image to CDN: {StatusCode}", response.StatusCode);
                throw new Exception($"CDN upload failed: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading image to CDN: {FileName}", fileName);
            throw;
        }
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        try
        {
            var formData = new MultipartFormDataContent();
            var streamContent = new StreamContent(fileStream);
            streamContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            formData.Add(streamContent, "file", fileName);

            var response = await _httpClient.PostAsync($"{_config.ApiEndpoint}/upload", formData);
            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<CdnUploadResult>();
                var cdnUrl = $"{_config.BaseUrl}/{result.FileName}";
                
                _logger.LogInformation("File uploaded to CDN: {FileName} -> {Url}", fileName, cdnUrl);
                return cdnUrl;
            }
            else
            {
                throw new Exception($"CDN upload failed: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file to CDN: {FileName}", fileName);
            throw;
        }
    }

    public async Task<bool> DeleteFileAsync(string fileName)
    {
        try
        {
            var response = await _httpClient.DeleteAsync($"{_config.ApiEndpoint}/delete/{fileName}");
            
            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("File deleted from CDN: {FileName}", fileName);
                return true;
            }
            else
            {
                _logger.LogError("Failed to delete file from CDN: {FileName}, Status: {StatusCode}", fileName, response.StatusCode);
                return false;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file from CDN: {FileName}", fileName);
            return false;
        }
    }

    public async Task<string> GetOptimizedImageUrlAsync(string fileName, int width = 0, int height = 0, string format = null)
    {
        var url = $"{_config.BaseUrl}/{fileName}";
        var parameters = new List<string>();

        if (width > 0)
            parameters.Add($"w={width}");
        
        if (height > 0)
            parameters.Add($"h={height}");
        
        if (!string.IsNullOrEmpty(format))
            parameters.Add($"f={format}");

        if (parameters.Any())
        {
            url += "?" + string.Join("&", parameters);
        }

        return url;
    }

    public async Task<CdnStats> GetUsageStatsAsync()
    {
        try
        {
            var response = await _httpClient.GetAsync($"{_config.ApiEndpoint}/stats");
            
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<CdnStats>();
            }
            else
            {
                throw new Exception($"Failed to get CDN stats: {response.StatusCode}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting CDN stats");
            throw;
        }
    }
}

// Models/CdnModels.cs
public class CdnUploadResult
{
    public string FileName { get; set; }
    public string Url { get; set; }
    public long Size { get; set; }
    public string ContentType { get; set; }
}

public class CdnStats
{
    public long TotalStorage { get; set; }
    public long UsedStorage { get; set; }
    public long TotalBandwidth { get; set; }
    public long UsedBandwidth { get; set; }
    public int TotalFiles { get; set; }
    public DateTime LastUpdated { get; set; }
}

public class CdnConfig
{
    public string BaseUrl { get; set; }
    public string ApiEndpoint { get; set; }
    public string ApiKey { get; set; }
    public bool EnableImageOptimization { get; set; } = true;
    public bool EnableCompression { get; set; } = true;
    public int CacheDurationHours { get; set; } = 24;
}
```

## 5.4 API响应压缩

### 5.4.1 响应压缩中间件

```csharp
// Middleware/ResponseCompressionMiddleware.cs
public class ResponseCompressionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ResponseCompressionMiddleware> _logger;
    private readonly ResponseCompressionOptions _options;

    public ResponseCompressionMiddleware(
        RequestDelegate next,
        ILogger<ResponseCompressionMiddleware> logger,
        IOptions<ResponseCompressionOptions> options)
    {
        _next = next;
        _logger = logger;
        _options = options.Value;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (!ShouldCompress(context))
        {
            await _next(context);
            return;
        }

        var acceptEncoding = context.Request.Headers["Accept-Encoding"].ToString();
        var compressionType = GetCompressionType(acceptEncoding);

        if (compressionType != CompressionType.None)
        {
            var originalBodyStream = context.Response.Body;
            
            using var compressedStream = CreateCompressionStream(compressionType, originalBodyStream);
            context.Response.Body = compressedStream;
            
            // 设置响应头
            context.Response.Headers.Add("Content-Encoding", compressionType.ToString().ToLower());
            context.Response.Headers.Add("Vary", "Accept-Encoding");
            
            await _next(context);
        }
        else
        {
            await _next(context);
        }
    }

    private bool ShouldCompress(HttpContext context)
    {
        // 检查是否是API请求
        if (!context.Request.Path.StartsWithSegments("/api"))
            return false;

        // 检查内容类型
        var contentType = context.Response.ContentType;
        if (string.IsNullOrEmpty(contentType))
            return false;

        var compressibleTypes = new[]
        {
            "application/json",
            "application/xml",
            "text/plain",
            "text/html",
            "text/css",
            "text/javascript",
            "application/javascript"
        };

        return compressibleTypes.Any(type => contentType.Contains(type, StringComparison.OrdinalIgnoreCase));
    }

    private CompressionType GetCompressionType(string acceptEncoding)
    {
        if (acceptEncoding.Contains("br", StringComparison.OrdinalIgnoreCase))
            return CompressionType.Brotli;
        
        if (acceptEncoding.Contains("gzip", StringComparison.OrdinalIgnoreCase))
            return CompressionType.Gzip;
        
        if (acceptEncoding.Contains("deflate", StringComparison.OrdinalIgnoreCase))
            return CompressionType.Deflate;

        return CompressionType.None;
    }

    private Stream CreateCompressionStream(CompressionType compressionType, Stream output)
    {
        return compressionType switch
        {
            CompressionType.Gzip => new GZipStream(output, CompressionLevel.Optimal),
            CompressionType.Deflate => new DeflateStream(output, CompressionLevel.Optimal),
            CompressionType.Brotli => new BrotliStream(output, CompressionLevel.Optimal),
            _ => output
        };
    }
}

public enum CompressionType
{
    None,
    Gzip,
    Deflate,
    Brotli
}

public class ResponseCompressionOptions
{
    public bool EnableCompression { get; set; } = true;
    public int MinimumBytes { get; set; } = 1024;
    public string[] CompressibleTypes { get; set; } = new[]
    {
        "application/json",
        "application/xml",
        "text/plain",
        "text/html"
    };
}
```

### 5.4.2 JSON序列化优化

```csharp
// Services/JsonSerializationService.cs
public interface IJsonSerializationService
{
    string Serialize<T>(T obj, bool optimize = true);
    T Deserialize<T>(string json);
    byte[] SerializeToBytes<T>(T obj, bool compress = true);
    T DeserializeFromBytes<T>(byte[] data, bool decompress = true);
}

public class JsonSerializationService : IJsonSerializationService
{
    private readonly JsonSerializerOptions _options;
    private readonly JsonSerializerOptions _optimizedOptions;

    public JsonSerializationService()
    {
        _options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };

        _optimizedOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = false,
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
            NumberHandling = JsonNumberHandling.AllowReadingFromString,
            ReferenceHandler = ReferenceHandler.IgnoreCycles
        };
    }

    public string Serialize<T>(T obj, bool optimize = true)
    {
        var options = optimize ? _optimizedOptions : _options;
        return JsonSerializer.Serialize(obj, options);
    }

    public T Deserialize<T>(string json)
    {
        return JsonSerializer.Deserialize<T>(json, _options);
    }

    public byte[] SerializeToBytes<T>(T obj, bool compress = true)
    {
        var json = Serialize(obj, true);
        var bytes = Encoding.UTF8.GetBytes(json);

        if (compress && bytes.Length > 1024)
        {
            using var input = new MemoryStream(bytes);
            using var output = new MemoryStream();
            using var gzip = new GZipStream(output, CompressionLevel.Optimal);
            
            input.CopyTo(gzip);
            gzip.Close();
            
            return output.ToArray();
        }

        return bytes;
    }

    public T DeserializeFromBytes<T>(byte[] data, bool decompress = true)
    {
        byte[] bytes = data;

        if (decompress && IsCompressed(data))
        {
            using var input = new MemoryStream(data);
            using var output = new MemoryStream();
            using var gzip = new GZipStream(input, CompressionMode.Decompress);
            
            gzip.CopyTo(output);
            bytes = output.ToArray();
        }

        var json = Encoding.UTF8.GetString(bytes);
        return Deserialize<T>(json);
    }

    private bool IsCompressed(byte[] data)
    {
        return data.Length >= 2 && data[0] == 0x1F && data[1] == 0x8B;
    }
}
```

## 5.5 Redis缓存实现

### 5.5.1 Redis缓存提供程序

```csharp
// Services/RedisCacheService.cs
using StackExchange.Redis;

public interface IRedisCacheService : IDistributedCache
{
    Task<bool> KeyExistsAsync(string key);
    Task<string[]> GetKeysAsync(string pattern);
    Task RemovePatternAsync(string pattern);
    Task<long> IncrementAsync(string key, long value = 1);
    Task<long> DecrementAsync(string key, long value = 1);
    Task<bool> HashSetAsync(string key, string field, string value);
    Task<string> HashGetAsync(string key, string field);
    Task<bool> ListPushAsync(string key, string value);
    Task<string> ListPopAsync(string key);
    Task FlushAllAsync();
}

public class RedisCacheService : IRedisCacheService
{
    private readonly IConnectionMultiplexer _connectionMultiplexer;
    private readonly IDatabase _database;
    private readonly ILogger<RedisCacheService> _logger;

    public RedisCacheService(IConnectionMultiplexer connectionMultiplexer, ILogger<RedisCacheService> logger)
    {
        _connectionMultiplexer = connectionMultiplexer;
        _database = connectionMultiplexer.GetDatabase();
        _logger = logger;
    }

    public async Task<byte[]> GetAsync(string key, CancellationToken token = default)
    {
        try
        {
            var value = await _database.StringGetAsync(key);
            return value.HasValue ? value : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting value from Redis for key: {Key}", key);
            return null;
        }
    }

    public async Task SetAsync(string key, byte[] value, DistributedCacheEntryOptions options, CancellationToken token = default)
    {
        try
        {
            var expiry = options.AbsoluteExpirationRelativeToNow ?? options.SlidingExpiration;
            await _database.StringSetAsync(key, value, expiry);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error setting value in Redis for key: {Key}", key);
        }
    }

    public async Task RefreshAsync(string key, CancellationToken token = default)
    {
        try
        {
            await _database.KeyExpireAsync(key, TimeSpan.FromMinutes(30));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing key in Redis: {Key}", key);
        }
    }

    public async Task RemoveAsync(string key, CancellationToken token = default)
    {
        try
        {
            await _database.KeyDeleteAsync(key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing key from Redis: {Key}", key);
        }
    }

    public async Task<bool> KeyExistsAsync(string key)
    {
        try
        {
            return await _database.KeyExistsAsync(key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking key existence in Redis: {Key}", key);
            return false;
        }
    }

    public async Task<string[]> GetKeysAsync(string pattern)
    {
        try
        {
            var server = _connectionMultiplexer.GetServer(_connectionMultiplexer.GetEndPoints().First());
            var keys = server.Keys(pattern: pattern);
            return keys.Select(key => key.ToString()).ToArray();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting keys from Redis with pattern: {Pattern}", pattern);
            return new string[0];
        }
    }

    public async Task RemovePatternAsync(string pattern)
    {
        try
        {
            var keys = await GetKeysAsync(pattern);
            if (keys.Length > 0)
            {
                await _database.KeyDeleteAsync(keys.Select(key => (RedisKey)key).ToArray());
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing pattern from Redis: {Pattern}", pattern);
        }
    }

    public async Task<long> IncrementAsync(string key, long value = 1)
    {
        try
        {
            return await _database.StringIncrementAsync(key, value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error incrementing value in Redis for key: {Key}", key);
            return 0;
        }
    }

    public async Task<long> DecrementAsync(string key, long value = 1)
    {
        try
        {
            return await _database.StringDecrementAsync(key, value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error decrementing value in Redis for key: {Key}", key);
            return 0;
        }
    }

    public async Task<bool> HashSetAsync(string key, string field, string value)
    {
        try
        {
            return await _database.HashSetAsync(key, field, value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error setting hash field in Redis for key: {Key}, field: {Field}", key, field);
            return false;
        }
    }

    public async Task<string> HashGetAsync(string key, string field)
    {
        try
        {
            var value = await _database.HashGetAsync(key, field);
            return value.HasValue ? value : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting hash field from Redis for key: {Key}, field: {Field}", key, field);
            return null;
        }
    }

    public async Task<bool> ListPushAsync(string key, string value)
    {
        try
        {
            await _database.ListLeftPushAsync(key, value);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error pushing to list in Redis for key: {Key}", key);
            return false;
        }
    }

    public async Task<string> ListPopAsync(string key)
    {
        try
        {
            var value = await _database.ListLeftPopAsync(key);
            return value.HasValue ? value : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error popping from list in Redis for key: {Key}", key);
            return null;
        }
    }

    public async Task FlushAllAsync()
    {
        try
        {
            var server = _connectionMultiplexer.GetServer(_connectionMultiplexer.GetEndPoints().First());
            await server.FlushAllDatabasesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error flushing all Redis databases");
        }
    }
}
```

### 5.5.2 Redis配置和启动

```csharp
// Extensions/RedisExtensions.cs
public static class RedisExtensions
{
    public static IServiceCollection AddRedisCache(this IServiceCollection services, IConfiguration configuration)
    {
        var redisOptions = configuration.GetSection("Redis").Get<RedisOptions>();
        
        if (redisOptions.Enabled)
        {
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = redisOptions.ConnectionString;
                options.InstanceName = redisOptions.InstanceName;
            });

            services.AddSingleton<IConnectionMultiplexer>(provider =>
            {
                var configuration = ConfigurationOptions.Parse(redisOptions.ConnectionString);
                configuration.AbortOnConnectFail = false;
                configuration.ConnectTimeout = redisOptions.ConnectTimeout;
                configuration.SyncTimeout = redisOptions.SyncTimeout;
                configuration.AsyncTimeout = redisOptions.AsyncTimeout;
                configuration.ConnectRetry = redisOptions.ConnectRetry;
                configuration.ReconnectRetryPolicy = new ExponentialRetry(TimeSpan.FromMilliseconds(100));
                
                return ConnectionMultiplexer.Connect(configuration);
            });

            services.AddSingleton<IRedisCacheService, RedisCacheService>();
        }

        return services;
    }
}

// Configuration/RedisOptions.cs
public class RedisOptions
{
    public bool Enabled { get; set; } = false;
    public string ConnectionString { get; set; } = "localhost:6379";
    public string InstanceName { get; set; } = "UmbracoApp";
    public int ConnectTimeout { get; set; } = 5000;
    public int SyncTimeout { get; set; } = 5000;
    public int AsyncTimeout { get; set; } = 5000;
    public int ConnectRetry { get; set; } = 3;
    public int Database { get; set; } = 0;
}
```

现在让我完成最后一个任务——数据迁移脚本：

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "\u521b\u5efaUmbraco\u4f18\u5316\u4e0e\u6279\u91cf\u5bfc\u5165\u5b9e\u65bd\u65b9\u6848", "status": "completed", "priority": "high", "id": "1"}, {"content": "\u8bbe\u8ba1\u4f18\u5316\u7684Document Types\u7ed3\u6784", "status": "completed", "priority": "high", "id": "2"}, {"content": "\u5b9e\u73b0\u6279\u91cf\u5bfc\u5165\u529f\u80fd", "status": "completed", "priority": "high", "id": "3"}, {"content": "\u521b\u5efa\u9ad8\u6027\u80fdHeadless API", "status": "completed", "priority": "high", "id": "4"}, {"content": "\u5b9e\u73b0\u5185\u5bb9\u6a21\u677f\u548c\u590d\u7528\u7ec4\u4ef6", "status": "completed", "priority": "medium", "id": "5"}, {"content": "\u6027\u80fd\u4f18\u5316\u5b9e\u73b0", "status": "completed", "priority": "medium", "id": "6"}, {"content": "\u521b\u5efa\u6570\u636e\u8fc1\u79fb\u811a\u672c", "status": "in_progress", "priority": "low", "id": "7"}]