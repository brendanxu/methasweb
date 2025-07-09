# 📋 任务4: 内容模板和复用组件实现

## 4.1 媒体选择器组件

### 4.1.1 增强的媒体选择器组件

```csharp
// Components/MediaSelectorComponent.cs
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Umbraco.Cms.Core.Models.PublishedContent;
using Umbraco.Cms.Core.PropertyEditors;

[ViewComponent(Name = "MediaSelector")]
public class MediaSelectorComponent : ViewComponent
{
    public IViewComponentResult Invoke(string propertyAlias, IPublishedContent content, bool allowMultiple = false, string mediaType = "Image")
    {
        var model = new MediaSelectorViewModel
        {
            PropertyAlias = propertyAlias,
            Content = content,
            AllowMultiple = allowMultiple,
            MediaType = mediaType,
            CurrentMedia = allowMultiple 
                ? content?.Value<IEnumerable<IPublishedContent>>(propertyAlias) 
                : new[] { content?.Value<IPublishedContent>(propertyAlias) }.Where(x => x != null)
        };

        return View(model);
    }
}

// ViewModels/MediaSelectorViewModel.cs
public class MediaSelectorViewModel
{
    public string PropertyAlias { get; set; }
    public IPublishedContent Content { get; set; }
    public bool AllowMultiple { get; set; }
    public string MediaType { get; set; }
    public IEnumerable<IPublishedContent> CurrentMedia { get; set; }
    public string AcceptedFileTypes => GetAcceptedFileTypes();
    public long MaxFileSize => GetMaxFileSize();
    public int MaxFiles => AllowMultiple ? 10 : 1;

    private string GetAcceptedFileTypes()
    {
        return MediaType.ToLower() switch
        {
            "image" => ".jpg,.jpeg,.png,.gif,.webp,.svg",
            "video" => ".mp4,.avi,.mov,.wmv,.webm",
            "audio" => ".mp3,.wav,.ogg,.m4a",
            "document" => ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
            _ => "*"
        };
    }

    private long GetMaxFileSize()
    {
        return MediaType.ToLower() switch
        {
            "image" => 5 * 1024 * 1024, // 5MB
            "video" => 100 * 1024 * 1024, // 100MB
            "audio" => 10 * 1024 * 1024, // 10MB
            "document" => 25 * 1024 * 1024, // 25MB
            _ => 50 * 1024 * 1024 // 50MB
        };
    }
}
```

### 4.1.2 媒体选择器视图

```html
<!-- Views/Shared/Components/MediaSelector/Default.cshtml -->
@model MediaSelectorViewModel

<div class="media-selector" data-property="@Model.PropertyAlias">
    <div class="media-selector-header">
        <h4>@Model.MediaType Selection</h4>
        <button type="button" class="btn btn-primary btn-sm" onclick="openMediaPicker('@Model.PropertyAlias', '@Model.MediaType', @Model.AllowMultiple.ToString().ToLower())">
            <i class="icon icon-add"></i> 
            @(Model.AllowMultiple ? "Add Files" : "Select File")
        </button>
    </div>

    <div class="media-selector-content">
        @if (Model.CurrentMedia?.Any() == true)
        {
            <div class="media-grid" data-max-files="@Model.MaxFiles">
                @foreach (var media in Model.CurrentMedia)
                {
                    <div class="media-item" data-media-id="@media.Id">
                        <div class="media-preview">
                            @if (media.ContentType.Alias == "Image")
                            {
                                <img src="@media.Url()" alt="@media.Value("alt")" class="media-thumbnail" />
                            }
                            else if (media.ContentType.Alias == "File")
                            {
                                <div class="file-preview">
                                    <i class="icon icon-document"></i>
                                    <span>@media.Name</span>
                                </div>
                            }
                            else if (media.ContentType.Alias == "Video")
                            {
                                <video class="media-thumbnail" controls>
                                    <source src="@media.Url()" type="video/mp4">
                                </video>
                            }
                        </div>
                        
                        <div class="media-info">
                            <h5>@media.Name</h5>
                            <p class="text-muted">@media.Value("umbracoBytes") bytes</p>
                            <p class="text-muted">@media.CreateDate.ToString("yyyy-MM-dd HH:mm")</p>
                        </div>
                        
                        <div class="media-actions">
                            <button type="button" class="btn btn-sm btn-secondary" onclick="editMediaItem(@media.Id)">
                                <i class="icon icon-edit"></i> Edit
                            </button>
                            <button type="button" class="btn btn-sm btn-danger" onclick="removeMediaItem(@media.Id, '@Model.PropertyAlias')">
                                <i class="icon icon-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                }
            </div>
        }
        else
        {
            <div class="media-selector-empty">
                <div class="empty-state">
                    <i class="icon icon-picture"></i>
                    <h5>No @Model.MediaType selected</h5>
                    <p>Click the button above to select @Model.MediaType files</p>
                </div>
            </div>
        }
    </div>

    <div class="media-selector-info">
        <small class="text-muted">
            Accepted formats: @Model.AcceptedFileTypes<br>
            Max file size: @(Model.MaxFileSize / 1024 / 1024)MB<br>
            @if (Model.AllowMultiple)
            {
                <span>Max files: @Model.MaxFiles</span>
            }
        </small>
    </div>

    <!-- Hidden input to store selected media IDs -->
    <input type="hidden" name="@Model.PropertyAlias" value="@string.Join(",", Model.CurrentMedia?.Select(m => m.Id) ?? new int[0])" />
</div>

<script>
function openMediaPicker(propertyAlias, mediaType, allowMultiple) {
    // 集成Umbraco媒体选择器
    const options = {
        multiPicker: allowMultiple,
        onlyImages: mediaType === 'Image',
        disableFolderSelect: true,
        callback: function(data) {
            updateMediaSelection(propertyAlias, data);
        }
    };

    // 调用Umbraco媒体选择器
    UmbClientMgr.openMediaPicker(options);
}

function updateMediaSelection(propertyAlias, selectedMedia) {
    const container = document.querySelector(`[data-property="${propertyAlias}"]`);
    const mediaGrid = container.querySelector('.media-grid');
    const emptyState = container.querySelector('.media-selector-empty');
    const hiddenInput = container.querySelector('input[type="hidden"]');

    if (selectedMedia && selectedMedia.length > 0) {
        // 隐藏空状态
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        // 显示媒体网格
        if (mediaGrid) {
            mediaGrid.style.display = 'grid';
        }

        // 更新隐藏输入的值
        const mediaIds = selectedMedia.map(m => m.id);
        hiddenInput.value = mediaIds.join(',');

        // 刷新媒体项显示
        loadMediaItems(propertyAlias, mediaIds);
    }
}

function removeMediaItem(mediaId, propertyAlias) {
    if (confirm('Are you sure you want to remove this media item?')) {
        const container = document.querySelector(`[data-property="${propertyAlias}"]`);
        const mediaItem = container.querySelector(`[data-media-id="${mediaId}"]`);
        const hiddenInput = container.querySelector('input[type="hidden"]');

        if (mediaItem) {
            mediaItem.remove();
        }

        // 更新隐藏输入的值
        const remainingIds = Array.from(container.querySelectorAll('.media-item'))
            .map(item => item.dataset.mediaId)
            .filter(id => id !== mediaId.toString());

        hiddenInput.value = remainingIds.join(',');

        // 如果没有媒体项了，显示空状态
        if (remainingIds.length === 0) {
            const emptyState = container.querySelector('.media-selector-empty');
            if (emptyState) {
                emptyState.style.display = 'block';
            }
        }
    }
}

function editMediaItem(mediaId) {
    // 打开媒体编辑器
    UmbClientMgr.openMediaEditor(mediaId);
}

function loadMediaItems(propertyAlias, mediaIds) {
    // 通过AJAX加载媒体项详情
    fetch(`/umbraco/backoffice/api/media/GetMediaItems`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: mediaIds })
    })
    .then(response => response.json())
    .then(data => {
        // 更新媒体项显示
        updateMediaGrid(propertyAlias, data);
    });
}
</script>

<style>
.media-selector {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    background: #f9f9f9;
}

.media-selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-bottom: 15px;
}

.media-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    background: white;
    transition: box-shadow 0.2s;
}

.media-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.media-preview {
    text-align: center;
    margin-bottom: 10px;
}

.media-thumbnail {
    max-width: 100%;
    max-height: 120px;
    object-fit: cover;
    border-radius: 4px;
}

.file-preview {
    padding: 20px;
    text-align: center;
    background: #f5f5f5;
    border-radius: 4px;
}

.file-preview i {
    font-size: 24px;
    margin-bottom: 5px;
}

.media-info h5 {
    margin: 0 0 5px 0;
    font-size: 14px;
    font-weight: 600;
}

.media-info p {
    margin: 0;
    font-size: 12px;
}

.media-actions {
    display: flex;
    gap: 5px;
    margin-top: 10px;
}

.media-actions .btn {
    flex: 1;
    padding: 5px 10px;
    font-size: 12px;
}

.media-selector-empty {
    text-align: center;
    padding: 40px 20px;
    color: #666;
}

.empty-state i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #ccc;
}

.empty-state h5 {
    margin: 0 0 10px 0;
    font-weight: 600;
}

.empty-state p {
    margin: 0;
    font-size: 14px;
}

.media-selector-info {
    border-top: 1px solid #eee;
    padding-top: 10px;
    margin-top: 15px;
}
</style>
```

