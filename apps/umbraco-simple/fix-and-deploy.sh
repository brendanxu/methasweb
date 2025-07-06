#!/bin/bash

echo "🔧 修复Umbraco访问问题..."

# 1. 本地启动脚本
echo "📍 创建本地启动脚本..."
cat > start-local.sh << 'EOF'
#!/bin/bash
echo "启动本地Umbraco服务..."
export ASPNETCORE_ENVIRONMENT=Development
export PORT=5001
/usr/local/share/dotnet/dotnet run
EOF
chmod +x start-local.sh

# 2. Railway部署修复
echo "🚀 准备Railway重新部署..."

# 提交更改
git add .
git commit -m "fix: update Umbraco configuration for proper Railway deployment

- Fixed port binding for local development
- Added root endpoint for health checks
- Updated .NET SDK version to 9.0
- Improved URL configuration

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✅ 修复完成！"
echo ""
echo "📋 下一步操作："
echo ""
echo "1️⃣ 本地测试："
echo "   ./start-local.sh"
echo "   然后访问: http://localhost:5001/umbraco"
echo ""
echo "2️⃣ Railway部署："
echo "   railway up"
echo "   railway logs --tail"
echo ""
echo "3️⃣ 获取Railway URL："
echo "   railway domain"