# 🚀 Umbraco快速启动指南

## 📍 项目位置确认

您有多个Umbraco项目：
1. **主要项目（推荐使用）**: `/southpole-clone/apps/umbraco-simple` ✅
2. 测试项目: `/southpole-umbraco-integrated/umbraco-cms`
3. 完整源码: `/southpole-clone/apps/umbraco-cms`

## 🎯 当前正确位置
您已经在正确的目录：
```
/Users/brendanxu/Desktop/projects/methasweb/southpole-clone/apps/umbraco-simple
```

## ⚡ 快速启动命令

### 方式1：使用启动脚本（推荐）
```bash
# 确保在正确目录
pwd
# 应显示: .../southpole-clone/apps/umbraco-simple

# 启动Umbraco
./start-local.sh
```

### 方式2：直接运行
```bash
# 设置环境变量
export ASPNETCORE_ENVIRONMENT=Development
export PORT=5001

# 使用完整路径运行
/usr/local/share/dotnet/dotnet run
```

### 方式3：如果dotnet在PATH中
```bash
# 先添加到PATH（临时）
export PATH="/usr/local/share/dotnet:$PATH"

# 然后直接运行
dotnet run
```

## 🌐 访问地址
- **管理界面**: http://localhost:5001/umbraco
- **健康检查**: http://localhost:5001/
- **API测试**: http://localhost:5001/umbraco/delivery/api/v1/content

## 🔑 登录信息
- **用户名**: admin@southpole.com
- **密码**: SouthPole2024!Railway

## 📂 完整的导航路径

从任何位置导航到Umbraco项目：
```bash
# 方式1：绝对路径
cd /Users/brendanxu/Desktop/projects/methasweb/southpole-clone/apps/umbraco-simple

# 方式2：从southpole-clone根目录
cd ~/Desktop/projects/methasweb/southpole-clone
cd apps/umbraco-simple

# 方式3：从当前位置（如果在其他地方）
cd ../southpole-clone/apps/umbraco-simple
```

## 🔧 故障排除

### 如果提示"dotnet: command not found"
```bash
# 使用完整路径
/usr/local/share/dotnet/dotnet run

# 或永久添加到PATH（添加到 ~/.zshrc）
echo 'export PATH="/usr/local/share/dotnet:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 如果端口被占用
```bash
# 查看占用端口的进程
lsof -i :5001

# 使用不同端口
export PORT=5002
./start-local.sh
```

### 如果start-local.sh不存在
```bash
# 重新创建
cat > start-local.sh << 'EOF'
#!/bin/bash
echo "启动本地Umbraco服务..."
export ASPNETCORE_ENVIRONMENT=Development
export PORT=5001
/usr/local/share/dotnet/dotnet run
EOF
chmod +x start-local.sh
```

## 📋 验证清单
- [x] 位于正确目录: `apps/umbraco-simple`
- [x] start-local.sh 文件存在
- [x] 文件有执行权限
- [ ] 服务成功启动
- [ ] 可以访问 http://localhost:5001/umbraco

## 🎉 成功标志
当您看到以下输出时，表示启动成功：
```
[INF] Now listening on: http://localhost:5001
[INF] Application started. Press Ctrl+C to shut down.
```

---

**提示**: 使用 `Ctrl+C` 停止服务