## 4.2 SEO设置组件

### 4.2.1 SEO设置组件

```csharp
// Components/SeoSettingsComponent.cs
[ViewComponent(Name = "SeoSettings")]
public class SeoSettingsComponent : ViewComponent
{
    private readonly IPublishedContentQuery _contentQuery;

    public SeoSettingsComponent(IPublishedContentQuery contentQuery)
    {
        _contentQuery = contentQuery;
    }

    public IViewComponentResult Invoke(IPublishedContent content)
    {
        var model = new SeoSettingsViewModel
        {
            Content = content,
            SeoTitle = content?.Value<string>("seoTitle") ?? content?.Value<string>("title") ?? content?.Name,
            SeoDescription = content?.Value<string>("seoDescription") ?? content?.Value<string>("summary") ?? content?.Value<string>("abstract"),
            SeoKeywords = content?.Value<string>("seoKeywords"),
            OgTitle = content?.Value<string>("ogTitle") ?? content?.Value<string>("seoTitle") ?? content?.Value<string>("title"),
            OgDescription = content?.Value<string>("ogDescription") ?? content?.Value<string>("seoDescription"),
            OgImage = content?.Value<IPublishedContent>("ogImage") ?? content?.Value<IPublishedContent>("heroImage") ?? content?.Value<IPublishedContent>("coverImage"),
            TwitterTitle = content?.Value<string>("twitterTitle") ?? content?.Value<string>("ogTitle"),
            TwitterDescription = content?.Value<string>("twitterDescription") ?? content?.Value<string>("ogDescription"),
            TwitterImage = content?.Value<IPublishedContent>("twitterImage") ?? content?.Value<IPublishedContent>("ogImage"),
            NoIndex = content?.Value<bool>("noIndex") ?? false,
            NoFollow = content?.Value<bool>("noFollow") ?? false,
            CanonicalUrl = content?.Value<string>("canonicalUrl"),
            StructuredData = content?.Value<string>("structuredData")
        };

        return View(model);
    }
}

// ViewModels/SeoSettingsViewModel.cs
public class SeoSettingsViewModel
{
    public IPublishedContent Content { get; set; }
    public string SeoTitle { get; set; }
    public string SeoDescription { get; set; }
    public string SeoKeywords { get; set; }
    public string OgTitle { get; set; }
    public string OgDescription { get; set; }
    public IPublishedContent OgImage { get; set; }
    public string TwitterTitle { get; set; }
    public string TwitterDescription { get; set; }
    public IPublishedContent TwitterImage { get; set; }
    public bool NoIndex { get; set; }
    public bool NoFollow { get; set; }
    public string CanonicalUrl { get; set; }
    public string StructuredData { get; set; }

    // 计算属性
    public int SeoTitleLength => SeoTitle?.Length ?? 0;
    public int SeoDescriptionLength => SeoDescription?.Length ?? 0;
    public bool IsSeoTitleOptimal => SeoTitleLength >= 30 && SeoTitleLength <= 60;
    public bool IsSeoDescriptionOptimal => SeoDescriptionLength >= 120 && SeoDescriptionLength <= 160;
    public string SeoScore => CalculateSeoScore();

    private string CalculateSeoScore()
    {
        var score = 0;
        var maxScore = 10;

        if (IsSeoTitleOptimal) score += 2;
        if (IsSeoDescriptionOptimal) score += 2;
        if (!string.IsNullOrEmpty(SeoKeywords)) score += 1;
        if (OgImage != null) score += 2;
        if (!string.IsNullOrEmpty(OgTitle)) score += 1;
        if (!string.IsNullOrEmpty(OgDescription)) score += 1;
        if (!string.IsNullOrEmpty(StructuredData)) score += 1;

        var percentage = (score * 100) / maxScore;
        return percentage switch
        {
            >= 80 => "Excellent",
            >= 60 => "Good",
            >= 40 => "Fair",
            _ => "Poor"
        };
    }
}
```

### 4.2.2 SEO设置视图

