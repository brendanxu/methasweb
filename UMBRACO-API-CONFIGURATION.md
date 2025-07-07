# 🔧 Umbraco Delivery API 配置指南

## ✅ 当前状态

- ✅ Service Document Type 已创建
- ✅ "碳管理咨询" 内容已发布  
- ✅ 前端服务已启动 (http://localhost:3000)
- ⚠️ API 访问需要额外配置

---

## 🎯 解决 API 400 错误

### 问题原因
Umbraco Delivery API 需要 Document Types 明确启用 API 访问权限。

### 立即解决步骤

#### 第1步：启用 Document Type 的 API 访问

1. **进入 Document Type 设置**：
   - 访问 http://localhost:5001/umbraco
   - 进入 **Settings** → **Document Types** → **Service**

2. **查找 API 配置选项**：
   - 在 Document Type 编辑页面中查找以下选项之一：
     - **"Allow access to Delivery API"**
     - **"Enable for Delivery API"** 
     - **"Delivery API"** 选项卡
     - **"API Access"** 设置

3. **启用 API 访问**：
   - ✅ 勾选 "Allow access to Delivery API" 或类似选项
   - ✅ 确保所有属性也启用 API 访问

4. **保存配置**：
   - 点击 **Save** 保存 Document Type

#### 第2步：检查内容发布状态

1. **确认内容已发布**：
   - 进入 **Content** → 找到 "碳管理咨询"
   - 确保内容显示**绿色发布图标**
   - 如果没有，重新点击 **"Save and Publish"**

#### 第3步：验证 API 访问

配置完成后，运行测试：

```bash
# 测试 API 访问
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
```

**期望结果**：返回包含 "碳管理咨询" 的 JSON 数据

---

## 🔍 可能的配置位置

### 位置1：Document Type 主页面
```
Settings → Document Types → Service
└── 勾选 "Allow access to Delivery API"
```

### 位置2：API 选项卡
```
Settings → Document Types → Service
└── API / Delivery API 选项卡
    └── Enable API access
```

### 位置3：权限设置
```
Settings → Document Types → Service  
└── Permissions 选项卡
    └── API Access 权限
```

---

## 🚨 如果仍然无法访问

### 方案1：重启 Umbraco
```bash
# 停止服务 (Ctrl+C)
# 重新启动
./start-local.sh
```

### 方案2：检查内容类型名称
确认 API 调用中的 contentType 参数：
- 使用小写：`contentType=service` ✅
- 避免大写：`contentType=Service` ❌

### 方案3：清除缓存
```bash
rm -rf apps/umbraco-simple/umbraco/Data/TEMP
./start-local.sh
```

---

## 🎯 API 测试命令

### 基础测试
```bash
# 测试所有内容
curl "http://localhost:5001/umbraco/delivery/api/v1/content"

# 测试特定类型
curl "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"

# 使用 API Key
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
```

### 调试测试
```bash
# 详细响应
curl -v "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"

# 检查 API 健康状态
curl "http://localhost:5001/umbraco/api/health"
```

---

## ✅ 成功验证标志

配置成功后，您应该看到：

### API 响应示例
```json
{
  "items": [
    {
      "name": "碳管理咨询",
      "createDate": "2024-...",
      "updateDate": "2024-...",
      "route": {
        "path": "/carbon-management-consulting",
        "startItem": { "path": "/" }
      },
      "id": "...",
      "contentType": "service",
      "properties": {
        "serviceDisplayName": "碳管理咨询",
        "serviceSlug": "carbon-management-consulting",
        "svcDescription": "为企业提供全面的碳排放管理和减排策略制定服务",
        "svcFullDescription": "..."
      }
    }
  ],
  "total": 1
}
```

### 前端测试
访问：http://localhost:3000/umbraco-status
应该显示：✅ Service: 1 个项目

---

## 🎉 下一步计划

API 配置成功后：

1. **测试前端集成** ✅
2. **创建更多示例内容**
3. **配置 Case Study Document Type**
4. **配置 News Article Document Type**

---

**现在请按照第1-3步配置 API 访问权限，完成后告诉我结果！**