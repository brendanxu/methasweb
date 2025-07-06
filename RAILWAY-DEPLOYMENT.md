# Railway Umbraco CMS 部署指南

## 概述

本指南详细说明如何将Umbraco CMS部署到Railway云平台，作为South Pole项目的后端服务。

## 前提条件

1. **Railway账户**: 在 [railway.app](https://railway.app) 注册账户
2. **Railway CLI**: 安装Railway命令行工具
3. **Git**: 确保项目已初始化Git仓库

## 部署步骤

### 1. 安装Railway CLI

```bash
# macOS (使用Homebrew)
brew install railway

# 或者使用npm
npm install -g @railway/cli
```

### 2. 登录Railway

```bash
railway login
```

### 3. 初始化Railway项目

```bash
cd /Users/brendanxu/Desktop/projects/methasweb/southpole-clone/apps/umbraco-simple
railway init
```

选择：
- **Create a new project**: 创建新项目
- **Project name**: southpole-umbraco-cms
- **Environment**: production

### 4. 配置环境变量

```bash
# 设置生产环境
railway variables set ASPNETCORE_ENVIRONMENT=Production

# 设置端口（Railway会自动设置，这里是可选的）
railway variables set PORT=8080

# 设置数据库路径
railway variables set UMBRACO_DB_PATH=/app/data/Umbraco.sqlite.db
```

### 5. 添加数据卷（持久化存储）

在Railway Dashboard中：
1. 进入项目设置
2. 选择 "Variables" 标签
3. 添加卷挂载：`/app/data` 用于SQLite数据库

### 6. 部署到Railway

```bash
railway up
```

### 7. 获取部署URL

```bash
railway domain
```

Railway会提供一个类似 `https://southpole-umbraco-cms-production.up.railway.app` 的URL。

## 配置文件说明

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "dotnet SouthPoleUmbracoSimple.dll",
    "healthcheckPath": "/umbraco/api/health",
    "healthcheckTimeout": 300
  }
}
```

### nixpacks.toml
```toml
[phases.setup]
nixPkgs = ["...", "dotnet-sdk_8"]

[phases.build]
cmds = ["dotnet publish --configuration Release --output out"]

[phases.start]
cmd = "dotnet out/SouthPoleUmbracoSimple.dll"

[variables]
DOTNET_ROOT = "/nix/var/nix/profiles/default"
ASPNETCORE_URLS = "http://0.0.0.0:$PORT"
```

### Dockerfile
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["SouthPoleUmbracoSimple.csproj", "."]
RUN dotnet restore "./SouthPoleUmbracoSimple.csproj"
COPY . .
RUN dotnet build "SouthPoleUmbracoSimple.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SouthPoleUmbracoSimple.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN mkdir -p /app/data
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "SouthPoleUmbracoSimple.dll"]
```

## 部署后验证

### 1. 检查健康状态

```bash
curl https://your-railway-url.railway.app/umbraco/api/health
```

### 2. 访问Umbraco后台

访问: `https://your-railway-url.railway.app/umbraco`

默认登录信息：
- **用户名**: admin@southpole.com
- **密码**: SouthPole2024!Railway

### 3. 测试Delivery API

```bash
curl https://your-railway-url.railway.app/umbraco/delivery/api/v1/content
```

## 前端集成

### 更新环境变量

在Vercel项目中设置环境变量：

```bash
# 在Vercel Dashboard中添加
UMBRACO_API_URL=https://your-railway-url.railway.app
UMBRACO_API_KEY=southpole-railway-api-key-2024
```

### API调用示例

```typescript
// lib/umbraco-client.ts
const UMBRACO_BASE_URL = process.env.UMBRACO_API_URL;
const UMBRACO_API_KEY = process.env.UMBRACO_API_KEY;

export async function fetchContent(contentType: string) {
  const response = await fetch(
    `${UMBRACO_BASE_URL}/umbraco/delivery/api/v1/content?contentType=${contentType}`,
    {
      headers: {
        'Api-Key': UMBRACO_API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
  
  return response.json();
}
```

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据卷是否正确挂载
   - 确认SQLite文件路径正确

2. **健康检查失败**
   - 增加健康检查超时时间
   - 检查应用启动日志

3. **API访问被拒绝**
   - 验证API密钥配置
   - 检查CORS设置

### 查看日志

```bash
railway logs
```

### 重新部署

```bash
railway up --detach
```

## 维护和监控

### 查看服务状态

```bash
railway status
```

### 数据库备份

Railway会自动备份持久化卷，但建议定期导出数据：

```bash
# 通过Umbraco后台导出内容
# 或者使用Railway CLI下载数据库文件
```

## 成本估算

- **Hobby Plan**: 免费（有限制）
- **Pro Plan**: $20/月（推荐用于生产环境）

## 下一步

1. 完成Railway部署
2. 配置自定义域名
3. 设置SSL证书
4. 配置监控和日志
5. 更新前端API配置

## 支持

如遇到问题，请查看：
- Railway文档: https://docs.railway.app
- Umbraco文档: https://docs.umbraco.com
- 项目GitHub仓库的Issues