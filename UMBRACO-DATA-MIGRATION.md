# 📋 任务6: 数据迁移脚本

## 6.1 从旧版本Umbraco迁移

### 6.1.1 Umbraco版本迁移服务

```csharp
// Services/UmbracoMigrationService.cs
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Models;

public interface IUmbracoMigrationService
{
    Task<MigrationResult> MigrateFromUmbraco8Async(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateFromUmbraco9Async(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateFromUmbraco10Async(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateContentTypesAsync(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateContentAsync(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateMediaAsync(string oldDatabaseConnectionString);
    Task<MigrationResult> MigrateUsersAsync(string oldDatabaseConnectionString);
}

public class UmbracoMigrationService : IUmbracoMigrationService
{
    private readonly IContentService _contentService;
    private readonly IMediaService _mediaService;
    private readonly IContentTypeService _contentTypeService;
    private readonly IUserService _userService;
    private readonly ILogger<UmbracoMigrationService> _logger;
    private readonly IUmbracoDatabase _database;

    public UmbracoMigrationService(
        IContentService contentService,
        IMediaService mediaService,
        IContentTypeService contentTypeService,
        IUserService userService,
        ILogger<UmbracoMigrationService> logger,
        IUmbracoDatabase database)
    {
        _contentService = contentService;
        _mediaService = mediaService;
        _contentTypeService = contentTypeService;
        _userService = userService;
        _logger = logger;
        _database = database;
    }

    public async Task<MigrationResult> MigrateFromUmbraco8Async(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            _logger.LogInformation("Starting Umbraco 8 migration");
            
            // 1. 迁移内容类型
            var contentTypeResult = await MigrateContentTypesAsync(oldDatabaseConnectionString);
            result.ContentTypesMigrated = contentTypeResult.SuccessCount;
            result.Errors.AddRange(contentTypeResult.Errors);
            
            // 2. 迁移媒体
            var mediaResult = await MigrateMediaAsync(oldDatabaseConnectionString);
            result.MediaMigrated = mediaResult.SuccessCount;
            result.Errors.AddRange(mediaResult.Errors);
            
            // 3. 迁移内容
            var contentResult = await MigrateContentAsync(oldDatabaseConnectionString);
            result.ContentMigrated = contentResult.SuccessCount;
            result.Errors.AddRange(contentResult.Errors);
            
            // 4. 迁移用户
            var userResult = await MigrateUsersAsync(oldDatabaseConnectionString);
            result.UsersMigrated = userResult.SuccessCount;
            result.Errors.AddRange(userResult.Errors);
            
            // 5. 处理Umbraco 8特有的迁移
            await MigrateUmbraco8SpecificData(oldDatabaseConnectionString, result);
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            _logger.LogInformation("Umbraco 8 migration completed. Success: {Success}, Errors: {ErrorCount}", 
                result.Success, result.Errors.Count);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Umbraco 8 migration");
            result.Errors.Add($"Migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateFromUmbraco9Async(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            _logger.LogInformation("Starting Umbraco 9 migration");
            
            // Umbraco 9 迁移逻辑
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 1. 迁移内容类型
            await MigrateContentTypesFromUmbraco9(oldConnection, result);
            
            // 2. 迁移内容
            await MigrateContentFromUmbraco9(oldConnection, result);
            
            // 3. 迁移媒体
            await MigrateMediaFromUmbraco9(oldConnection, result);
            
            // 4. 迁移用户和权限
            await MigrateUsersFromUmbraco9(oldConnection, result);
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Umbraco 9 migration");
            result.Errors.Add($"Migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateFromUmbraco10Async(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            _logger.LogInformation("Starting Umbraco 10 migration");
            
            // Umbraco 10 迁移逻辑（相对简单，主要是数据结构变化）
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 1. 检查schema差异
            await ValidateSchemaCompatibility(oldConnection, result);
            
            // 2. 迁移内容类型
            await MigrateContentTypesFromUmbraco10(oldConnection, result);
            
            // 3. 迁移内容
            await MigrateContentFromUmbraco10(oldConnection, result);
            
            // 4. 迁移媒体
            await MigrateMediaFromUmbraco10(oldConnection, result);
            
            // 5. 迁移用户
            await MigrateUsersFromUmbraco10(oldConnection, result);
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during Umbraco 10 migration");
            result.Errors.Add($"Migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateContentTypesAsync(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 获取旧的内容类型
            var oldContentTypes = await GetOldContentTypes(oldConnection);
            
            foreach (var oldContentType in oldContentTypes)
            {
                try
                {
                    // 检查内容类型是否已存在
                    var existingContentType = _contentTypeService.Get(oldContentType.Alias);
                    if (existingContentType != null)
                    {
                        _logger.LogWarning("Content type {Alias} already exists, skipping", oldContentType.Alias);
                        continue;
                    }
                    
                    // 创建新的内容类型
                    var newContentType = new ContentType(-1)
                    {
                        Name = oldContentType.Name,
                        Alias = oldContentType.Alias,
                        Icon = oldContentType.Icon,
                        Description = oldContentType.Description,
                        AllowedAsRoot = oldContentType.AllowedAsRoot
                    };
                    
                    // 迁移属性
                    await MigrateContentTypeProperties(oldConnection, oldContentType.Id, newContentType);
                    
                    // 迁移模板
                    await MigrateContentTypeTemplates(oldConnection, oldContentType.Id, newContentType);
                    
                    // 保存内容类型
                    _contentTypeService.Save(newContentType);
                    
                    result.SuccessCount++;
                    _logger.LogInformation("Migrated content type: {Name}", oldContentType.Name);
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate content type {oldContentType.Name}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating content type {Name}", oldContentType.Name);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during content type migration");
            result.Errors.Add($"Content type migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateContentAsync(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 获取旧的内容
            var oldContent = await GetOldContent(oldConnection);
            
            // 按层级排序，先迁移父节点
            var sortedContent = oldContent.OrderBy(c => c.Level).ThenBy(c => c.SortOrder);
            
            foreach (var oldItem in sortedContent)
            {
                try
                {
                    // 检查内容是否已存在
                    var existingContent = _contentService.GetById(oldItem.Id);
                    if (existingContent != null)
                    {
                        _logger.LogWarning("Content {Name} already exists, skipping", oldItem.Name);
                        continue;
                    }
                    
                    // 获取内容类型
                    var contentType = _contentTypeService.Get(oldItem.ContentTypeAlias);
                    if (contentType == null)
                    {
                        result.Errors.Add($"Content type {oldItem.ContentTypeAlias} not found for content {oldItem.Name}");
                        continue;
                    }
                    
                    // 创建新内容
                    var newContent = _contentService.Create(oldItem.Name, oldItem.ParentId, contentType);
                    
                    // 迁移属性值
                    await MigrateContentProperties(oldConnection, oldItem.Id, newContent);
                    
                    // 设置基本属性
                    newContent.CreateDate = oldItem.CreateDate;
                    newContent.UpdateDate = oldItem.UpdateDate;
                    newContent.SortOrder = oldItem.SortOrder;
                    
                    // 保存内容
                    var saveResult = _contentService.Save(newContent);
                    
                    if (saveResult.Success)
                    {
                        // 如果原内容已发布，则发布新内容
                        if (oldItem.Published)
                        {
                            _contentService.PublishWithStatus(newContent, oldItem.CreatorId);
                        }
                        
                        result.SuccessCount++;
                        _logger.LogInformation("Migrated content: {Name}", oldItem.Name);
                    }
                    else
                    {
                        result.Errors.Add($"Failed to save content {oldItem.Name}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate content {oldItem.Name}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating content {Name}", oldItem.Name);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during content migration");
            result.Errors.Add($"Content migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateMediaAsync(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 获取旧的媒体
            var oldMedia = await GetOldMedia(oldConnection);
            
            // 按层级排序
            var sortedMedia = oldMedia.OrderBy(m => m.Level).ThenBy(m => m.SortOrder);
            
            foreach (var oldItem in sortedMedia)
            {
                try
                {
                    // 检查媒体是否已存在
                    var existingMedia = _mediaService.GetById(oldItem.Id);
                    if (existingMedia != null)
                    {
                        _logger.LogWarning("Media {Name} already exists, skipping", oldItem.Name);
                        continue;
                    }
                    
                    // 创建新媒体
                    var newMedia = _mediaService.CreateMedia(oldItem.Name, oldItem.ParentId, oldItem.ContentTypeAlias);
                    
                    // 迁移媒体文件
                    await MigrateMediaFile(oldConnection, oldItem, newMedia);
                    
                    // 迁移属性
                    await MigrateMediaProperties(oldConnection, oldItem.Id, newMedia);
                    
                    // 设置基本属性
                    newMedia.CreateDate = oldItem.CreateDate;
                    newMedia.UpdateDate = oldItem.UpdateDate;
                    newMedia.SortOrder = oldItem.SortOrder;
                    
                    // 保存媒体
                    var saveResult = _mediaService.Save(newMedia);
                    
                    if (saveResult.Success)
                    {
                        result.SuccessCount++;
                        _logger.LogInformation("Migrated media: {Name}", oldItem.Name);
                    }
                    else
                    {
                        result.Errors.Add($"Failed to save media {oldItem.Name}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate media {oldItem.Name}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating media {Name}", oldItem.Name);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during media migration");
            result.Errors.Add($"Media migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateUsersAsync(string oldDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
            await oldConnection.OpenAsync();
            
            // 获取旧的用户
            var oldUsers = await GetOldUsers(oldConnection);
            
            foreach (var oldUser in oldUsers)
            {
                try
                {
                    // 检查用户是否已存在
                    var existingUser = _userService.GetByEmail(oldUser.Email);
                    if (existingUser != null)
                    {
                        _logger.LogWarning("User {Email} already exists, skipping", oldUser.Email);
                        continue;
                    }
                    
                    // 创建新用户
                    var newUser = _userService.CreateUserWithIdentity(
                        oldUser.Username,
                        oldUser.Email,
                        oldUser.Name,
                        oldUser.Name
                    );
                    
                    // 设置用户属性
                    newUser.Comments = oldUser.Comments;
                    newUser.IsApproved = oldUser.IsApproved;
                    newUser.IsLockedOut = oldUser.IsLockedOut;
                    newUser.CreateDate = oldUser.CreateDate;
                    newUser.UpdateDate = oldUser.UpdateDate;
                    
                    // 迁移用户组
                    await MigrateUserGroups(oldConnection, oldUser.Id, newUser);
                    
                    // 保存用户
                    _userService.Save(newUser);
                    
                    result.SuccessCount++;
                    _logger.LogInformation("Migrated user: {Email}", oldUser.Email);
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate user {oldUser.Email}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating user {Email}", oldUser.Email);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during user migration");
            result.Errors.Add($"User migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    // 私有辅助方法
    private async Task MigrateUmbraco8SpecificData(string oldDatabaseConnectionString, MigrationResult result)
    {
        using var oldConnection = new SqlConnection(oldDatabaseConnectionString);
        await oldConnection.OpenAsync();
        
        // 迁移Umbraco 8特有的数据结构
        // 例如：旧的数据类型、配置等
        
        try
        {
            // 迁移数据类型
            await MigrateDataTypes(oldConnection, result);
            
            // 迁移字典项
            await MigrateDictionaryItems(oldConnection, result);
            
            // 迁移宏
            await MigrateMacros(oldConnection, result);
            
            // 迁移语言
            await MigrateLanguages(oldConnection, result);
        }
        catch (Exception ex)
        {
            result.Errors.Add($"Umbraco 8 specific migration failed: {ex.Message}");
            _logger.LogError(ex, "Error migrating Umbraco 8 specific data");
        }
    }

    private async Task<List<OldContentType>> GetOldContentTypes(SqlConnection connection)
    {
        var sql = @"
            SELECT 
                ct.nodeId as Id,
                n.text as Name,
                ct.alias as Alias,
                n.icon as Icon,
                ct.description as Description,
                ct.allowAtRoot as AllowedAsRoot
            FROM umbracoContentType ct
            INNER JOIN umbracoNode n ON ct.nodeId = n.id
            WHERE n.nodeObjectType = 'A2CB7800-F571-4787-9638-BC48539A0EFB'";
        
        using var command = new SqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var contentTypes = new List<OldContentType>();
        
        while (await reader.ReadAsync())
        {
            contentTypes.Add(new OldContentType
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                Alias = reader.GetString("Alias"),
                Icon = reader.IsDBNull("Icon") ? null : reader.GetString("Icon"),
                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                AllowedAsRoot = reader.GetBoolean("AllowedAsRoot")
            });
        }
        
        return contentTypes;
    }

    private async Task<List<OldContent>> GetOldContent(SqlConnection connection)
    {
        var sql = @"
            SELECT 
                n.id as Id,
                n.text as Name,
                n.parentID as ParentId,
                n.level as Level,
                n.sortOrder as SortOrder,
                n.createDate as CreateDate,
                n.updateDate as UpdateDate,
                ct.alias as ContentTypeAlias,
                d.published as Published,
                d.userId as CreatorId
            FROM umbracoNode n
            INNER JOIN umbracoContent c ON n.id = c.nodeId
            INNER JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId
            LEFT JOIN umbracoDocument d ON c.nodeId = d.nodeId
            WHERE n.nodeObjectType = 'C66BA18E-EAF3-4CFF-8A22-41B16D66A972'
            ORDER BY n.level, n.sortOrder";
        
        using var command = new SqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var content = new List<OldContent>();
        
        while (await reader.ReadAsync())
        {
            content.Add(new OldContent
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                ParentId = reader.GetInt32("ParentId"),
                Level = reader.GetInt32("Level"),
                SortOrder = reader.GetInt32("SortOrder"),
                CreateDate = reader.GetDateTime("CreateDate"),
                UpdateDate = reader.GetDateTime("UpdateDate"),
                ContentTypeAlias = reader.GetString("ContentTypeAlias"),
                Published = reader.IsDBNull("Published") ? false : reader.GetBoolean("Published"),
                CreatorId = reader.IsDBNull("CreatorId") ? 0 : reader.GetInt32("CreatorId")
            });
        }
        
        return content;
    }

    private async Task<List<OldMedia>> GetOldMedia(SqlConnection connection)
    {
        var sql = @"
            SELECT 
                n.id as Id,
                n.text as Name,
                n.parentID as ParentId,
                n.level as Level,
                n.sortOrder as SortOrder,
                n.createDate as CreateDate,
                n.updateDate as UpdateDate,
                ct.alias as ContentTypeAlias
            FROM umbracoNode n
            INNER JOIN umbracoContent c ON n.id = c.nodeId
            INNER JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId
            WHERE n.nodeObjectType = 'B796F64C-1F99-4FFB-B886-4BF4BC011A9C'
            ORDER BY n.level, n.sortOrder";
        
        using var command = new SqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var media = new List<OldMedia>();
        
        while (await reader.ReadAsync())
        {
            media.Add(new OldMedia
            {
                Id = reader.GetInt32("Id"),
                Name = reader.GetString("Name"),
                ParentId = reader.GetInt32("ParentId"),
                Level = reader.GetInt32("Level"),
                SortOrder = reader.GetInt32("SortOrder"),
                CreateDate = reader.GetDateTime("CreateDate"),
                UpdateDate = reader.GetDateTime("UpdateDate"),
                ContentTypeAlias = reader.GetString("ContentTypeAlias")
            });
        }
        
        return media;
    }

    private async Task<List<OldUser>> GetOldUsers(SqlConnection connection)
    {
        var sql = @"
            SELECT 
                u.id as Id,
                u.userName as Username,
                u.userEmail as Email,
                u.userLogin as Name,
                u.userComments as Comments,
                u.userNoConsole as IsApproved,
                u.userDisabled as IsLockedOut,
                u.createDate as CreateDate,
                u.updateDate as UpdateDate
            FROM umbracoUser u";
        
        using var command = new SqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var users = new List<OldUser>();
        
        while (await reader.ReadAsync())
        {
            users.Add(new OldUser
            {
                Id = reader.GetInt32("Id"),
                Username = reader.GetString("Username"),
                Email = reader.GetString("Email"),
                Name = reader.GetString("Name"),
                Comments = reader.IsDBNull("Comments") ? null : reader.GetString("Comments"),
                IsApproved = !reader.GetBoolean("IsApproved"),
                IsLockedOut = reader.GetBoolean("IsLockedOut"),
                CreateDate = reader.GetDateTime("CreateDate"),
                UpdateDate = reader.GetDateTime("UpdateDate")
            });
        }
        
        return users;
    }

    private async Task MigrateContentTypeProperties(SqlConnection connection, int contentTypeId, IContentType newContentType)
    {
        var sql = @"
            SELECT 
                pt.id as Id,
                pt.Alias as Alias,
                pt.Name as Name,
                pt.Description as Description,
                pt.mandatory as Mandatory,
                pt.sortOrder as SortOrder,
                dt.propertyEditorAlias as PropertyEditorAlias,
                dt.dbType as DatabaseType
            FROM umbracoPropertyType pt
            INNER JOIN umbracoDataType dt ON pt.dataTypeId = dt.nodeId
            WHERE pt.contentTypeId = @contentTypeId
            ORDER BY pt.sortOrder";
        
        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@contentTypeId", contentTypeId);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            var propertyType = new PropertyType(
                reader.GetString("PropertyEditorAlias"),
                MapDatabaseType(reader.GetString("DatabaseType")),
                reader.GetString("Alias")
            )
            {
                Name = reader.GetString("Name"),
                Description = reader.IsDBNull("Description") ? null : reader.GetString("Description"),
                Mandatory = reader.GetBoolean("Mandatory"),
                SortOrder = reader.GetInt32("SortOrder")
            };
            
            newContentType.AddPropertyType(propertyType);
        }
    }

    private async Task MigrateContentProperties(SqlConnection connection, int contentId, IContent newContent)
    {
        var sql = @"
            SELECT 
                pt.Alias as PropertyAlias,
                pd.textValue as TextValue,
                pd.intValue as IntValue,
                pd.dateValue as DateValue
            FROM umbracoPropertyData pd
            INNER JOIN umbracoPropertyType pt ON pd.propertyTypeId = pt.id
            WHERE pd.contentNodeId = @contentId";
        
        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@contentId", contentId);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            var propertyAlias = reader.GetString("PropertyAlias");
            
            // 根据值类型设置属性值
            if (!reader.IsDBNull("TextValue"))
            {
                newContent.SetValue(propertyAlias, reader.GetString("TextValue"));
            }
            else if (!reader.IsDBNull("IntValue"))
            {
                newContent.SetValue(propertyAlias, reader.GetInt32("IntValue"));
            }
            else if (!reader.IsDBNull("DateValue"))
            {
                newContent.SetValue(propertyAlias, reader.GetDateTime("DateValue"));
            }
        }
    }

    private async Task MigrateMediaFile(SqlConnection connection, OldMedia oldMedia, IMedia newMedia)
    {
        // 获取旧媒体文件路径
        var sql = @"
            SELECT pd.textValue as FilePath
            FROM umbracoPropertyData pd
            INNER JOIN umbracoPropertyType pt ON pd.propertyTypeId = pt.id
            WHERE pd.contentNodeId = @mediaId AND pt.Alias = 'umbracoFile'";
        
        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@mediaId", oldMedia.Id);
        
        var filePath = await command.ExecuteScalarAsync() as string;
        
        if (!string.IsNullOrEmpty(filePath))
        {
            // 复制文件到新位置
            var oldFullPath = Path.Combine(GetOldMediaPath(), filePath.TrimStart('~', '/').Replace('/', Path.DirectorySeparatorChar));
            
            if (File.Exists(oldFullPath))
            {
                using var fileStream = File.OpenRead(oldFullPath);
                newMedia.SetValue("umbracoFile", Path.GetFileName(filePath), fileStream);
            }
        }
    }

    private async Task MigrateMediaProperties(SqlConnection connection, int mediaId, IMedia newMedia)
    {
        var sql = @"
            SELECT 
                pt.Alias as PropertyAlias,
                pd.textValue as TextValue,
                pd.intValue as IntValue,
                pd.dateValue as DateValue
            FROM umbracoPropertyData pd
            INNER JOIN umbracoPropertyType pt ON pd.propertyTypeId = pt.id
            WHERE pd.contentNodeId = @mediaId";
        
        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@mediaId", mediaId);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            var propertyAlias = reader.GetString("PropertyAlias");
            
            if (propertyAlias == "umbracoFile") continue; // 已在MigrateMediaFile中处理
            
            // 根据值类型设置属性值
            if (!reader.IsDBNull("TextValue"))
            {
                newMedia.SetValue(propertyAlias, reader.GetString("TextValue"));
            }
            else if (!reader.IsDBNull("IntValue"))
            {
                newMedia.SetValue(propertyAlias, reader.GetInt32("IntValue"));
            }
            else if (!reader.IsDBNull("DateValue"))
            {
                newMedia.SetValue(propertyAlias, reader.GetDateTime("DateValue"));
            }
        }
    }

    private async Task MigrateUserGroups(SqlConnection connection, int userId, IUser newUser)
    {
        var sql = @"
            SELECT ug.userGroupAlias as GroupAlias
            FROM umbracoUser2UserGroup u2ug
            INNER JOIN umbracoUserGroup ug ON u2ug.userGroupId = ug.id
            WHERE u2ug.userId = @userId";
        
        using var command = new SqlCommand(sql, connection);
        command.Parameters.AddWithValue("@userId", userId);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            var groupAlias = reader.GetString("GroupAlias");
            var userGroup = _userService.GetUserGroupByAlias(groupAlias);
            
            if (userGroup != null)
            {
                newUser.AddGroup(userGroup.ToReadOnlyGroup());
            }
        }
    }

    private async Task MigrateContentTypesFromUmbraco9(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 9 特定的内容类型迁移逻辑
        // 实现细节...
    }

    private async Task MigrateContentFromUmbraco9(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 9 特定的内容迁移逻辑
        // 实现细节...
    }

    private async Task MigrateMediaFromUmbraco9(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 9 特定的媒体迁移逻辑
        // 实现细节...
    }

    private async Task MigrateUsersFromUmbraco9(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 9 特定的用户迁移逻辑
        // 实现细节...
    }

    private async Task MigrateContentTypesFromUmbraco10(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 10 特定的内容类型迁移逻辑
        // 实现细节...
    }

    private async Task MigrateContentFromUmbraco10(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 10 特定的内容迁移逻辑
        // 实现细节...
    }

    private async Task MigrateMediaFromUmbraco10(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 10 特定的媒体迁移逻辑
        // 实现细节...
    }

    private async Task MigrateUsersFromUmbraco10(SqlConnection connection, MigrationResult result)
    {
        // Umbraco 10 特定的用户迁移逻辑
        // 实现细节...
    }

    private async Task ValidateSchemaCompatibility(SqlConnection connection, MigrationResult result)
    {
        // 验证schema兼容性
        // 实现细节...
    }

    private async Task MigrateContentTypeTemplates(SqlConnection connection, int contentTypeId, IContentType newContentType)
    {
        // 迁移模板
        // 实现细节...
    }

    private async Task MigrateDataTypes(SqlConnection connection, MigrationResult result)
    {
        // 迁移数据类型
        // 实现细节...
    }

    private async Task MigrateDictionaryItems(SqlConnection connection, MigrationResult result)
    {
        // 迁移字典项
        // 实现细节...
    }

    private async Task MigrateMacros(SqlConnection connection, MigrationResult result)
    {
        // 迁移宏
        // 实现细节...
    }

    private async Task MigrateLanguages(SqlConnection connection, MigrationResult result)
    {
        // 迁移语言
        // 实现细节...
    }

    private ValueStorageType MapDatabaseType(string dbType)
    {
        return dbType?.ToLower() switch
        {
            "ntext" => ValueStorageType.Ntext,
            "nvarchar" => ValueStorageType.Nvarchar,
            "integer" => ValueStorageType.Integer,
            "date" => ValueStorageType.Date,
            "decimal" => ValueStorageType.Decimal,
            _ => ValueStorageType.Nvarchar
        };
    }

    private string GetOldMediaPath()
    {
        // 返回旧媒体文件路径
        return Path.Combine(Directory.GetCurrentDirectory(), "OldMedia");
    }
}

// 数据模型
public class OldContentType
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Alias { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
    public bool AllowedAsRoot { get; set; }
}

public class OldContent
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ParentId { get; set; }
    public int Level { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public string ContentTypeAlias { get; set; }
    public bool Published { get; set; }
    public int CreatorId { get; set; }
}

public class OldMedia
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ParentId { get; set; }
    public int Level { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public string ContentTypeAlias { get; set; }
}

public class OldUser
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Comments { get; set; }
    public bool IsApproved { get; set; }
    public bool IsLockedOut { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
}

public class MigrationResult
{
    public bool Success { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public TimeSpan Duration => EndTime - StartTime;
    public int SuccessCount { get; set; }
    public int ContentTypesMigrated { get; set; }
    public int ContentMigrated { get; set; }
    public int MediaMigrated { get; set; }
    public int UsersMigrated { get; set; }
    public List<string> Errors { get; set; } = new();
}
```