```html
<!-- Views/Shared/Components/SeoSettings/Default.cshtml -->
@model SeoSettingsViewModel

<div class="seo-settings-component">
    <div class="seo-header">
        <h3>
            <i class="icon icon-search"></i>
            SEO Settings
        </h3>
        <div class="seo-score">
            <span class="score-label">SEO Score:</span>
            <span class="score-value @GetScoreClass(Model.SeoScore)">@Model.SeoScore</span>
        </div>
    </div>

    <div class="seo-tabs">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active" data-tab="basic">Basic SEO</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-tab="social">Social Media</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-tab="advanced">Advanced</a>
            </li>
        </ul>

        <!-- Basic SEO Tab -->
        <div class="tab-content active" id="basic">
            <div class="form-group">
                <label for="seoTitle">SEO Title</label>
                <input type="text" 
                       id="seoTitle" 
                       name="seoTitle" 
                       value="@Model.SeoTitle" 
                       class="form-control @(Model.IsSeoTitleOptimal ? "is-valid" : "is-warning")"
                       maxlength="60"
                       onkeyup="updateSeoPreview()" />
                <div class="form-text">
                    <span class="char-count @(Model.IsSeoTitleOptimal ? "text-success" : "text-warning")">
                        @Model.SeoTitleLength / 60 characters
                    </span>
                    <span class="recommendation">
                        @(Model.IsSeoTitleOptimal ? "✓ Good length" : "⚠ Recommended: 30-60 characters")
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label for="seoDescription">SEO Description</label>
                <textarea id="seoDescription" 
                          name="seoDescription" 
                          class="form-control @(Model.IsSeoDescriptionOptimal ? "is-valid" : "is-warning")"
                          rows="3" 
                          maxlength="160"
                          onkeyup="updateSeoPreview()">@Model.SeoDescription</textarea>
                <div class="form-text">
                    <span class="char-count @(Model.IsSeoDescriptionOptimal ? "text-success" : "text-warning")">
                        @Model.SeoDescriptionLength / 160 characters
                    </span>
                    <span class="recommendation">
                        @(Model.IsSeoDescriptionOptimal ? "✓ Good length" : "⚠ Recommended: 120-160 characters")
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label for="seoKeywords">SEO Keywords</label>
                <input type="text" 
                       id="seoKeywords" 
                       name="seoKeywords" 
                       value="@Model.SeoKeywords" 
                       class="form-control"
                       placeholder="Enter keywords separated by commas" />
                <div class="form-text">
                    <small>Enter relevant keywords separated by commas. Focus on 3-5 main keywords.</small>
                </div>
            </div>

            <!-- SEO Preview -->
            <div class="seo-preview">
                <h4>Search Engine Preview</h4>
                <div class="preview-container">
                    <div class="preview-title" id="previewTitle">@Model.SeoTitle</div>
                    <div class="preview-url" id="previewUrl">https://yoursite.com@(Model.Content?.Url())</div>
                    <div class="preview-description" id="previewDescription">@Model.SeoDescription</div>
                </div>
            </div>
        </div>

        <!-- Social Media Tab -->
        <div class="tab-content" id="social">
            <h4>Open Graph (Facebook, LinkedIn)</h4>
            <div class="form-group">
                <label for="ogTitle">OG Title</label>
                <input type="text" 
                       id="ogTitle" 
                       name="ogTitle" 
                       value="@Model.OgTitle" 
                       class="form-control"
                       placeholder="Leave blank to use SEO title" />
            </div>

            <div class="form-group">
                <label for="ogDescription">OG Description</label>
                <textarea id="ogDescription" 
                          name="ogDescription" 
                          class="form-control"
                          rows="3"
                          placeholder="Leave blank to use SEO description">@Model.OgDescription</textarea>
            </div>

            <div class="form-group">
                <label for="ogImage">OG Image</label>
                @await Component.InvokeAsync("MediaSelector", new { propertyAlias = "ogImage", content = Model.Content, allowMultiple = false, mediaType = "Image" })
                <div class="form-text">
                    <small>Recommended size: 1200x630px. Will fall back to hero/cover image if not set.</small>
                </div>
            </div>

            <h4>Twitter Cards</h4>
            <div class="form-group">
                <label for="twitterTitle">Twitter Title</label>
                <input type="text" 
                       id="twitterTitle" 
                       name="twitterTitle" 
                       value="@Model.TwitterTitle" 
                       class="form-control"
                       placeholder="Leave blank to use OG title" />
            </div>

            <div class="form-group">
                <label for="twitterDescription">Twitter Description</label>
                <textarea id="twitterDescription" 
                          name="twitterDescription" 
                          class="form-control"
                          rows="3"
                          placeholder="Leave blank to use OG description">@Model.TwitterDescription</textarea>
            </div>

            <div class="form-group">
                <label for="twitterImage">Twitter Image</label>
                @await Component.InvokeAsync("MediaSelector", new { propertyAlias = "twitterImage", content = Model.Content, allowMultiple = false, mediaType = "Image" })
                <div class="form-text">
                    <small>Recommended size: 1200x600px. Will fall back to OG image if not set.</small>
                </div>
            </div>

            <!-- Social Preview -->
            <div class="social-preview">
                <h4>Social Media Preview</h4>
                <div class="preview-container facebook-preview">
                    <div class="preview-image">
                        @if (Model.OgImage != null)
                        {
                            <img src="@Model.OgImage.Url()" alt="OG Image" />
                        }
                        else
                        {
                            <div class="placeholder-image">No image selected</div>
                        }
                    </div>
                    <div class="preview-content">
                        <div class="preview-title">@(Model.OgTitle ?? Model.SeoTitle)</div>
                        <div class="preview-description">@(Model.OgDescription ?? Model.SeoDescription)</div>
                        <div class="preview-url">yoursite.com</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advanced Tab -->
        <div class="tab-content" id="advanced">
            <div class="form-group">
                <label for="canonicalUrl">Canonical URL</label>
                <input type="url" 
                       id="canonicalUrl" 
                       name="canonicalUrl" 
                       value="@Model.CanonicalUrl" 
                       class="form-control"
                       placeholder="Leave blank to use current URL" />
                <div class="form-text">
                    <small>Use this to prevent duplicate content issues. Leave blank unless you have a specific reason to change it.</small>
                </div>
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input type="checkbox" 
                           id="noIndex" 
                           name="noIndex" 
                           class="form-check-input"
                           @(Model.NoIndex ? "checked" : "") />
                    <label class="form-check-label" for="noIndex">
                        No Index
                    </label>
                </div>
                <div class="form-text">
                    <small>Prevent search engines from indexing this page.</small>
                </div>
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input type="checkbox" 
                           id="noFollow" 
                           name="noFollow" 
                           class="form-check-input"
                           @(Model.NoFollow ? "checked" : "") />
                    <label class="form-check-label" for="noFollow">
                        No Follow
                    </label>
                </div>
                <div class="form-text">
                    <small>Prevent search engines from following links on this page.</small>
                </div>
            </div>

            <div class="form-group">
                <label for="structuredData">Structured Data (JSON-LD)</label>
                <textarea id="structuredData" 
                          name="structuredData" 
                          class="form-control code-editor"
                          rows="10"
                          placeholder="Enter structured data JSON-LD markup">@Model.StructuredData</textarea>
                <div class="form-text">
                    <small>Add structured data to help search engines understand your content better.</small>
                </div>
            </div>

            <div class="seo-suggestions">
                <h4>SEO Suggestions</h4>
                <ul class="suggestions-list">
                    @if (!Model.IsSeoTitleOptimal)
                    {
                        <li class="suggestion warning">
                            <i class="icon icon-warning"></i>
                            Consider adjusting your SEO title to 30-60 characters for optimal display in search results.
                        </li>
                    }
                    
                    @if (!Model.IsSeoDescriptionOptimal)
                    {
                        <li class="suggestion warning">
                            <i class="icon icon-warning"></i>
                            Consider adjusting your SEO description to 120-160 characters for optimal display in search results.
                        </li>
                    }
                    
                    @if (string.IsNullOrEmpty(Model.SeoKeywords))
                    {
                        <li class="suggestion info">
                            <i class="icon icon-info"></i>
                            Add relevant keywords to help search engines understand your content.
                        </li>
                    }
                    
                    @if (Model.OgImage == null)
                    {
                        <li class="suggestion info">
                            <i class="icon icon-info"></i>
                            Add an Open Graph image to improve social media sharing.
                        </li>
                    }
                    
                    @if (string.IsNullOrEmpty(Model.StructuredData))
                    {
                        <li class="suggestion info">
                            <i class="icon icon-info"></i>
                            Consider adding structured data to enhance search engine understanding.
                        </li>
                    }
                </ul>
            </div>
        </div>
    </div>
</div>

@functions {
    private string GetScoreClass(string score)
    {
        return score switch
        {
            "Excellent" => "score-excellent",
            "Good" => "score-good",
            "Fair" => "score-fair",
            _ => "score-poor"
        };
    }
}

<script>
// Tab switching
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            const targetTab = document.getElementById(this.dataset.tab);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
});

// SEO Preview updates
function updateSeoPreview() {
    const title = document.getElementById('seoTitle').value;
    const description = document.getElementById('seoDescription').value;
    
    document.getElementById('previewTitle').textContent = title || 'Page Title';
    document.getElementById('previewDescription').textContent = description || 'Page description will appear here...';
    
    // Update character counts
    updateCharacterCount('seoTitle', 60);
    updateCharacterCount('seoDescription', 160);
}

function updateCharacterCount(fieldId, maxLength) {
    const field = document.getElementById(fieldId);
    const length = field.value.length;
    const counter = field.parentElement.querySelector('.char-count');
    
    if (counter) {
        counter.textContent = `${length} / ${maxLength} characters`;
        
        // Update color based on length
        if (fieldId === 'seoTitle') {
            counter.className = length >= 30 && length <= 60 ? 'char-count text-success' : 'char-count text-warning';
        } else if (fieldId === 'seoDescription') {
            counter.className = length >= 120 && length <= 160 ? 'char-count text-success' : 'char-count text-warning';
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateSeoPreview();
});
</script>

<style>
.seo-settings-component {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.seo-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
}

.seo-header h3 {
    margin: 0;
    color: #495057;
}

.seo-score {
    display: flex;
    align-items: center;
    gap: 10px;
}

.score-label {
    font-weight: 600;
    color: #6c757d;
}

.score-value {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
}

.score-excellent {
    background: #d4edda;
    color: #155724;
}

.score-good {
    background: #cce5ff;
    color: #004085;
}

.score-fair {
    background: #fff3cd;
    color: #856404;
}

.score-poor {
    background: #f8d7da;
    color: #721c24;
}

.nav-tabs {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0 0 20px 0;
    border-bottom: 2px solid #dee2e6;
}

.nav-item {
    margin: 0;
}

.nav-link {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #6c757d;
    border: none;
    background: none;
    cursor: pointer;
    transition: color 0.2s;
}

.nav-link:hover {
    color: #495057;
}

.nav-link.active {
    color: #007bff;
    border-bottom: 2px solid #007bff;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #495057;
}

.form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    transition: border-color 0.2s;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-control.is-valid {
    border-color: #28a745;
}

.form-control.is-warning {
    border-color: #ffc107;
}

.form-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-size: 12px;
}

.char-count {
    font-weight: 600;
}

.text-success {
    color: #28a745;
}

.text-warning {
    color: #ffc107;
}

.recommendation {
    color: #6c757d;
}

.seo-preview {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}

.seo-preview h4 {
    margin: 0 0 15px 0;
    color: #495057;
}

.preview-container {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 15px;
}

.preview-title {
    color: #1a0dab;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 5px;
    cursor: pointer;
}

.preview-title:hover {
    text-decoration: underline;
}

.preview-url {
    color: #006621;
    font-size: 14px;
    margin-bottom: 5px;
}

.preview-description {
    color: #545454;
    font-size: 14px;
    line-height: 1.4;
}

.social-preview {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}

.facebook-preview {
    display: flex;
    background: #f7f8fa;
    border: 1px solid #dddfe2;
    border-radius: 8px;
    overflow: hidden;
}

.facebook-preview .preview-image {
    width: 200px;
    height: 105px;
    background: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.facebook-preview .preview-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-image {
    color: #8a8d91;
    font-size: 12px;
    text-align: center;
}

.facebook-preview .preview-content {
    flex: 1;
    padding: 10px 12px;
    background: white;
}

.facebook-preview .preview-title {
    color: #1d2129;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    line-height: 1.2;
}

.facebook-preview .preview-description {
    color: #606770;
    font-size: 14px;
    line-height: 1.3;
    margin-bottom: 8px;
}

.facebook-preview .preview-url {
    color: #8a8d91;
    font-size: 12px;
    text-transform: uppercase;
}

.seo-suggestions {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
}

.suggestions-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.suggestion {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f3f4;
}

.suggestion:last-child {
    border-bottom: none;
}

.suggestion.warning {
    color: #856404;
}

.suggestion.info {
    color: #0c5460;
}

.suggestion i {
    margin-top: 2px;
    font-size: 16px;
}

.code-editor {
    font-family: 'Courier New', monospace;
    background: #f8f9fa;
}

.form-check {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.form-check-input {
    margin: 0;
}

.form-check-label {
    margin: 0;
    font-weight: 600;
    color: #495057;
}
</style>
```

