# 🔧 Umbraco访问问题排查和解决方案

## 问题1：本地访问被拒绝 (ERR_CONNECTION_REFUSED)

### 诊断步骤

1. **检查服务是否运行**
```bash
ps aux | grep dotnet
```
如果没有dotnet进程，说明服务未启动。

2. **启动本地Umbraco服务**
```bash
cd /Users/brendanxu/Desktop/projects/methasweb/southpole-clone/apps/umbraco-simple
dotnet run
```

3. **检查端口占用**
```bash
lsof -i :5001
```

### 解决方案

**方案1：重新启动服务**
```bash
# 终止可能的进程
pkill -f dotnet

# 重新启动
cd apps/umbraco-simple
dotnet run
```

**方案2：使用不同端口**
```bash
# 修改Program.cs中的端口
dotnet run --urls="http://localhost:5002"
```

## 问题2：Railway部署404错误

### 可能原因

1. **应用未正确启动**
2. **路由配置问题**
3. **构建或部署失败**

### 诊断步骤

1. **检查Railway日志**
```bash
railway logs
```

2. **验证部署状态**
```bash
railway status
```

3. **获取实际部署URL**
```bash
railway domain
```

### 解决方案

**方案1：检查启动命令**

编辑 `railway.json`：
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "dotnet SouthPoleUmbracoSimple.dll",
    "healthcheckPath": "/",
    "healthcheckTimeout": 300
  }
}
```

**方案2：添加启动检查**

创建或更新 `Startup.cs`：
```csharp
app.MapGet("/", () => "Umbraco is running! Visit /umbraco for admin panel.");
```

**方案3：环境变量配置**

在Railway Dashboard设置：
```
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://0.0.0.0:$PORT
```

## 立即执行的修复步骤

### 1. 修复本地访问

```bash
# 步骤1：导航到项目目录
cd /Users/brendanxu/Desktop/projects/methasweb/southpole-clone/apps/umbraco-simple

# 步骤2：清理并重建
dotnet clean
dotnet build

# 步骤3：启动服务
dotnet run

# 步骤4：测试访问
curl http://localhost:5001/umbraco
```

### 2. 修复Railway部署

```bash
# 步骤1：查看Railway日志
railway logs

# 步骤2：重新部署
railway up --detach

# 步骤3：检查部署URL
railway domain
```

## 验证检查清单

### 本地环境
- [ ] dotnet进程正在运行
- [ ] 端口5001未被占用
- [ ] 可以访问 http://localhost:5001
- [ ] 可以访问 http://localhost:5001/umbraco

### Railway环境
- [ ] 部署成功完成
- [ ] 健康检查通过
- [ ] 可以访问主页
- [ ] 可以访问 /umbraco 路径

## 常见错误和解决方案

### 错误：EADDRINUSE (端口已占用)
```bash
# 查找占用端口的进程
lsof -i :5001

# 终止进程
kill -9 [PID]
```

### 错误：Railway构建失败
```bash
# 检查构建日志
railway logs --build

# 清理并重新部署
git add .
git commit -m "Fix deployment"
railway up
```

### 错误：数据库连接失败
确保 `appsettings.Production.json` 中的数据库路径正确：
```json
"ConnectionStrings": {
  "umbracoDbDSN": "Data Source=/app/data/Umbraco.sqlite.db"
}
```

## 快速测试命令

### 本地测试
```bash
# 健康检查
curl http://localhost:5001/umbraco/api/health

# API测试
curl -H "Api-Key: southpole-railway-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content
```

### Railway测试
```bash
# 替换为实际的Railway URL
RAILWAY_URL="https://your-app.railway.app"

# 健康检查
curl $RAILWAY_URL/umbraco/api/health

# API测试
curl -H "Api-Key: southpole-railway-api-key-2024" \
     $RAILWAY_URL/umbraco/delivery/api/v1/content
```

## 需要提供的信息

为了更准确地解决Railway问题，请提供：
1. Railway实际部署的URL
2. `railway logs` 的输出
3. `railway status` 的结果

---

**下一步行动**：请先尝试启动本地服务，然后提供Railway的实际URL和日志信息。