# 🛡️ 安全Alias快速参考（已验证可用）

## 📋 当前验证结果

基于最新的alias冲突检查，以下是**确认可用**的alias：

---

## ✅ Service Document Type - 推荐Alias

### 基础属性（4个必需）

| 属性用途 | 推荐Alias | 备选Alias | 数据类型 |
|----------|-----------|-----------|----------|
| 服务名称 | `serviceDisplayName` ✅ | `svcName` ✅ | Text Box |
| URL别名 | `serviceSlug` ✅ | `serviceUrlSlug` ✅ | Text Box |
| 简短描述 | `svcDescription` ✅ | `serviceShortDesc` ✅ | Textarea |
| 详细描述 | `svcFullDescription` ✅ | `serviceDetails` ✅ | Rich Text Editor |

### 扩展属性（可选）

| 属性用途 | 推荐Alias | 数据类型 |
|----------|-----------|----------|
| 服务图标 | `serviceIcon` ✅ | Media Picker |
| 显示顺序 | `svcOrder` ✅ | Numeric |
| 服务标签 | `serviceLabel` ✅ | Text Box |
| 业务分类 | `businessServiceName` ✅ | Text Box |

---

## ❌ 已被占用的Alias（避免使用）

```
serviceName ❌ - 已被使用
serviceDescription ❌ - 已被使用  
serviceBrandName ❌ - 已被使用
```

---

## 🎯 其他Document Types的建议Alias

### Case Study Document Type
```
caseStudyTitle ✅
caseStudySlug ✅  
clientName ✅
projectSummary ✅
projectGoal ✅
caseStudyChallenge ✅
caseStudySolution ✅
heroImage ✅
```

### News Article Document Type  
```
newsTitle ✅
newsSlug ✅
publishDate ✅
newsContent ✅
articleSummary ✅
featuredImage ✅
newsAuthor ✅
```

---

## 🔍 实时检查工具

随时运行以下命令检查alias可用性：
```bash
./check-alias-conflicts.sh
```

---

## 📝 当前建议的完整配置

### Service Document Type 属性配置：

```
属性1：
Name: 服务名称
Alias: serviceDisplayName
Property Editor: Text Box  
Mandatory: ✅

属性2：
Name: URL别名
Alias: serviceSlug
Property Editor: Text Box
Mandatory: ✅

属性3：  
Name: 简短描述
Alias: svcDescription
Property Editor: Textarea
Mandatory: ✅

属性4：
Name: 详细描述  
Alias: svcFullDescription
Property Editor: Rich Text Editor
Mandatory: ✅
```

---

## 🚨 重要提醒

1. **使用这些经过验证的alias** - 避免重新遇到"Duplicate alias"错误
2. **保持一致性** - 在团队中统一使用这些命名规范
3. **定期检查** - 添加新属性前运行检查脚本
4. **文档更新** - 记录使用的alias以便将来参考

---

## 💡 命名规则总结

**安全的命名模式**：
- 使用前缀：`service*`, `svc*`, `case*`, `news*`
- 描述性命名：`DisplayName`, `FullDescription`
- 避免简单词汇：`name`, `title`, `description`
- 使用驼峰命名：`serviceDisplayName`

---

**现在您可以放心地使用这些alias，不会再遇到冲突问题！**