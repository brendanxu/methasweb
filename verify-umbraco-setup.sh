#!/bin/bash

echo "🔍 验证Umbraco设置状态..."

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查Umbraco服务状态
echo -e "\n📊 检查Umbraco服务状态..."
if ps aux | grep -q "[d]otnet run"; then
    echo -e "${GREEN}✅ Umbraco服务正在运行${NC}"
    UMBRACO_RUNNING=true
else
    echo -e "${RED}❌ Umbraco服务未运行${NC}"
    echo "请先启动Umbraco: ./start-local.sh"
    UMBRACO_RUNNING=false
fi

# 检查Umbraco后台访问
echo -e "\n🌐 检查Umbraco后台访问..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5001/umbraco | grep -q "200"; then
    echo -e "${GREEN}✅ Umbraco后台可以访问${NC}"
    echo "   访问地址: http://localhost:5001/umbraco"
else
    echo -e "${RED}❌ Umbraco后台无法访问${NC}"
fi

# 检查API健康状态
echo -e "\n🔗 检查Delivery API状态..."
API_HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5001/umbraco/api/health)
if [ "$API_HEALTH" = "200" ]; then
    echo -e "${GREEN}✅ API健康检查通过${NC}"
else
    echo -e "${YELLOW}⚠️  API健康检查状态: $API_HEALTH${NC}"
fi

# 测试API密钥访问
echo -e "\n🔑 测试API密钥访问..."
API_RESPONSE=$(curl -s -H "Api-Key: southpole-api-key-2024" \
                   -w "%{http_code}" \
                   -o /tmp/api_test.json \
                   "http://localhost:5001/umbraco/delivery/api/v1/content")

if [ "$API_RESPONSE" = "200" ]; then
    echo -e "${GREEN}✅ API密钥认证成功${NC}"
    # 检查返回的内容数量
    CONTENT_COUNT=$(cat /tmp/api_test.json | grep -o '"id"' | wc -l | tr -d ' ')
    echo "   已发现 $CONTENT_COUNT 个内容项"
    
    if [ "$CONTENT_COUNT" -gt "0" ]; then
        echo -e "${GREEN}✅ Umbraco中已有内容${NC}"
    else
        echo -e "${YELLOW}⚠️  Umbraco中暂无内容，需要创建${NC}"
    fi
else
    echo -e "${RED}❌ API密钥认证失败 (状态码: $API_RESPONSE)${NC}"
fi

# 检查特定内容类型
echo -e "\n📄 检查内容类型..."
for contentType in "service" "caseStudy" "newsArticle"; do
    RESPONSE=$(curl -s -H "Api-Key: southpole-api-key-2024" \
                   -w "%{http_code}" \
                   -o /tmp/${contentType}_test.json \
                   "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=${contentType}")
    
    if [ "$RESPONSE" = "200" ]; then
        COUNT=$(cat /tmp/${contentType}_test.json | grep -o '"id"' | wc -l | tr -d ' ')
        if [ "$COUNT" -gt "0" ]; then
            echo -e "${GREEN}✅ ${contentType}: $COUNT 个项目${NC}"
        else
            echo -e "${YELLOW}⚠️  ${contentType}: 0 个项目${NC}"
        fi
    else
        echo -e "${RED}❌ ${contentType}: 无法访问${NC}"
    fi
done

# 检查前端环境配置
echo -e "\n⚙️  检查前端环境配置..."
if [ -f "apps/main-site/.env.local" ]; then
    echo -e "${GREEN}✅ 前端环境变量文件存在${NC}"
    if grep -q "NEXT_PUBLIC_USE_UMBRACO=true" apps/main-site/.env.local; then
        echo -e "${GREEN}✅ 前端配置使用Umbraco数据${NC}"
    else
        echo -e "${YELLOW}⚠️  前端未配置使用Umbraco数据${NC}"
    fi
else
    echo -e "${RED}❌ 前端环境变量文件不存在${NC}"
fi

# 检查状态页面
echo -e "\n📋 检查状态页面..."
if [ -f "apps/main-site/app/umbraco-status/page.tsx" ]; then
    echo -e "${GREEN}✅ Umbraco状态页面已创建${NC}"
    echo "   访问地址: http://localhost:3001/umbraco-status"
else
    echo -e "${RED}❌ Umbraco状态页面不存在${NC}"
fi

# 生成总结报告
echo -e "\n📊 设置状态总结:"
echo "========================="

if [ "$UMBRACO_RUNNING" = true ]; then
    echo -e "${GREEN}✅ Umbraco服务运行正常${NC}"
else
    echo -e "${RED}❌ Umbraco服务需要启动${NC}"
fi

if [ "$CONTENT_COUNT" -gt "0" ]; then
    echo -e "${GREEN}✅ 内容已创建 ($CONTENT_COUNT 个项目)${NC}"
else
    echo -e "${YELLOW}⚠️  需要在Umbraco后台创建内容${NC}"
fi

echo -e "\n🎯 下一步操作:"
echo "1. 访问 http://localhost:5001/umbraco 进入后台"
echo "2. 按照 STEP-BY-STEP-UMBRACO.md 创建Document Types"
echo "3. 使用 umbraco-sample-data.json 中的示例数据"
echo "4. 访问 http://localhost:3001/umbraco-status 查看集成状态"

# 清理临时文件
rm -f /tmp/api_test.json /tmp/service_test.json /tmp/caseStudy_test.json /tmp/newsArticle_test.json

echo -e "\n✨ 验证完成！"