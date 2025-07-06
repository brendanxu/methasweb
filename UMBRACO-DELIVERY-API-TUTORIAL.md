# 📚 Umbraco Delivery API 配置完整教程

## 📋 目录
- [版本信息和兼容性](#版本信息和兼容性)
- [Delivery API 概述](#delivery-api-概述)
- [配置方法](#配置方法)
- [验证配置](#验证配置)
- [故障排除](#故障排除)
- [API 使用示例](#api-使用示例)

---

## 🏷️ 版本信息和兼容性

### 当前项目版本
- **Umbraco CMS**: 16.0.0
- **.NET**: 9.0
- **Delivery API**: 内置支持（无需额外安装）

### 查看您的 Umbraco 版本
```bash
# 方法1: 查看项目文件
cat apps/umbraco-simple/SouthPoleUmbracoSimple.csproj | grep Umbraco.Cms

# 方法2: 在后台查看
# 登录后台 → 右上角用户图标 → 关于/About
```

### 版本兼容性说明
> **重要提示**: 不同版本的Umbraco界面和配置方式有所不同
> - **Umbraco 13+**: Delivery API 内置，主要通过配置文件设置
> - **Umbraco 10-12**: 可能需要额外包，界面设置选项不同
> - **Umbraco 9及以下**: 不支持内置Delivery API

---

## 📖 Delivery API 概述

### 什么是 Delivery API？
Delivery API 是 Umbraco 提供的 RESTful API，用于：
- 以 JSON 格式获取已发布的内容
- 支持无头 CMS (Headless CMS) 架构
- 与前端框架（如 Next.js、React、Vue）集成

### 核心功能
- 获取所有内容：`/umbraco/delivery/api/v1/content`
- 按类型筛选：`/umbraco/delivery/api/v1/content?contentType=service`
- 获取单个内容：`/umbraco/delivery/api/v1/content/{id}`
- 支持 API Key 认证

---

## ⚙️ 配置方法

### 🎯 方法1: 通过配置文件配置（推荐）

这是 Umbraco 16.0 的主要配置方式，您的项目已经配置完成。

#### 检查当前配置
```bash
# 查看 appsettings.json 中的配置
cat apps/umbraco-simple/appsettings.json | grep -A 10 "DeliveryApi"
```

#### 完整配置示例
```json
{
  "Umbraco": {
    "CMS": {
      "DeliveryApi": {
        "Enabled": true,
        "PublicAccess": true,
        "ApiKey": "southpole-api-key-2024",
        "DisallowedContentTypeAliases": [],
        "RichTextOutputAsJson": false,
        "MediaDomainBackendRequest": "https://localhost:5001"
      }
    }
  }
}
```

#### 配置项说明
| 配置项 | 说明 | 建议值 |
|--------|------|--------|
| `Enabled` | 启用 Delivery API | `true` |
| `PublicAccess` | 允许公开访问 | `true` (开发环境) |
| `ApiKey` | API 访问密钥 | `"southpole-api-key-2024"` |
| `DisallowedContentTypeAliases` | 禁止访问的内容类型 | `[]` (空数组) |
| `RichTextOutputAsJson` | 富文本以JSON格式输出 | `false` |

### 🖥️ 方法2: 通过后台界面配置

#### 2.1 检查是否有界面配置选项

**步骤1: 登录后台**
1. 访问：`http://localhost:5001/umbraco`
2. 登录：`admin@southpole.com` / `SouthPole2024!Railway`

**步骤2: 查找 API 设置**
1. 点击左侧 **Settings**
2. 查看是否有以下选项：
   - **Headless** 或 **API**
   - **Configuration** → **API Settings**
   - **Advanced** → **API Configuration**

[截图：Umbraco 16.0 Settings 页面展示，显示左侧菜单结构]

#### 2.2 Umbraco 16.0 实际界面结构
根据您的描述，当前界面包含：

**Settings 主页面标签**：
- Welcome
- Examine Management  
- Published Status
- Models Builder
- Health Check
- Profiling
- Telemetry Data

**左侧菜单结构**：
```
Settings
├── Structure
│   ├── Document Types
│   ├── Media Types
│   ├── Member Types
│   ├── Data Types
│   ├── Document Blueprints
│   └── Languages
├── Templating
│   ├── Templates
│   ├── Partial Views
│   ├── Stylesheets
│   └── Scripts
└── Advanced
    ├── Relations
    ├── Log Viewer
    ├── Extension Insights
    └── Webhooks
```

> **注意**: 在 Umbraco 16.0 中，Delivery API 主要通过配置文件管理，可能没有专门的界面配置选项。

### 🔧 方法3: 通过代码配置

如果需要动态配置或特殊设置，可以在 `Program.cs` 中配置：

```csharp
// Program.cs
WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .AddDeliveryApi() // 确保 Delivery API 已添加
    .Build();

// 配置 Delivery API 设置
builder.Services.Configure<DeliveryApiSettings>(options =>
{
    options.Enabled = true;
    options.PublicAccess = true;
    options.ApiKey = "southpole-api-key-2024";
});

WebApplication app = builder.Build();
// ... 其他代码
```

---

## ✅ 验证配置

### 🔍 验证步骤

#### 1. 运行自动验证脚本
```bash
# 运行完整验证
./verify-umbraco-setup.sh
```

**期望结果**：
```
✅ Umbraco服务正在运行
✅ API健康检查通过  
✅ API密钥认证成功
```

#### 2. 手动测试 API 端点

**测试1: 健康检查**
```bash
curl -i http://localhost:5001/umbraco/api/health
```
期望返回: `200 OK`

**测试2: Delivery API 访问**
```bash
curl -i -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content"
```
期望返回: `200 OK` + JSON 数据

**测试3: 无API Key访问（测试公开访问）**
```bash
curl -i "http://localhost:5001/umbraco/delivery/api/v1/content"
```
期望返回: `200 OK`（如果PublicAccess为true）

#### 3. 在浏览器中验证

访问以下URL（在浏览器地址栏）：
```
http://localhost:5001/umbraco/delivery/api/v1/content
```

**成功标志**：
- 返回 JSON 格式的内容列表
- 包含 `items` 数组
- 如果有内容，显示具体内容项

[截图：浏览器显示 JSON API 响应示例]

---

## 🚨 故障排除

### 常见问题1: API 返回 404 Not Found

**症状**：
```bash
curl: (404) Not Found
```

**可能原因和解决方案**：

1. **Delivery API 未启用**
   ```bash
   # 检查配置
   grep -A 5 "DeliveryApi" apps/umbraco-simple/appsettings.json
   
   # 确保 Enabled: true
   ```

2. **URL 路径错误**
   ```bash
   # 正确的 API 端点
   http://localhost:5001/umbraco/delivery/api/v1/content
   
   # 常见错误路径
   http://localhost:5001/api/content  # ❌ 错误
   http://localhost:5001/umbraco/api/content  # ❌ 错误
   ```

3. **Umbraco 服务未运行**
   ```bash
   # 检查服务状态
   ps aux | grep dotnet
   
   # 重启服务
   ./start-local.sh
   ```

### 常见问题2: API 返回 401 Unauthorized

**症状**：
```json
{
  "title": "Unauthorized",
  "status": 401
}
```

**解决方案**：

1. **检查 API Key 配置**
   ```bash
   # 确认 appsettings.json 中的 ApiKey
   grep "ApiKey" apps/umbraco-simple/appsettings.json
   ```

2. **使用正确的 Header**
   ```bash
   # 正确的请求方式
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content"
   
   # 检查 PublicAccess 设置
   # 如果为 false，必须使用 API Key
   ```

### 常见问题3: API 返回空数组 []

**症状**：
```json
{
  "items": [],
  "total": 0
}
```

**解决方案**：

1. **检查是否有已发布的内容**
   ```bash
   # 在 Umbraco 后台确认：
   # Content → 查看内容节点是否有绿色发布标记
   ```

2. **检查内容类型过滤**
   ```bash
   # 获取所有内容
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content"
   
   # 按类型筛选（确保类型名称正确）
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
   ```

### 常见问题4: 配置修改后不生效

**解决方案**：

1. **重启 Umbraco 服务**
   ```bash
   # 停止服务 (Ctrl+C)
   # 重新启动
   ./start-local.sh
   ```

2. **清除缓存**
   ```bash
   # 删除临时文件
   rm -rf apps/umbraco-simple/umbraco/Data/TEMP
   ```

3. **检查配置文件语法**
   ```bash
   # 验证 JSON 语法
   cat apps/umbraco-simple/appsettings.json | python -m json.tool
   ```

---

## 🚀 API 使用示例

### 基础查询

```bash
# 获取所有内容
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content"

# 获取特定类型的内容
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"

# 分页获取
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?take=10&skip=0"
```

### JavaScript/TypeScript 示例

```typescript
// 前端 API 客户端示例
const UMBRACO_BASE_URL = 'http://localhost:5001';
const API_KEY = 'southpole-api-key-2024';

async function fetchContent(contentType?: string) {
  const url = new URL('/umbraco/delivery/api/v1/content', UMBRACO_BASE_URL);
  
  if (contentType) {
    url.searchParams.append('contentType', contentType);
  }
  
  const response = await fetch(url.toString(), {
    headers: {
      'Api-Key': API_KEY,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

// 使用示例
fetchContent('service')
  .then(data => console.log('Services:', data.items))
  .catch(error => console.error('Error:', error));
```

### 响应数据结构

```json
{
  "items": [
    {
      "id": "12345678-1234-1234-1234-123456789012",
      "name": "碳管理咨询",
      "contentType": "service",
      "route": {
        "path": "/services/carbon-management-consulting",
        "startItem": {
          "id": "87654321-4321-4321-4321-210987654321",
          "path": "services"
        }
      },
      "properties": {
        "serviceName": "碳管理咨询",
        "urlSlug": "carbon-management-consulting",
        "shortDescription": "为企业提供全面的碳排放管理和减排策略制定服务",
        "fullDescription": "<p>详细的服务描述...</p>"
      }
    }
  ],
  "total": 1
}
```

---

## 📚 更多资源

### 官方文档
- [Umbraco Delivery API 官方文档](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api)
- [Umbraco 16.0 发布说明](https://umbraco.com/blog/umbraco-cms-16-0-release/)

### 相关配置文件
- `appsettings.json` - 主要配置文件
- `appsettings.Production.json` - 生产环境配置
- `Program.cs` - 应用程序启动配置

### 验证工具
- `verify-umbraco-setup.sh` - 自动验证脚本
- Postman/Insomnia - API 测试工具
- 浏览器开发者工具 - 网络请求调试

---

## ✅ 配置检查清单

在完成配置后，请确认以下项目：

- [ ] Umbraco 服务正常运行
- [ ] `appsettings.json` 中 `DeliveryApi.Enabled` 为 `true`
- [ ] API Key 已正确设置
- [ ] 可以通过 API 获取内容
- [ ] 已有至少一个已发布的内容进行测试
- [ ] 前端可以成功调用 API

**完成所有检查项目后，您的 Umbraco Delivery API 就配置成功了！**