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
echo -e "\n${BLUE}📊 所有 Document Types:${NC}"
sqlite3 "$DB_PATH" "
SELECT 
    alias as 'Document_Type_Alias',
    text as 'Name'
FROM umbracoNode n
JOIN umbracoContentType ct ON n.id = ct.nodeId
WHERE n.nodeObjectType = 'C66BA18E-EAF3-4CFF-8A22-41B16D66A972'
ORDER BY alias;" 2>/dev/null || echo "无法查询数据库"

# 2. 查询重复的属性 Alias
echo -e "\n${BLUE}🔍 重复的属性 Alias:${NC}"
DUPLICATES=$(sqlite3 "$DB_PATH" "
SELECT 
    pt.Alias as 'Property_Alias',
    COUNT(*) as 'Count',
    GROUP_CONCAT(ct.alias, ', ') as 'Document_Types'
FROM cmsPropertyType pt
JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
GROUP BY pt.Alias
HAVING COUNT(*) > 1
ORDER BY pt.Alias;" 2>/dev/null)

if [ -n "$DUPLICATES" ]; then
    echo -e "${RED}发现重复的 Alias:${NC}"
    echo "$DUPLICATES"
else
    echo -e "${GREEN}✅ 未发现重复的 Alias${NC}"
fi

# 3. 检查系统保留名称
echo -e "\n${BLUE}⚠️  系统保留名称检查:${NC}"
RESERVED_ALIASES=("name" "id" "key" "url" "content" "title" "description" "text" "date" "image" "slug")

for alias in "${RESERVED_ALIASES[@]}"; do
    count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM cmsPropertyType WHERE Alias = '$alias';" 2>/dev/null)
    if [ "$count" -gt "0" ]; then
        echo -e "${RED}❌ 保留名称 '$alias' 已被使用 ($count 次)${NC}"
        # 显示使用该 alias 的 Document Type
        sqlite3 "$DB_PATH" "
        SELECT '  └─ ' || ct.alias || ': ' || pt.Name
        FROM cmsPropertyType pt
        JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
        WHERE pt.Alias = '$alias';" 2>/dev/null
    else
        echo -e "${GREEN}✅ '$alias' 可用${NC}"
    fi
done

# 4. 检查 Service Document Type 的属性
echo -e "\n${BLUE}🎯 Service Document Type 当前属性:${NC}"
SERVICE_PROPS=$(sqlite3 "$DB_PATH" "
SELECT 
    pt.Alias as 'Alias',
    pt.Name as 'Name',
    pt.sortOrder as 'Order'
FROM cmsPropertyType pt
JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
WHERE ct.alias = 'service'
ORDER BY pt.sortOrder;" 2>/dev/null)

if [ -n "$SERVICE_PROPS" ]; then
    echo "$SERVICE_PROPS"
else
    echo -e "${YELLOW}⚠️  Service Document Type 不存在或无属性${NC}"
fi

# 5. 检查常见的问题 Alias
echo -e "\n${BLUE}🔍 检查常见问题 Alias:${NC}"
PROBLEM_ALIASES=("serviceName" "serviceTitle" "serviceDescription" "serviceSlug")

for alias in "${PROBLEM_ALIASES[@]}"; do
    count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM cmsPropertyType WHERE Alias = '$alias';" 2>/dev/null)
    if [ "$count" -gt "0" ]; then
        echo -e "${RED}❌ '$alias' 已被使用${NC}"
        sqlite3 "$DB_PATH" "
        SELECT '  └─ 使用于: ' || ct.alias || ' (' || pt.Name || ')'
        FROM cmsPropertyType pt
        JOIN umbracoContentType ct ON pt.contentTypeId = ct.nodeId
        WHERE pt.Alias = '$alias';" 2>/dev/null
    else
        echo -e "${GREEN}✅ '$alias' 可用${NC}"
    fi
done

# 6. 生成安全的 alias 建议
echo -e "\n${BLUE}💡 建议的安全 Alias 名称:${NC}"
echo "基于您的需求，以下 alias 应该是安全的："
echo ""
echo "1. serviceDisplayName    (推荐)"
echo "2. svcName              (简短版)"
echo "3. businessServiceName  (描述性)"
echo "4. primaryServiceName   (具体化)"
echo "5. serviceLabel         (标签型)"
echo "6. serviceBrandName     (品牌型)"
echo ""

# 7. 检查这些建议的 alias 是否可用
echo -e "${BLUE}🔍 验证建议 Alias 的可用性:${NC}"
SUGGESTED_ALIASES=("serviceDisplayName" "svcName" "businessServiceName" "primaryServiceName" "serviceLabel" "serviceBrandName")

for alias in "${SUGGESTED_ALIASES[@]}"; do
    count=$(sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM cmsPropertyType WHERE Alias = '$alias';" 2>/dev/null)
    if [ "$count" -gt "0" ]; then
        echo -e "${RED}❌ '$alias' 已被使用${NC}"
    else
        echo -e "${GREEN}✅ '$alias' 可用 (推荐使用)${NC}"
    fi
done

echo -e "\n${GREEN}✅ 检查完成！${NC}"
echo ""
echo "如果发现冲突，请："
echo "1. 使用上面标记为可用的 alias"
echo "2. 清除 Umbraco 缓存并重启"
echo "3. 查看详细解决指南: UMBRACO-DUPLICATE-ALIAS-GUIDE.md"