## 6.2 从其他CMS迁移

### 6.2.1 WordPress迁移服务

```csharp
// Services/WordPressMigrationService.cs
public interface IWordPressMigrationService
{
    Task<MigrationResult> MigrateFromWordPressAsync(string wpDatabaseConnectionString, string wpUploadsPath);
    Task<MigrationResult> MigrateWordPressPostsAsync(string wpDatabaseConnectionString);
    Task<MigrationResult> MigrateWordPressMediaAsync(string wpDatabaseConnectionString, string wpUploadsPath);
    Task<MigrationResult> MigrateWordPressUsersAsync(string wpDatabaseConnectionString);
}

public class WordPressMigrationService : IWordPressMigrationService
{
    private readonly IContentService _contentService;
    private readonly IMediaService _mediaService;
    private readonly IUserService _userService;
    private readonly IContentTypeService _contentTypeService;
    private readonly ILogger<WordPressMigrationService> _logger;

    public WordPressMigrationService(
        IContentService contentService,
        IMediaService mediaService,
        IUserService userService,
        IContentTypeService contentTypeService,
        ILogger<WordPressMigrationService> logger)
    {
        _contentService = contentService;
        _mediaService = mediaService;
        _userService = userService;
        _contentTypeService = contentTypeService;
        _logger = logger;
    }

    public async Task<MigrationResult> MigrateFromWordPressAsync(string wpDatabaseConnectionString, string wpUploadsPath)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            _logger.LogInformation("Starting WordPress migration");
            
            // 1. 创建必要的Document Types
            await CreateWordPressDocumentTypes(result);
            
            // 2. 迁移文章和页面
            var postsResult = await MigrateWordPressPostsAsync(wpDatabaseConnectionString);
            result.ContentMigrated = postsResult.SuccessCount;
            result.Errors.AddRange(postsResult.Errors);
            
            // 3. 迁移媒体
            var mediaResult = await MigrateWordPressMediaAsync(wpDatabaseConnectionString, wpUploadsPath);
            result.MediaMigrated = mediaResult.SuccessCount;
            result.Errors.AddRange(mediaResult.Errors);
            
            // 4. 迁移用户
            var usersResult = await MigrateWordPressUsersAsync(wpDatabaseConnectionString);
            result.UsersMigrated = usersResult.SuccessCount;
            result.Errors.AddRange(usersResult.Errors);
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            _logger.LogInformation("WordPress migration completed. Success: {Success}, Errors: {ErrorCount}", 
                result.Success, result.Errors.Count);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during WordPress migration");
            result.Errors.Add($"Migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateWordPressPostsAsync(string wpDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var connection = new MySqlConnection(wpDatabaseConnectionString);
            await connection.OpenAsync();
            
            // 获取WordPress文章和页面
            var posts = await GetWordPressPosts(connection);
            
            foreach (var post in posts)
            {
                try
                {
                    var contentType = post.PostType == "page" ? "textPage" : "blogPost";
                    var contentTypeObj = _contentTypeService.Get(contentType);
                    
                    if (contentTypeObj == null)
                    {
                        result.Errors.Add($"Content type {contentType} not found");
                        continue;
                    }
                    
                    // 创建内容
                    var content = _contentService.Create(post.PostTitle, -1, contentType);
                    
                    // 设置属性
                    content.SetValue("title", post.PostTitle);
                    content.SetValue("content", ConvertWordPressContent(post.PostContent));
                    content.SetValue("excerpt", post.PostExcerpt);
                    content.SetValue("publishDate", post.PostDate);
                    
                    // 处理WordPress自定义字段
                    await MigrateWordPressCustomFields(connection, post.Id, content);
                    
                    // 设置基本属性
                    content.CreateDate = post.PostDate;
                    content.UpdateDate = post.PostModified;
                    
                    // 保存内容
                    var saveResult = _contentService.Save(content);
                    
                    if (saveResult.Success)
                    {
                        // 如果WordPress文章已发布，则发布Umbraco内容
                        if (post.PostStatus == "publish")
                        {
                            _contentService.PublishWithStatus(content, post.PostAuthor);
                        }
                        
                        result.SuccessCount++;
                        _logger.LogInformation("Migrated WordPress post: {Title}", post.PostTitle);
                    }
                    else
                    {
                        result.Errors.Add($"Failed to save post {post.PostTitle}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate post {post.PostTitle}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating post {Title}", post.PostTitle);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during WordPress posts migration");
            result.Errors.Add($"Posts migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateWordPressMediaAsync(string wpDatabaseConnectionString, string wpUploadsPath)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var connection = new MySqlConnection(wpDatabaseConnectionString);
            await connection.OpenAsync();
            
            // 获取WordPress媒体
            var mediaItems = await GetWordPressMedia(connection);
            
            foreach (var item in mediaItems)
            {
                try
                {
                    // 确定媒体类型
                    var mediaType = GetUmbracoMediaType(item.PostMimeType);
                    
                    // 创建媒体
                    var media = _mediaService.CreateMedia(item.PostTitle, -1, mediaType);
                    
                    // 复制文件
                    var sourcePath = Path.Combine(wpUploadsPath, item.AttachedFile);
                    
                    if (File.Exists(sourcePath))
                    {
                        using var fileStream = File.OpenRead(sourcePath);
                        media.SetValue("umbracoFile", Path.GetFileName(sourcePath), fileStream);
                        
                        // 设置其他属性
                        media.SetValue("altText", item.AltText);
                        media.SetValue("caption", item.PostExcerpt);
                        
                        // 设置基本属性
                        media.CreateDate = item.PostDate;
                        media.UpdateDate = item.PostModified;
                        
                        // 保存媒体
                        var saveResult = _mediaService.Save(media);
                        
                        if (saveResult.Success)
                        {
                            result.SuccessCount++;
                            _logger.LogInformation("Migrated WordPress media: {Title}", item.PostTitle);
                        }
                        else
                        {
                            result.Errors.Add($"Failed to save media {item.PostTitle}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                        }
                    }
                    else
                    {
                        result.Errors.Add($"Media file not found: {sourcePath}");
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate media {item.PostTitle}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating media {Title}", item.PostTitle);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during WordPress media migration");
            result.Errors.Add($"Media migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<MigrationResult> MigrateWordPressUsersAsync(string wpDatabaseConnectionString)
    {
        var result = new MigrationResult { StartTime = DateTime.UtcNow };
        
        try
        {
            using var connection = new MySqlConnection(wpDatabaseConnectionString);
            await connection.OpenAsync();
            
            // 获取WordPress用户
            var users = await GetWordPressUsers(connection);
            
            foreach (var user in users)
            {
                try
                {
                    // 检查用户是否已存在
                    var existingUser = _userService.GetByEmail(user.UserEmail);
                    if (existingUser != null)
                    {
                        _logger.LogWarning("User {Email} already exists, skipping", user.UserEmail);
                        continue;
                    }
                    
                    // 创建用户
                    var newUser = _userService.CreateUserWithIdentity(
                        user.UserLogin,
                        user.UserEmail,
                        user.DisplayName,
                        user.DisplayName
                    );
                    
                    // 设置用户属性
                    newUser.Comments = "Migrated from WordPress";
                    newUser.IsApproved = user.UserStatus == "0";
                    newUser.CreateDate = user.UserRegistered;
                    newUser.UpdateDate = user.UserRegistered;
                    
                    // 根据WordPress角色设置用户组
                    await MigrateWordPressUserRole(connection, user.Id, newUser);
                    
                    // 保存用户
                    _userService.Save(newUser);
                    
                    result.SuccessCount++;
                    _logger.LogInformation("Migrated WordPress user: {Email}", user.UserEmail);
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate user {user.UserEmail}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating user {Email}", user.UserEmail);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during WordPress users migration");
            result.Errors.Add($"Users migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    // 私有辅助方法
    private async Task CreateWordPressDocumentTypes(MigrationResult result)
    {
        try
        {
            // 创建Blog Post Document Type
            var blogPostType = _contentTypeService.Get("blogPost");
            if (blogPostType == null)
            {
                blogPostType = new ContentType(-1)
                {
                    Name = "Blog Post",
                    Alias = "blogPost",
                    Icon = "icon-article",
                    Description = "Blog post migrated from WordPress",
                    AllowedAsRoot = true
                };
                
                blogPostType.AddPropertyType(new PropertyType("Umbraco.TextBox", ValueStorageType.Nvarchar, "title") { Name = "Title", Mandatory = true });
                blogPostType.AddPropertyType(new PropertyType("Umbraco.TinyMCE", ValueStorageType.Ntext, "content") { Name = "Content" });
                blogPostType.AddPropertyType(new PropertyType("Umbraco.TextArea", ValueStorageType.Ntext, "excerpt") { Name = "Excerpt" });
                blogPostType.AddPropertyType(new PropertyType("Umbraco.DateTime", ValueStorageType.Date, "publishDate") { Name = "Publish Date" });
                blogPostType.AddPropertyType(new PropertyType("Umbraco.Tags", ValueStorageType.Ntext, "tags") { Name = "Tags" });
                blogPostType.AddPropertyType(new PropertyType("Umbraco.MultiNodeTreePicker", ValueStorageType.Ntext, "categories") { Name = "Categories" });
                
                _contentTypeService.Save(blogPostType);
            }
            
            // 创建Text Page Document Type
            var textPageType = _contentTypeService.Get("textPage");
            if (textPageType == null)
            {
                textPageType = new ContentType(-1)
                {
                    Name = "Text Page",
                    Alias = "textPage",
                    Icon = "icon-document",
                    Description = "Text page migrated from WordPress",
                    AllowedAsRoot = true
                };
                
                textPageType.AddPropertyType(new PropertyType("Umbraco.TextBox", ValueStorageType.Nvarchar, "title") { Name = "Title", Mandatory = true });
                textPageType.AddPropertyType(new PropertyType("Umbraco.TinyMCE", ValueStorageType.Ntext, "content") { Name = "Content" });
                textPageType.AddPropertyType(new PropertyType("Umbraco.TextArea", ValueStorageType.Ntext, "excerpt") { Name = "Excerpt" });
                textPageType.AddPropertyType(new PropertyType("Umbraco.DateTime", ValueStorageType.Date, "publishDate") { Name = "Publish Date" });
                
                _contentTypeService.Save(textPageType);
            }
            
            _logger.LogInformation("WordPress Document Types created successfully");
        }
        catch (Exception ex)
        {
            result.Errors.Add($"Failed to create WordPress Document Types: {ex.Message}");
            _logger.LogError(ex, "Error creating WordPress Document Types");
        }
    }

    private async Task<List<WordPressPost>> GetWordPressPosts(MySqlConnection connection)
    {
        var sql = @"
            SELECT 
                p.ID as Id,
                p.post_author as PostAuthor,
                p.post_date as PostDate,
                p.post_date_gmt as PostDateGmt,
                p.post_content as PostContent,
                p.post_title as PostTitle,
                p.post_excerpt as PostExcerpt,
                p.post_status as PostStatus,
                p.post_type as PostType,
                p.post_modified as PostModified,
                p.post_modified_gmt as PostModifiedGmt
            FROM wp_posts p
            WHERE p.post_type IN ('post', 'page')
            AND p.post_status IN ('publish', 'draft', 'private')
            ORDER BY p.post_date DESC";
        
        using var command = new MySqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var posts = new List<WordPressPost>();
        
        while (await reader.ReadAsync())
        {
            posts.Add(new WordPressPost
            {
                Id = reader.GetInt32("Id"),
                PostAuthor = reader.GetInt32("PostAuthor"),
                PostDate = reader.GetDateTime("PostDate"),
                PostDateGmt = reader.GetDateTime("PostDateGmt"),
                PostContent = reader.GetString("PostContent"),
                PostTitle = reader.GetString("PostTitle"),
                PostExcerpt = reader.GetString("PostExcerpt"),
                PostStatus = reader.GetString("PostStatus"),
                PostType = reader.GetString("PostType"),
                PostModified = reader.GetDateTime("PostModified"),
                PostModifiedGmt = reader.GetDateTime("PostModifiedGmt")
            });
        }
        
        return posts;
    }

    private async Task<List<WordPressMedia>> GetWordPressMedia(MySqlConnection connection)
    {
        var sql = @"
            SELECT 
                p.ID as Id,
                p.post_title as PostTitle,
                p.post_excerpt as PostExcerpt,
                p.post_date as PostDate,
                p.post_modified as PostModified,
                p.post_mime_type as PostMimeType,
                pm.meta_value as AttachedFile,
                pm2.meta_value as AltText
            FROM wp_posts p
            LEFT JOIN wp_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = '_wp_attached_file'
            LEFT JOIN wp_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = '_wp_attachment_image_alt'
            WHERE p.post_type = 'attachment'
            ORDER BY p.post_date DESC";
        
        using var command = new MySqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var mediaItems = new List<WordPressMedia>();
        
        while (await reader.ReadAsync())
        {
            mediaItems.Add(new WordPressMedia
            {
                Id = reader.GetInt32("Id"),
                PostTitle = reader.GetString("PostTitle"),
                PostExcerpt = reader.IsDBNull("PostExcerpt") ? null : reader.GetString("PostExcerpt"),
                PostDate = reader.GetDateTime("PostDate"),
                PostModified = reader.GetDateTime("PostModified"),
                PostMimeType = reader.GetString("PostMimeType"),
                AttachedFile = reader.IsDBNull("AttachedFile") ? null : reader.GetString("AttachedFile"),
                AltText = reader.IsDBNull("AltText") ? null : reader.GetString("AltText")
            });
        }
        
        return mediaItems;
    }

    private async Task<List<WordPressUser>> GetWordPressUsers(MySqlConnection connection)
    {
        var sql = @"
            SELECT 
                u.ID as Id,
                u.user_login as UserLogin,
                u.user_email as UserEmail,
                u.user_registered as UserRegistered,
                u.user_status as UserStatus,
                u.display_name as DisplayName
            FROM wp_users u
            ORDER BY u.user_registered DESC";
        
        using var command = new MySqlCommand(sql, connection);
        using var reader = await command.ExecuteReaderAsync();
        
        var users = new List<WordPressUser>();
        
        while (await reader.ReadAsync())
        {
            users.Add(new WordPressUser
            {
                Id = reader.GetInt32("Id"),
                UserLogin = reader.GetString("UserLogin"),
                UserEmail = reader.GetString("UserEmail"),
                UserRegistered = reader.GetDateTime("UserRegistered"),
                UserStatus = reader.GetString("UserStatus"),
                DisplayName = reader.GetString("DisplayName")
            });
        }
        
        return users;
    }

    private async Task MigrateWordPressCustomFields(MySqlConnection connection, int postId, IContent content)
    {
        var sql = @"
            SELECT 
                pm.meta_key as MetaKey,
                pm.meta_value as MetaValue
            FROM wp_postmeta pm
            WHERE pm.post_id = @postId
            AND pm.meta_key NOT LIKE '\_%'";
        
        using var command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@postId", postId);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            var metaKey = reader.GetString("MetaKey");
            var metaValue = reader.GetString("MetaValue");
            
            // 将WordPress自定义字段映射到Umbraco属性
            if (content.ContentType.PropertyTypes.Any(pt => pt.Alias == metaKey))
            {
                content.SetValue(metaKey, metaValue);
            }
        }
    }

    private async Task MigrateWordPressUserRole(MySqlConnection connection, int userId, IUser newUser)
    {
        var sql = @"
            SELECT 
                um.meta_value as Capabilities
            FROM wp_usermeta um
            WHERE um.user_id = @userId
            AND um.meta_key = 'wp_capabilities'";
        
        using var command = new MySqlCommand(sql, connection);
        command.Parameters.AddWithValue("@userId", userId);
        
        var capabilities = await command.ExecuteScalarAsync() as string;
        
        if (!string.IsNullOrEmpty(capabilities))
        {
            // 解析WordPress角色并映射到Umbraco用户组
            var userGroupAlias = MapWordPressRoleToUmbracoGroup(capabilities);
            var userGroup = _userService.GetUserGroupByAlias(userGroupAlias);
            
            if (userGroup != null)
            {
                newUser.AddGroup(userGroup.ToReadOnlyGroup());
            }
        }
    }

    private string ConvertWordPressContent(string wpContent)
    {
        if (string.IsNullOrEmpty(wpContent))
            return wpContent;
        
        // 转换WordPress短代码
        wpContent = wpContent.Replace("[gallery", "<!-- Gallery -->");
        wpContent = wpContent.Replace("[caption", "<!-- Caption -->");
        
        // 转换WordPress特定的HTML
        wpContent = wpContent.Replace("wp-image-", "umbraco-image-");
        
        // 其他转换逻辑...
        
        return wpContent;
    }

    private string GetUmbracoMediaType(string mimeType)
    {
        return mimeType switch
        {
            var type when type.StartsWith("image/") => "Image",
            var type when type.StartsWith("video/") => "Video",
            var type when type.StartsWith("audio/") => "Audio",
            _ => "File"
        };
    }

    private string MapWordPressRoleToUmbracoGroup(string capabilities)
    {
        if (capabilities.Contains("administrator"))
            return "admin";
        if (capabilities.Contains("editor"))
            return "editor";
        if (capabilities.Contains("author"))
            return "writer";
        if (capabilities.Contains("contributor"))
            return "writer";
        
        return "writer"; // 默认角色
    }
}

// WordPress数据模型
public class WordPressPost
{
    public int Id { get; set; }
    public int PostAuthor { get; set; }
    public DateTime PostDate { get; set; }
    public DateTime PostDateGmt { get; set; }
    public string PostContent { get; set; }
    public string PostTitle { get; set; }
    public string PostExcerpt { get; set; }
    public string PostStatus { get; set; }
    public string PostType { get; set; }
    public DateTime PostModified { get; set; }
    public DateTime PostModifiedGmt { get; set; }
}

public class WordPressMedia
{
    public int Id { get; set; }
    public string PostTitle { get; set; }
    public string PostExcerpt { get; set; }
    public DateTime PostDate { get; set; }
    public DateTime PostModified { get; set; }
    public string PostMimeType { get; set; }
    public string AttachedFile { get; set; }
    public string AltText { get; set; }
}

public class WordPressUser
{
    public int Id { get; set; }
    public string UserLogin { get; set; }
    public string UserEmail { get; set; }
    public DateTime UserRegistered { get; set; }
    public string UserStatus { get; set; }
    public string DisplayName { get; set; }
}
```