## 4.3 关联内容选择器组件

### 4.3.1 关联内容选择器组件

```csharp
// Components/RelatedContentSelectorComponent.cs
[ViewComponent(Name = "RelatedContentSelector")]
public class RelatedContentSelectorComponent : ViewComponent
{
    private readonly IPublishedContentQuery _contentQuery;

    public RelatedContentSelectorComponent(IPublishedContentQuery contentQuery)
    {
        _contentQuery = contentQuery;
    }

    public IViewComponentResult Invoke(string propertyAlias, IPublishedContent content, string contentType, bool allowMultiple = true, int maxItems = 10)
    {
        var model = new RelatedContentSelectorViewModel
        {
            PropertyAlias = propertyAlias,
            Content = content,
            ContentType = contentType,
            AllowMultiple = allowMultiple,
            MaxItems = maxItems,
            SelectedContent = GetSelectedContent(content, propertyAlias, allowMultiple),
            AvailableContent = GetAvailableContent(contentType, content?.Id ?? 0)
        };

        return View(model);
    }

    private IEnumerable<IPublishedContent> GetSelectedContent(IPublishedContent content, string propertyAlias, bool allowMultiple)
    {
        if (content == null) return new List<IPublishedContent>();

        if (allowMultiple)
        {
            return content.Value<IEnumerable<IPublishedContent>>(propertyAlias) ?? new List<IPublishedContent>();
        }
        else
        {
            var single = content.Value<IPublishedContent>(propertyAlias);
            return single != null ? new[] { single } : new List<IPublishedContent>();
        }
    }

    private IEnumerable<IPublishedContent> GetAvailableContent(string contentType, int excludeId)
    {
        return _contentQuery.ContentOfType(contentType)
            .Where(c => c.Id != excludeId && c.IsPublished())
            .OrderBy(c => c.Name)
            .Take(100); // Limit for performance
    }
}

// ViewModels/RelatedContentSelectorViewModel.cs
public class RelatedContentSelectorViewModel
{
    public string PropertyAlias { get; set; }
    public IPublishedContent Content { get; set; }
    public string ContentType { get; set; }
    public bool AllowMultiple { get; set; }
    public int MaxItems { get; set; }
    public IEnumerable<IPublishedContent> SelectedContent { get; set; }
    public IEnumerable<IPublishedContent> AvailableContent { get; set; }

    public string ContentTypeDisplayName => ContentType switch
    {
        "businessService" => "Business Service",
        "caseStudy" => "Case Study",
        "carbonInsight" => "Carbon Insight",
        "project" => "Project",
        "teamMember" => "Team Member",
        "category" => "Category",
        "industry" => "Industry",
        _ => ContentType
    };
}
```

### 4.3.2 关联内容选择器视图

