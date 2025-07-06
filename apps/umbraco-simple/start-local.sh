#!/bin/bash
echo "启动本地Umbraco服务..."
export ASPNETCORE_ENVIRONMENT=Development
export PORT=5001
/usr/local/share/dotnet/dotnet run