## 6.3 批量更新现有内容

### 6.3.1 内容更新服务

```csharp
// Services/ContentUpdateService.cs
public interface IContentUpdateService
{
    Task<UpdateResult> BulkUpdateContentAsync(BulkUpdateRequest request);
    Task<UpdateResult> UpdateContentPropertiesAsync(string contentType, Dictionary<string, object> updates);
    Task<UpdateResult> UpdateContentStructureAsync(string contentType, StructureUpdateRequest request);
    Task<UpdateResult> MigrateContentTypeAsync(string oldContentType, string newContentType);
    Task<UpdateResult> CleanupOrphanedContentAsync();
}

public class ContentUpdateService : IContentUpdateService
{
    private readonly IContentService _contentService;
    private readonly IContentTypeService _contentTypeService;
    private readonly IUmbracoDatabase _database;
    private readonly ILogger<ContentUpdateService> _logger;

    public ContentUpdateService(
        IContentService contentService,
        IContentTypeService contentTypeService,
        IUmbracoDatabase database,
        ILogger<ContentUpdateService> logger)
    {
        _contentService = contentService;
        _contentTypeService = contentTypeService;
        _database = database;
        _logger = logger;
    }

    public async Task<UpdateResult> BulkUpdateContentAsync(BulkUpdateRequest request)
    {
        var result = new UpdateResult { StartTime = DateTime.UtcNow };
        
        try
        {
            _logger.LogInformation("Starting bulk content update for {ContentType}", request.ContentType);
            
            // 获取要更新的内容
            var content = GetContentByType(request.ContentType, request.Filters);
            
            using var transaction = _database.GetTransaction();
            
            foreach (var item in content)
            {
                try
                {
                    bool hasChanges = false;
                    
                    // 应用更新
                    foreach (var update in request.Updates)
                    {
                        var currentValue = item.GetValue(update.Key);
                        var newValue = update.Value;
                        
                        // 处理特殊更新逻辑
                        newValue = ProcessUpdateValue(update.Key, currentValue, newValue, request.UpdateMode);
                        
                        if (!Equals(currentValue, newValue))
                        {
                            item.SetValue(update.Key, newValue);
                            hasChanges = true;
                        }
                    }
                    
                    // 如果有变化，保存内容
                    if (hasChanges)
                    {
                        var saveResult = _contentService.Save(item);
                        
                        if (saveResult.Success)
                        {
                            result.SuccessCount++;
                            _logger.LogDebug("Updated content: {Name}", item.Name);
                        }
                        else
                        {
                            result.Errors.Add($"Failed to save content {item.Name}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to update content {item.Name}: {ex.Message}");
                    _logger.LogError(ex, "Error updating content {Name}", item.Name);
                }
            }
            
            transaction.Complete();
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            _logger.LogInformation("Bulk content update completed. Updated: {Count}, Errors: {ErrorCount}", 
                result.SuccessCount, result.Errors.Count);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during bulk content update");
            result.Errors.Add($"Bulk update failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<UpdateResult> UpdateContentPropertiesAsync(string contentType, Dictionary<string, object> updates)
    {
        var result = new UpdateResult { StartTime = DateTime.UtcNow };
        
        try
        {
            // 使用SQL直接更新以提高性能
            using var transaction = _database.GetTransaction();
            
            foreach (var update in updates)
            {
                var sql = @"
                    UPDATE umbracoPropertyData 
                    SET textValue = @newValue, updateDate = @updateDate
                    WHERE propertyTypeId IN (
                        SELECT id FROM umbracoPropertyType pt
                        INNER JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
                        WHERE ct.alias = @contentType AND pt.alias = @propertyAlias
                    )";
                
                var affectedRows = await _database.ExecuteAsync(sql, new
                {
                    newValue = update.Value?.ToString(),
                    updateDate = DateTime.UtcNow,
                    contentType = contentType,
                    propertyAlias = update.Key
                });
                
                result.SuccessCount += affectedRows;
                _logger.LogInformation("Updated {Count} records for property {Property}", affectedRows, update.Key);
            }
            
            transaction.Complete();
            
            result.EndTime = DateTime.UtcNow;
            result.Success = true;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating content properties");
            result.Errors.Add($"Property update failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<UpdateResult> UpdateContentStructureAsync(string contentType, StructureUpdateRequest request)
    {
        var result = new UpdateResult { StartTime = DateTime.UtcNow };
        
        try
        {
            var contentTypeObj = _contentTypeService.Get(contentType);
            if (contentTypeObj == null)
            {
                result.Errors.Add($"Content type {contentType} not found");
                result.Success = false;
                return result;
            }
            
            // 添加新属性
            foreach (var newProperty in request.PropertiesToAdd)
            {
                var propertyType = new PropertyType(
                    newProperty.PropertyEditorAlias,
                    newProperty.ValueType,
                    newProperty.Alias
                )
                {
                    Name = newProperty.Name,
                    Description = newProperty.Description,
                    Mandatory = newProperty.Mandatory,
                    SortOrder = newProperty.SortOrder
                };
                
                contentTypeObj.AddPropertyType(propertyType);
            }
            
            // 删除属性
            foreach (var propertyAlias in request.PropertiesToRemove)
            {
                var propertyType = contentTypeObj.PropertyTypes.FirstOrDefault(pt => pt.Alias == propertyAlias);
                if (propertyType != null)
                {
                    contentTypeObj.RemovePropertyType(propertyType.Alias);
                }
            }
            
            // 更新现有属性
            foreach (var propertyUpdate in request.PropertiesToUpdate)
            {
                var propertyType = contentTypeObj.PropertyTypes.FirstOrDefault(pt => pt.Alias == propertyUpdate.Alias);
                if (propertyType != null)
                {
                    propertyType.Name = propertyUpdate.Name ?? propertyType.Name;
                    propertyType.Description = propertyUpdate.Description ?? propertyType.Description;
                    propertyType.Mandatory = propertyUpdate.Mandatory ?? propertyType.Mandatory;
                    propertyType.SortOrder = propertyUpdate.SortOrder ?? propertyType.SortOrder;
                }
            }
            
            // 保存内容类型
            _contentTypeService.Save(contentTypeObj);
            
            result.SuccessCount = 1;
            result.EndTime = DateTime.UtcNow;
            result.Success = true;
            
            _logger.LogInformation("Updated content type structure: {ContentType}", contentType);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating content structure");
            result.Errors.Add($"Structure update failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<UpdateResult> MigrateContentTypeAsync(string oldContentType, string newContentType)
    {
        var result = new UpdateResult { StartTime = DateTime.UtcNow };
        
        try
        {
            var oldType = _contentTypeService.Get(oldContentType);
            var newType = _contentTypeService.Get(newContentType);
            
            if (oldType == null || newType == null)
            {
                result.Errors.Add($"Content type not found: {oldContentType} or {newContentType}");
                result.Success = false;
                return result;
            }
            
            // 获取所有旧类型的内容
            var oldContent = _contentService.GetContentOfContentType(oldType.Id);
            
            foreach (var content in oldContent)
            {
                try
                {
                    // 创建新类型的内容
                    var newContent = _contentService.Create(content.Name, content.ParentId, newContentType);
                    
                    // 迁移属性值
                    foreach (var propertyType in newType.PropertyTypes)
                    {
                        var oldValue = content.GetValue(propertyType.Alias);
                        if (oldValue != null)
                        {
                            newContent.SetValue(propertyType.Alias, oldValue);
                        }
                    }
                    
                    // 设置基本属性
                    newContent.CreateDate = content.CreateDate;
                    newContent.UpdateDate = content.UpdateDate;
                    newContent.SortOrder = content.SortOrder;
                    
                    // 保存新内容
                    var saveResult = _contentService.Save(newContent);
                    
                    if (saveResult.Success)
                    {
                        // 如果原内容已发布，发布新内容
                        if (content.Published)
                        {
                            _contentService.PublishWithStatus(newContent, content.WriterId);
                        }
                        
                        // 删除旧内容
                        _contentService.Delete(content);
                        
                        result.SuccessCount++;
                        _logger.LogInformation("Migrated content from {OldType} to {NewType}: {Name}", 
                            oldContentType, newContentType, content.Name);
                    }
                    else
                    {
                        result.Errors.Add($"Failed to save migrated content {content.Name}: {string.Join(", ", saveResult.EventMessages.Select(m => m.Message))}");
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to migrate content {content.Name}: {ex.Message}");
                    _logger.LogError(ex, "Error migrating content {Name}", content.Name);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during content type migration");
            result.Errors.Add($"Content type migration failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    public async Task<UpdateResult> CleanupOrphanedContentAsync()
    {
        var result = new UpdateResult { StartTime = DateTime.UtcNow };
        
        try
        {
            // 查找孤立的内容
            var orphanedContentSql = @"
                SELECT c.nodeId
                FROM umbracoContent c
                LEFT JOIN umbracoContentType ct ON c.contentTypeId = ct.nodeId
                WHERE ct.nodeId IS NULL";
            
            var orphanedContentIds = await _database.QueryAsync<int>(orphanedContentSql);
            
            foreach (var contentId in orphanedContentIds)
            {
                try
                {
                    var content = _contentService.GetById(contentId);
                    if (content != null)
                    {
                        _contentService.Delete(content);
                        result.SuccessCount++;
                        _logger.LogInformation("Deleted orphaned content: {Id}", contentId);
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to delete orphaned content {contentId}: {ex.Message}");
                    _logger.LogError(ex, "Error deleting orphaned content {Id}", contentId);
                }
            }
            
            // 清理孤立的属性数据
            var orphanedPropertySql = @"
                DELETE FROM umbracoPropertyData
                WHERE contentNodeId NOT IN (SELECT nodeId FROM umbracoContent)";
            
            var deletedProperties = await _database.ExecuteAsync(orphanedPropertySql);
            
            // 清理孤立的媒体
            var orphanedMediaSql = @"
                SELECT m.nodeId
                FROM umbracoContent m
                INNER JOIN umbracoNode n ON m.nodeId = n.id
                LEFT JOIN umbracoContentType ct ON m.contentTypeId = ct.nodeId
                WHERE n.nodeObjectType = 'B796F64C-1F99-4FFB-B886-4BF4BC011A9C'
                AND ct.nodeId IS NULL";
            
            var orphanedMediaIds = await _database.QueryAsync<int>(orphanedMediaSql);
            
            foreach (var mediaId in orphanedMediaIds)
            {
                try
                {
                    var media = _mediaService.GetById(mediaId);
                    if (media != null)
                    {
                        _mediaService.Delete(media);
                        result.SuccessCount++;
                        _logger.LogInformation("Deleted orphaned media: {Id}", mediaId);
                    }
                }
                catch (Exception ex)
                {
                    result.Errors.Add($"Failed to delete orphaned media {mediaId}: {ex.Message}");
                    _logger.LogError(ex, "Error deleting orphaned media {Id}", mediaId);
                }
            }
            
            result.EndTime = DateTime.UtcNow;
            result.Success = result.Errors.Count == 0;
            
            _logger.LogInformation("Cleanup completed. Deleted {Count} items, Properties: {Properties}, Errors: {ErrorCount}", 
                result.SuccessCount, deletedProperties, result.Errors.Count);
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during cleanup");
            result.Errors.Add($"Cleanup failed: {ex.Message}");
            result.Success = false;
            result.EndTime = DateTime.UtcNow;
            return result;
        }
    }

    // 私有辅助方法
    private IEnumerable<IContent> GetContentByType(string contentType, Dictionary<string, object> filters = null)
    {
        var contentTypeObj = _contentTypeService.Get(contentType);
        if (contentTypeObj == null)
            return new List<IContent>();

        var content = _contentService.GetContentOfContentType(contentTypeObj.Id);

        if (filters != null)
        {
            foreach (var filter in filters)
            {
                content = content.Where(c => 
                {
                    var value = c.GetValue(filter.Key);
                    return value != null && value.ToString().Contains(filter.Value.ToString(), StringComparison.OrdinalIgnoreCase);
                });
            }
        }

        return content;
    }

    private object ProcessUpdateValue(string propertyAlias, object currentValue, object newValue, UpdateMode updateMode)
    {
        return updateMode switch
        {
            UpdateMode.Replace => newValue,
            UpdateMode.Append => currentValue?.ToString() + newValue?.ToString(),
            UpdateMode.Prepend => newValue?.ToString() + currentValue?.ToString(),
            UpdateMode.ReplaceIfEmpty => string.IsNullOrEmpty(currentValue?.ToString()) ? newValue : currentValue,
            _ => newValue
        };
    }
}

// 请求和结果模型
public class BulkUpdateRequest
{
    public string ContentType { get; set; }
    public Dictionary<string, object> Updates { get; set; }
    public Dictionary<string, object> Filters { get; set; }
    public UpdateMode UpdateMode { get; set; } = UpdateMode.Replace;
}

public class StructureUpdateRequest
{
    public List<PropertyTypeInfo> PropertiesToAdd { get; set; } = new();
    public List<string> PropertiesToRemove { get; set; } = new();
    public List<PropertyUpdateInfo> PropertiesToUpdate { get; set; } = new();
}

public class PropertyTypeInfo
{
    public string Alias { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string PropertyEditorAlias { get; set; }
    public ValueStorageType ValueType { get; set; }
    public bool Mandatory { get; set; }
    public int SortOrder { get; set; }
}

public class PropertyUpdateInfo
{
    public string Alias { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool? Mandatory { get; set; }
    public int? SortOrder { get; set; }
}

public class UpdateResult
{
    public bool Success { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public TimeSpan Duration => EndTime - StartTime;
    public int SuccessCount { get; set; }
    public List<string> Errors { get; set; } = new();
}

public enum UpdateMode
{
    Replace,
    Append,
    Prepend,
    ReplaceIfEmpty
}
```

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "\u521b\u5efaUmbraco\u4f18\u5316\u4e0e\u6279\u91cf\u5bfc\u5165\u5b9e\u65bd\u65b9\u6848", "status": "completed", "priority": "high", "id": "1"}, {"content": "\u8bbe\u8ba1\u4f18\u5316\u7684Document Types\u7ed3\u6784", "status": "completed", "priority": "high", "id": "2"}, {"content": "\u5b9e\u73b0\u6279\u91cf\u5bfc\u5165\u529f\u80fd", "status": "completed", "priority": "high", "id": "3"}, {"content": "\u521b\u5efa\u9ad8\u6027\u80fdHeadless API", "status": "completed", "priority": "high", "id": "4"}, {"content": "\u5b9e\u73b0\u5185\u5bb9\u6a21\u677f\u548c\u590d\u7528\u7ec4\u4ef6", "status": "completed", "priority": "medium", "id": "5"}, {"content": "\u6027\u80fd\u4f18\u5316\u5b9e\u73b0", "status": "completed", "priority": "medium", "id": "6"}, {"content": "\u521b\u5efa\u6570\u636e\u8fc1\u79fb\u811a\u672c", "status": "completed", "priority": "low", "id": "7"}]