```html
<!-- Views/Shared/Components/RelatedContentSelector/Default.cshtml -->
@model RelatedContentSelectorViewModel

<div class="related-content-selector" data-property="@Model.PropertyAlias">
    <div class="selector-header">
        <h4>
            <i class="icon icon-link"></i>
            Related @Model.ContentTypeDisplayName
        </h4>
        <div class="selector-actions">
            <button type="button" class="btn btn-sm btn-primary" onclick="openContentSelector('@Model.PropertyAlias')">
                <i class="icon icon-add"></i>
                Add @Model.ContentTypeDisplayName
            </button>
            @if (Model.AllowMultiple)
            {
                <button type="button" class="btn btn-sm btn-secondary" onclick="clearAllSelection('@Model.PropertyAlias')">
                    <i class="icon icon-trash"></i>
                    Clear All
                </button>
            }
        </div>
    </div>

    <div class="selector-content">
        @if (Model.SelectedContent?.Any() == true)
        {
            <div class="selected-items" data-max-items="@Model.MaxItems">
                @foreach (var item in Model.SelectedContent)
                {
                    <div class="selected-item" data-content-id="@item.Id">
                        <div class="item-preview">
                            @{
                                var previewImage = GetPreviewImage(item);
                            }
                            @if (previewImage != null)
                            {
                                <img src="@previewImage" alt="@item.Name" class="item-thumbnail" />
                            }
                            else
                            {
                                <div class="item-placeholder">
                                    <i class="icon @GetContentIcon(item.ContentType.Alias)"></i>
                                </div>
                            }
                        </div>
                        
                        <div class="item-info">
                            <h5>@item.Name</h5>
                            <p class="text-muted">@item.ContentType.Name</p>
                            <p class="text-muted">@item.CreateDate.ToString("yyyy-MM-dd")</p>
                            
                            @if (item.ContentType.Alias == "businessService")
                            {
                                <p class="item-description">@item.Value<string>("serviceDescription")</p>
                            }
                            else if (item.ContentType.Alias == "caseStudy")
                            {
                                <p class="item-description">@item.Value<string>("summary")</p>
                            }
                            else if (item.ContentType.Alias == "carbonInsight")
                            {
                                <p class="item-description">@item.Value<string>("abstract")</p>
                            }
                            else if (item.ContentType.Alias == "project")
                            {
                                <p class="item-description">@item.Value<string>("projectDescription")</p>
                            }
                        </div>
                        
                        <div class="item-actions">
                            <button type="button" class="btn btn-sm btn-secondary" onclick="editRelatedContent(@item.Id)">
                                <i class="icon icon-edit"></i>
                                Edit
                            </button>
                            <button type="button" class="btn btn-sm btn-danger" onclick="removeRelatedContent(@item.Id, '@Model.PropertyAlias')">
                                <i class="icon icon-trash"></i>
                                Remove
                            </button>
                        </div>
                    </div>
                }
            </div>
        }
        else
        {
            <div class="selector-empty">
                <div class="empty-state">
                    <i class="icon icon-link"></i>
                    <h5>No @Model.ContentTypeDisplayName selected</h5>
                    <p>Click the button above to select related content</p>
                </div>
            </div>
        }
    </div>

    <!-- Content Selection Modal -->
    <div class="content-selection-modal" id="modal-@Model.PropertyAlias" style="display: none;">
        <div class="modal-backdrop" onclick="closeContentSelector('@Model.PropertyAlias')"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h4>Select @Model.ContentTypeDisplayName</h4>
                <button type="button" class="btn-close" onclick="closeContentSelector('@Model.PropertyAlias')">×</button>
            </div>
            
            <div class="modal-body">
                <div class="search-filter">
                    <input type="text" 
                           class="form-control" 
                           placeholder="Search @Model.ContentTypeDisplayName..." 
                           onkeyup="filterAvailableContent('@Model.PropertyAlias', this.value)" />
                </div>
                
                <div class="available-items">
                    @foreach (var item in Model.AvailableContent)
                    {
                        <div class="available-item" data-content-id="@item.Id">
                            <div class="item-preview">
                                @{
                                    var previewImage = GetPreviewImage(item);
                                }
                                @if (previewImage != null)
                                {
                                    <img src="@previewImage" alt="@item.Name" class="item-thumbnail" />
                                }
                                else
                                {
                                    <div class="item-placeholder">
                                        <i class="icon @GetContentIcon(item.ContentType.Alias)"></i>
                                    </div>
                                }
                            </div>
                            
                            <div class="item-info">
                                <h5>@item.Name</h5>
                                <p class="text-muted">@item.CreateDate.ToString("yyyy-MM-dd")</p>
                                
                                @if (item.ContentType.Alias == "businessService")
                                {
                                    <p class="item-description">@item.Value<string>("serviceDescription")</p>
                                }
                                else if (item.ContentType.Alias == "caseStudy")
                                {
                                    <p class="item-description">@item.Value<string>("summary")</p>
                                }
                                else if (item.ContentType.Alias == "carbonInsight")
                                {
                                    <p class="item-description">@item.Value<string>("abstract")</p>
                                }
                                else if (item.ContentType.Alias == "project")
                                {
                                    <p class="item-description">@item.Value<string>("projectDescription")</p>
                                }
                            </div>
                            
                            <div class="item-actions">
                                <button type="button" 
                                        class="btn btn-sm btn-primary" 
                                        onclick="selectRelatedContent(@item.Id, '@Model.PropertyAlias')"
                                        @(Model.SelectedContent?.Any(s => s.Id == item.Id) == true ? "disabled" : "")>
                                    @if (Model.SelectedContent?.Any(s => s.Id == item.Id) == true)
                                    {
                                        <i class="icon icon-check"></i> Selected
                                    }
                                    else
                                    {
                                        <i class="icon icon-add"></i> Select
                                    }
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeContentSelector('@Model.PropertyAlias')">
                    Close
                </button>
            </div>
        </div>
    </div>

    <!-- Hidden input to store selected content IDs -->
    <input type="hidden" 
           name="@Model.PropertyAlias" 
           value="@string.Join(",", Model.SelectedContent?.Select(c => c.Id) ?? new int[0])" />
</div>

@functions {
    private string GetPreviewImage(IPublishedContent content)
    {
        return content.ContentType.Alias switch
        {
            "businessService" => content.Value<IPublishedContent>("serviceIcon")?.Url(),
            "caseStudy" => content.Value<IPublishedContent>("heroImage")?.Url(),
            "carbonInsight" => content.Value<IPublishedContent>("coverImage")?.Url(),
            "project" => content.Value<IEnumerable<IPublishedContent>>("projectImages")?.FirstOrDefault()?.Url(),
            "teamMember" => content.Value<IPublishedContent>("profileImage")?.Url(),
            _ => null
        };
    }

    private string GetContentIcon(string contentType)
    {
        return contentType switch
        {
            "businessService" => "icon-bag",
            "caseStudy" => "icon-document",
            "carbonInsight" => "icon-article",
            "project" => "icon-folder",
            "teamMember" => "icon-user",
            "category" => "icon-tag",
            "industry" => "icon-industry",
            _ => "icon-item"
        };
    }
}

<script>
function openContentSelector(propertyAlias) {
    const modal = document.getElementById(`modal-${propertyAlias}`);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeContentSelector(propertyAlias) {
    const modal = document.getElementById(`modal-${propertyAlias}`);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function selectRelatedContent(contentId, propertyAlias) {
    const container = document.querySelector(`[data-property="${propertyAlias}"]`);
    const selectedItems = container.querySelector('.selected-items');
    const emptyState = container.querySelector('.selector-empty');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const modal = document.getElementById(`modal-${propertyAlias}`);

    // Get current selected IDs
    const currentIds = hiddenInput.value ? hiddenInput.value.split(',').map(id => parseInt(id)) : [];
    
    // Check if already selected
    if (currentIds.includes(contentId)) {
        return;
    }

    // Check max items limit
    const maxItems = parseInt(selectedItems?.dataset.maxItems || '10');
    if (currentIds.length >= maxItems) {
        alert(`You can only select up to ${maxItems} items.`);
        return;
    }

    // Add to selected IDs
    currentIds.push(contentId);
    hiddenInput.value = currentIds.join(',');

    // Hide empty state
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    // Show selected items container
    if (selectedItems) {
        selectedItems.style.display = 'block';
    }

    // Update modal button state
    const modalButton = modal.querySelector(`[onclick="selectRelatedContent(${contentId}, '${propertyAlias}')"]`);
    if (modalButton) {
        modalButton.disabled = true;
        modalButton.innerHTML = '<i class="icon icon-check"></i> Selected';
    }

    // Load and display the new selected item
    loadSelectedContent(propertyAlias, contentId);
}

function removeRelatedContent(contentId, propertyAlias) {
    if (confirm('Are you sure you want to remove this related content?')) {
        const container = document.querySelector(`[data-property="${propertyAlias}"]`);
        const selectedItem = container.querySelector(`[data-content-id="${contentId}"]`);
        const hiddenInput = container.querySelector('input[type="hidden"]');
        const modal = document.getElementById(`modal-${propertyAlias}`);

        // Remove from DOM
        if (selectedItem) {
            selectedItem.remove();
        }

        // Update hidden input
        const currentIds = hiddenInput.value ? hiddenInput.value.split(',').map(id => parseInt(id)) : [];
        const updatedIds = currentIds.filter(id => id !== contentId);
        hiddenInput.value = updatedIds.join(',');

        // Show empty state if no items left
        if (updatedIds.length === 0) {
            const emptyState = container.querySelector('.selector-empty');
            if (emptyState) {
                emptyState.style.display = 'block';
            }
        }

        // Update modal button state
        const modalButton = modal.querySelector(`[onclick="selectRelatedContent(${contentId}, '${propertyAlias}')"]`);
        if (modalButton) {
            modalButton.disabled = false;
            modalButton.innerHTML = '<i class="icon icon-add"></i> Select';
        }
    }
}

function clearAllSelection(propertyAlias) {
    if (confirm('Are you sure you want to clear all selected items?')) {
        const container = document.querySelector(`[data-property="${propertyAlias}"]`);
        const selectedItems = container.querySelector('.selected-items');
        const emptyState = container.querySelector('.selector-empty');
        const hiddenInput = container.querySelector('input[type="hidden"]');
        const modal = document.getElementById(`modal-${propertyAlias}`);

        // Clear selected items
        if (selectedItems) {
            selectedItems.innerHTML = '';
        }

        // Show empty state
        if (emptyState) {
            emptyState.style.display = 'block';
        }

        // Clear hidden input
        hiddenInput.value = '';

        // Reset all modal buttons
        const modalButtons = modal.querySelectorAll('.available-item button');
        modalButtons.forEach(button => {
            button.disabled = false;
            button.innerHTML = '<i class="icon icon-add"></i> Select';
        });
    }
}

function editRelatedContent(contentId) {
    // Open content editor
    window.open(`/umbraco/#/content/content/edit/${contentId}`, '_blank');
}

