#!/bin/bash

echo "🔍 Umbraco Alias 冲突检查工具"
echo "================================="

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Umbraco 是否运行
if ! ps aux | grep -q "[d]otnet run"; then
    echo -e "${RED}❌ Umbraco 服务未运行${NC}"
    echo "请先启动 Umbraco: ./start-local.sh"
    exit 1
fi

echo -e "${GREEN}✅ Umbraco 服务运行中${NC}"
echo ""

# 查找 SQLite 数据库文件
DB_PATHS=(
    "apps/umbraco-simple/umbraco/Data/Umbraco.sqlite.db"
    "apps/umbraco-simple/App_Data/Umbraco.sqlite.db"
    "apps/umbraco-simple/umbraco.db"
)

DB_PATH=""
for path in "${DB_PATHS[@]}"; do
    if [ -f "$path" ]; then
        DB_PATH="$path"
        break
    fi
done

if [ -z "$DB_PATH" ]; then
    echo -e "${YELLOW}⚠️  未找到 SQLite 数据库文件${NC}"
    echo "请检查以下位置："
    for path in "${DB_PATHS[@]}"; do
        echo "  - $path"
    done
    exit 1
fi

echo -e "${GREEN}✅ 找到数据库: $DB_PATH${NC}"

# 1. 查询所有 Document Types
echo -e "\n${BLUE}📊 Document Types 统计:${NC}"
sqlite3 "$DB_PATH" "
SELECT 
    alias as 'Alias',
    text as 'Name'
FROM umbracoNode n
JOIN umbracoContentType ct ON n.id = ct.nodeId
WHERE n.nodeObjectType = 'C66BA18E-EAF3-4CFF-8A22-41B16D66A972'
ORDER BY alias;" 2>/dev/null || echo "无法查询数据库"

# 2. 查询所有属性和可能的冲突
echo -e "\n${BLUE}🔍 所有属性 Alias 检查:${NC}"
sqlite3 "$DB_PATH" "
SELECT 
    ct.alias as 'Document_Type',
    pt.Alias as 'Property_Alias',
    pt.Name as 'Property_Name',
    COUNT(*) as 'Count'
FROM cmsPropertyType pt
JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
GROUP BY pt.Alias
HAVING COUNT(*) > 1
ORDER BY pt.Alias;" 2>/dev/null && echo "以上是重复的 alias" || echo "未找到重复的 alias"

# 3. 检查 Service Document Type 的属性
echo -e "\n${BLUE}🎯 Service Document Type 属性:${NC}"
sqlite3 "$DB_PATH" "
SELECT 
    pt.Alias as 'Alias',
    pt.Name as 'Name',
    pt.sortOrder as 'Order'
FROM cmsPropertyType pt
JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
WHERE ct.alias = 'service'
ORDER BY pt.sortOrder;" 2>/dev/null || echo "Service Document Type 不存在或无属性"

# 4. 检查系统保留名称
echo -e "\n${BLUE}⚠️  系统保留名称检查:${NC}"
RESERVED_ALIASES=("name" "id" "key" "url" "content" "title" "description" "text" "date" "image")

for alias in "${RESERVED_ALIASES[@]}"; do
    count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM cmsPropertyType WHERE Alias = '$alias';" 2>/dev/null)
    if [ "$count" -gt "0" ]; then
        echo -e "${RED}❌ 保留名称 '$alias' 已被使用 ($count 次)${NC}"
    fi
done

# 5. 生成安全的 alias 建议
echo -e "\n${BLUE}💡 建议的安全 alias 名称:${NC}"
echo "基于您的需求，建议使用以下 alias:"
echo "1. serviceName (而不是 name)"
echo "2. serviceTitle (而不是 title)"
echo "3. serviceDescription (而不是 description)"
echo "4. serviceUrlSlug (而不是 slug)"
echo "5. serviceIcon"
echo "6. serviceFullText"

echo -e "\n${GREEN}✅ 检查完成！${NC}"