function filterAvailableContent(propertyAlias, searchTerm) {
    const modal = document.getElementById(`modal-${propertyAlias}`);
    const items = modal.querySelectorAll('.available-item');

    items.forEach(item => {
        const name = item.querySelector('h5').textContent.toLowerCase();
        const description = item.querySelector('.item-description')?.textContent.toLowerCase() || '';
        
        if (name.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function loadSelectedContent(propertyAlias, contentId) {
    // Load content details via AJAX and add to selected items
    fetch(`/umbraco/backoffice/api/content/GetContent?id=${contentId}`)
        .then(response => response.json())
        .then(data => {
            // Add the new selected item to the UI
            // This would require server-side rendering or a more complex client-side template
            // For now, we'll just reload the page or component
            location.reload();
        })
        .catch(error => {
            console.error('Error loading selected content:', error);
        });
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal-backdrop')) {
        const modal = event.target.closest('.content-selection-modal');
        if (modal) {
            const propertyAlias = modal.id.replace('modal-', '');
            closeContentSelector(propertyAlias);
        }
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.content-selection-modal[style*="display: block"]');
        openModals.forEach(modal => {
            const propertyAlias = modal.id.replace('modal-', '');
            closeContentSelector(propertyAlias);
        });
    }
});
</script>

<style>
.related-content-selector {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
}

.selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #dee2e6;
}

.selector-header h4 {
    margin: 0;
    color: #495057;
}

.selector-actions {
    display: flex;
    gap: 10px;
}

.selected-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
    margin-bottom: 15px;
}

.selected-item {
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    gap: 15px;
    transition: box-shadow 0.2s;
}

.selected-item:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.item-preview {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
}

.item-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
}

.item-placeholder {
    width: 100%;
    height: 100%;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-placeholder i {
    font-size: 24px;
    color: #6c757d;
}

.item-info {
    flex: 1;
}

.item-info h5 {
    margin: 0 0 5px 0;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
}

.item-info p {
    margin: 0 0 5px 0;
    font-size: 12px;
    color: #6c757d;
}

.item-description {
    font-size: 12px;
    color: #6c757d;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.item-actions {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.item-actions .btn {
    padding: 4px 8px;
    font-size: 11px;
    white-space: nowrap;
}

.selector-empty {
    text-align: center;
    padding: 40px 20px;
    color: #6c757d;
}

.empty-state i {
    font-size: 48px;
    margin-bottom: 15px;
    color: #dee2e6;
}

.empty-state h5 {
    margin: 0 0 10px 0;
    font-weight: 600;
}

.empty-state p {
    margin: 0;
    font-size: 14px;
}

.content-selection-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
}

.modal-header h4 {
    margin: 0;
    color: #495057;
}

.btn-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-close:hover {
    color: #495057;
}

.modal-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
}

.search-filter {
    margin-bottom: 20px;
}

.search-filter input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

.available-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.available-item {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    padding: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    transition: background-color 0.2s;
}

.available-item:hover {
    background: #e9ecef;
}

.available-item .item-preview {
    width: 50px;
    height: 50px;
}

.available-item .item-info {
    flex: 1;
}

.available-item .item-actions {
    flex-direction: row;
}

.modal-footer {
    padding: 20px;
    border-top: 1px solid #dee2e6;
    text-align: right;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #545b62;
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover {
    background: #c82333;
}

.btn-sm {
    padding: 4px 8px;
    font-size: 12px;
}

.btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.text-muted {
    color: #6c757d;
}
</style>
```

## 4.4 批量操作工具栏组件

### 4.4.1 批量操作工具栏组件

```csharp
// Components/BulkOperationsToolbarComponent.cs
[ViewComponent(Name = "BulkOperationsToolbar")]
public class BulkOperationsToolbarComponent : ViewComponent
{
    public IViewComponentResult Invoke(string contentType, IEnumerable<IPublishedContent> items)
    {
        var model = new BulkOperationsToolbarViewModel
        {
            ContentType = contentType,
            Items = items,
            TotalItems = items?.Count() ?? 0
        };

        return View(model);
    }
}

// ViewModels/BulkOperationsToolbarViewModel.cs
public class BulkOperationsToolbarViewModel
{
    public string ContentType { get; set; }
    public IEnumerable<IPublishedContent> Items { get; set; }
    public int TotalItems { get; set; }
    public string ContentTypeDisplayName => ContentType switch
    {
        "businessService" => "Business Services",
        "caseStudy" => "Case Studies",
        "carbonInsight" => "Carbon Insights",
        "project" => "Projects",
        "teamMember" => "Team Members",
        _ => ContentType
    };
}
```

### 4.4.2 批量操作工具栏视图

```html
<!-- Views/Shared/Components/BulkOperationsToolbar/Default.cshtml -->
@model BulkOperationsToolbarViewModel

<div class="bulk-operations-toolbar">
    <div class="toolbar-header">
        <div class="selection-info">
            <span class="selected-count">0</span> of <span class="total-count">@Model.TotalItems</span> @Model.ContentTypeDisplayName selected
        </div>
        
        <div class="toolbar-actions">
            <button type="button" class="btn btn-sm btn-secondary" onclick="selectAll('@Model.ContentType')" id="selectAllBtn">
                <i class="icon icon-check"></i>
                Select All
            </button>
            <button type="button" class="btn btn-sm btn-secondary" onclick="clearSelection('@Model.ContentType')" id="clearSelectionBtn" disabled>
                <i class="icon icon-clear"></i>
                Clear Selection
            </button>
        </div>
    </div>

    <div class="bulk-actions" id="bulkActions" style="display: none;">
        <div class="actions-group">
            <button type="button" class="btn btn-sm btn-success" onclick="bulkPublish('@Model.ContentType')">
                <i class="icon icon-globe"></i>
                Publish Selected
            </button>
            <button type="button" class="btn btn-sm btn-warning" onclick="bulkUnpublish('@Model.ContentType')">
                <i class="icon icon-stop"></i>
                Unpublish Selected
            </button>
            <button type="button" class="btn btn-sm btn-danger" onclick="bulkDelete('@Model.ContentType')">
                <i class="icon icon-trash"></i>
                Delete Selected
            </button>
        </div>

        <div class="actions-group">
            <button type="button" class="btn btn-sm btn-info" onclick="bulkExport('@Model.ContentType')">
                <i class="icon icon-download"></i>
                Export Selected
            </button>
            <button type="button" class="btn btn-sm btn-primary" onclick="bulkEdit('@Model.ContentType')">
                <i class="icon icon-edit"></i>
                Bulk Edit
            </button>
        </div>

        @if (Model.ContentType == "caseStudy" || Model.ContentType == "carbonInsight")
        {
            <div class="actions-group">
                <button type="button" class="btn btn-sm btn-info" onclick="bulkUpdateSeo('@Model.ContentType')">
                    <i class="icon icon-search"></i>
                    Update SEO
                </button>
            </div>
        }

        @if (Model.ContentType == "project")
        {
            <div class="actions-group">
                <button type="button" class="btn btn-sm btn-info" onclick="bulkUpdateStatus('@Model.ContentType')">
                    <i class="icon icon-settings"></i>
                    Update Status
                </button>
            </div>
        }
    </div>

    <!-- Progress Modal -->
    <div class="bulk-progress-modal" id="bulkProgressModal" style="display: none;">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h4>Bulk Operation Progress</h4>
            </div>
            <div class="modal-body">
                <div class="progress-info">
                    <div class="operation-status">
                        <span id="operationName">Processing...</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progressFill" style="width: 0%"></div>
                    </div>
                    <div class="progress-text">
                        <span id="progressText">0 of 0 completed</span>
                    </div>
                </div>
                <div class="progress-log" id="progressLog"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="cancelBulkOperation()" id="cancelBtn">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary" onclick="closeBulkProgress()" id="closeBtn" style="display: none;">
                    Close
                </button>
            </div>
        </div>
    </div>

    <!-- Bulk Edit Modal -->
    <div class="bulk-edit-modal" id="bulkEditModal" style="display: none;">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h4>Bulk Edit @Model.ContentTypeDisplayName</h4>
                <button type="button" class="btn-close" onclick="closeBulkEdit()">×</button>
            </div>
            <div class="modal-body">
                <div class="bulk-edit-form">
                    @if (Model.ContentType == "caseStudy")
                    {
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updatePublishDate" />
                                Update Publish Date
                            </label>
                            <input type="date" name="publishDate" class="form-control" disabled />
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updateTags" />
                                Update Tags
                            </label>
                            <input type="text" name="tags" class="form-control" placeholder="Enter tags separated by commas" disabled />
                        </div>
                    }
                    else if (Model.ContentType == "project")
                    {
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updateStatus" />
                                Update Status
                            </label>
                            <select name="status" class="form-control" disabled>
                                <option value="">Select status</option>
                                <option value="planning">Planning</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on-hold">On Hold</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updateFeatured" />
                                Update Featured Status
                            </label>
                            <select name="featured" class="form-control" disabled>
                                <option value="">Select featured status</option>
                                <option value="true">Featured</option>
                                <option value="false">Not Featured</option>
                            </select>
                        </div>
                    }
                    else if (Model.ContentType == "carbonInsight")
                    {
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updateCategory" />
                                Update Category
                            </label>
                            <select name="category" class="form-control" disabled>
                                <option value="">Select category</option>
                                <!-- Categories would be populated from server -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="updateReadingTime" />
                                Update Reading Time
                            </label>
                            <input type="number" name="readingTime" class="form-control" placeholder="Minutes" disabled />
                        </div>
                    }
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" name="updateSortOrder" />
                            Update Sort Order
                        </label>
                        <input type="number" name="sortOrder" class="form-control" placeholder="Sort order" disabled />
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="closeBulkEdit()">
                    Cancel
                </button>
                <button type="button" class="btn btn-primary" onclick="applyBulkEdit('@Model.ContentType')">
                    Apply Changes
                </button>
            </div>
        </div>
    </div>
</div>

<script>
let selectedItems = new Set();
let bulkOperationCancelled = false;

// Selection management
function updateSelection(contentType, itemId, isSelected) {
    if (isSelected) {
        selectedItems.add(itemId);
    } else {
        selectedItems.delete(itemId);
    }
    
    updateSelectionUI();
}

function selectAll(contentType) {
    const checkboxes = document.querySelectorAll('.content-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        selectedItems.add(parseInt(checkbox.value));
    });
    
    updateSelectionUI();
}

function clearSelection(contentType) {
    const checkboxes = document.querySelectorAll('.content-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    selectedItems.clear();
    updateSelectionUI();
}

function updateSelectionUI() {
    const selectedCount = selectedItems.size;
    const totalCount = document.querySelectorAll('.content-item-checkbox').length;
    
    document.querySelector('.selected-count').textContent = selectedCount;
    document.getElementById('clearSelectionBtn').disabled = selectedCount === 0;
    document.getElementById('selectAllBtn').disabled = selectedCount === totalCount;
    
    const bulkActions = document.getElementById('bulkActions');
    if (selectedCount > 0) {
        bulkActions.style.display = 'block';
    } else {
        bulkActions.style.display = 'none';
    }
}

// Bulk operations
async function bulkPublish(contentType) {
    if (selectedItems.size === 0) return;
    
    if (confirm(`Are you sure you want to publish ${selectedItems.size} items?`)) {
        await performBulkOperation('publish', Array.from(selectedItems), contentType);
    }
}

async function bulkUnpublish(contentType) {
    if (selectedItems.size === 0) return;
    
    if (confirm(`Are you sure you want to unpublish ${selectedItems.size} items?`)) {
        await performBulkOperation('unpublish', Array.from(selectedItems), contentType);
    }
}

async function bulkDelete(contentType) {
    if (selectedItems.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedItems.size} items? This action cannot be undone.`)) {
        await performBulkOperation('delete', Array.from(selectedItems), contentType);
    }
}

async function bulkExport(contentType) {
    if (selectedItems.size === 0) return;
    
    await performBulkOperation('export', Array.from(selectedItems), contentType);
}

function bulkEdit(contentType) {
    if (selectedItems.size === 0) return;
    
    document.getElementById('bulkEditModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

async function bulkUpdateSeo(contentType) {
    if (selectedItems.size === 0) return;
    
    if (confirm(`Are you sure you want to update SEO settings for ${selectedItems.size} items?`)) {
        await performBulkOperation('updateSeo', Array.from(selectedItems), contentType);
    }
}

async function bulkUpdateStatus(contentType) {
    if (selectedItems.size === 0) return;
    
    const status = prompt('Enter new status:');
    if (status) {
        await performBulkOperation('updateStatus', Array.from(selectedItems), contentType, { status });
    }
}

// Bulk operation execution
async function performBulkOperation(operation, itemIds, contentType, options = {}) {
    showBulkProgress(operation, itemIds.length);
    bulkOperationCancelled = false;
    
    try {
        const response = await fetch('/umbraco/backoffice/api/BulkOperations/Execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                operation: operation,
                itemIds: itemIds,
                contentType: contentType,
                options: options
            })
        });

        const result = await response.json();
        
        if (result.success) {
            updateBulkProgress(result.processed, result.total, result.message);
            
            if (result.processed === result.total) {
                completeBulkOperation();
                setTimeout(() => {
                    location.reload(); // Refresh the page to show changes
                }, 2000);
            }
        } else {
            showBulkError(result.message || 'Operation failed');
        }
    } catch (error) {
        showBulkError('Network error: ' + error.message);
    }
}

// Bulk edit
function closeBulkEdit() {
    document.getElementById('bulkEditModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

async function applyBulkEdit(contentType) {
    const form = document.querySelector('.bulk-edit-form');
    const formData = new FormData(form);
    const updates = {};
    
    // Collect checked fields and their values
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        const fieldName = checkbox.name.replace('update', '').toLowerCase();
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            updates[fieldName] = field.value;
        }
    });
    
    if (Object.keys(updates).length === 0) {
        alert('Please select at least one field to update.');
        return;
    }
    
    closeBulkEdit();
    await performBulkOperation('bulkEdit', Array.from(selectedItems), contentType, updates);
}

// Progress modal
function showBulkProgress(operation, totalItems) {
    document.getElementById('bulkProgressModal').style.display = 'block';
    document.getElementById('operationName').textContent = `${operation.charAt(0).toUpperCase() + operation.slice(1)} operation`;
    document.getElementById('progressText').textContent = `0 of ${totalItems} completed`;
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressLog').innerHTML = '';
    document.getElementById('cancelBtn').style.display = 'block';
    document.getElementById('closeBtn').style.display = 'none';
    document.body.style.overflow = 'hidden';
}

function updateBulkProgress(processed, total, message) {
    const percentage = (processed / total) * 100;
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${processed} of ${total} completed`;
    
    if (message) {
        const log = document.getElementById('progressLog');
        log.innerHTML += `<div class="log-entry">${message}</div>`;
        log.scrollTop = log.scrollHeight;
    }
}

function completeBulkOperation() {
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('closeBtn').style.display = 'block';
    document.getElementById('operationName').textContent = 'Operation completed successfully!';
}

function showBulkError(message) {
    document.getElementById('operationName').textContent = 'Operation failed';
    document.getElementById('progressLog').innerHTML += `<div class="log-entry error">${message}</div>`;
    document.getElementById('cancelBtn').style.display = 'none';
    document.getElementById('closeBtn').style.display = 'block';
}

function cancelBulkOperation() {
    bulkOperationCancelled = true;
    closeBulkProgress();
}

function closeBulkProgress() {
    document.getElementById('bulkProgressModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form field enabling/disabling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.bulk-edit-form');
    if (form) {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const fieldName = this.name.replace('update', '').toLowerCase();
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    field.disabled = !this.checked;
                }
            });
        });
    }
});

// Initialize selection tracking
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.content-item-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelection('', parseInt(this.value), this.checked);
        });
    });
});
</script>

<style>
.bulk-operations-toolbar {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.toolbar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.selection-info {
    font-size: 14px;
    color: #495057;
}

.selected-count {
    font-weight: 600;
    color: #007bff;
}

.toolbar-actions {
    display: flex;
    gap: 10px;
}

.bulk-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding-top: 15px;
    border-top: 1px solid #dee2e6;
}

.actions-group {
    display: flex;
    gap: 8px;
}

.btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
}

.btn:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.btn-sm {
    padding: 4px 8px;
    font-size: 11px;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background: #0056b3;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover:not(:disabled) {
    background: #545b62;
}

.btn-success {
    background: #28a745;
    color: white;
}

.btn-success:hover:not(:disabled) {
    background: #1e7e34;
}

.btn-warning {
    background: #ffc107;
    color: #212529;
}

.btn-warning:hover:not(:disabled) {
    background: #e0a800;
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover:not(:disabled) {
    background: #c82333;
}

.btn-info {
    background: #17a2b8;
    color: white;
}

.btn-info:hover:not(:disabled) {
    background: #138496;
}

.bulk-progress-modal,
.bulk-edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
}

.modal-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
}

.modal-header h4 {
    margin: 0;
    color: #495057;
}

.btn-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-close:hover {
    color: #495057;
}

.modal-body {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
}

.modal-footer {
    padding: 20px;
    border-top: 1px solid #dee2e6;
    text-align: right;
}

.modal-footer .btn {
    margin-left: 10px;
}

.progress-info {
    margin-bottom: 20px;
}

.operation-status {
    font-weight: 600;
    color: #495057;
    margin-bottom: 10px;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background: #e9ecef;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 10px;
}

.progress-fill {
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
}

.progress-text {
    text-align: center;
    color: #6c757d;
    font-size: 14px;
}

.progress-log {
    max-height: 200px;
    overflow-y: auto;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 10px;
}

.log-entry {
    padding: 5px 0;
    border-bottom: 1px solid #e9ecef;
    font-size: 12px;
}

.log-entry:last-child {
    border-bottom: none;
}

.log-entry.error {
    color: #dc3545;
}

.bulk-edit-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    color: #495057;
}

.form-control {
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
}

.form-control:disabled {
    background: #e9ecef;
    opacity: 0.65;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

@media (max-width: 768px) {
    .toolbar-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
    
    .bulk-actions {
        flex-direction: column;
        gap: 10px;
    }
    
    .actions-group {
        flex-wrap: wrap;
    }
    
    .modal-content {
        width: 95%;
        max-height: 90vh;
    }
}
</style>
```

现在让我完成性能优化的实现：

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "\u521b\u5efaUmbraco\u4f18\u5316\u4e0e\u6279\u91cf\u5bfc\u5165\u5b9e\u65bd\u65b9\u6848", "status": "completed", "priority": "high", "id": "1"}, {"content": "\u8bbe\u8ba1\u4f18\u5316\u7684Document Types\u7ed3\u6784", "status": "completed", "priority": "high", "id": "2"}, {"content": "\u5b9e\u73b0\u6279\u91cf\u5bfc\u5165\u529f\u80fd", "status": "completed", "priority": "high", "id": "3"}, {"content": "\u521b\u5efa\u9ad8\u6027\u80fdHeadless API", "status": "completed", "priority": "high", "id": "4"}, {"content": "\u5b9e\u73b0\u5185\u5bb9\u6a21\u677f\u548c\u590d\u7528\u7ec4\u4ef6", "status": "completed", "priority": "medium", "id": "5"}, {"content": "\u6027\u80fd\u4f18\u5316\u5b9e\u73b0", "status": "pending", "priority": "medium", "id": "6"}, {"content": "\u521b\u5efa\u6570\u636e\u8fc1\u79fb\u811a\u672c", "status": "pending", "priority": "low", "id": "7"}]