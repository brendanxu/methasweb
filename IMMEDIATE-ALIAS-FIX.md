# 🚨 立即解决"Duplicate alias"错误

## 🎯 问题诊断结果

**✅ 好消息**: 我们找到了问题的根源！

**❌ 发现的问题**: `serviceName` 这个alias已经被使用了

**✅ 解决方案**: 有多个可用的替代alias

---

## 🚀 立即解决方案（2分钟）

### 方案1: 使用推荐的alias（最简单）

在您的Document Type属性设置中，将：
```
原来的: serviceName
改为: serviceDisplayName
```

**具体操作步骤**：
1. 在Umbraco后台Document Type编辑页面
2. 找到"服务名称"属性的Alias输入框
3. 清空当前内容
4. 输入：`serviceDisplayName`
5. 点击保存

### 方案2: 其他可用的alias

如果方案1仍然有问题，按顺序尝试这些：
```
2. svcName
3. businessServiceName  
4. primaryServiceName
5. serviceLabel
6. serviceBrandName
```

---

## 🔍 为什么会发生这个错误？

根据诊断结果：
1. **`serviceName` 已被使用** - 可能是之前创建的Document Type或系统中已有这个alias
2. **系统保留名称都可用** - 所以不是系统冲突
3. **Service Document Type不存在** - 说明您还没有成功创建Service类型

---

## ✅ 验证解决方案

使用新的alias创建属性后：

1. **检查是否保存成功**：
   - 页面没有错误提示
   - 属性出现在Document Type列表中

2. **运行验证脚本**：
   ```bash
   ./check-alias-conflicts.sh
   ```

3. **测试创建内容**：
   - 尝试创建一个Service类型的内容
   - 确保可以填写"服务名称"字段

---

## 🛡️ 为什么推荐 `serviceDisplayName`？

1. **描述性强** - 明确表示这是显示给用户的服务名称
2. **避免冲突** - 比简单的`name`更具体
3. **遵循最佳实践** - 使用驼峰命名和前缀
4. **易于理解** - 团队成员容易理解其用途

---

## 🔧 如果问题持续存在

### 清除缓存方法
```bash
# 停止Umbraco (Ctrl+C)
# 删除缓存
rm -rf apps/umbraco-simple/umbraco/Data/TEMP
# 重启
./start-local.sh
```

### 使用完全不同的方法
如果所有建议的alias都失败：
1. 创建一个新的Document Type，命名为`BusinessService`
2. 使用alias：`businessService`
3. 使用属性alias：`businessServiceDisplayName`

---

## 📋 完整的属性配置建议

为您的Service Document Type，建议使用以下alias：

| 属性名称 | 建议Alias | 数据类型 |
|----------|-----------|----------|
| 服务名称 | `serviceDisplayName` | Text Box |
| URL别名 | `serviceUrlSlug` | Text Box |
| 简短描述 | `serviceDescription` | Textarea |
| 详细描述 | `serviceFullDescription` | Rich Text Editor |

---

## 🎉 成功后的下一步

1. **完成所有4个属性的创建**
2. **保存Document Type**
3. **创建一个测试内容**
4. **运行验证脚本确认API工作**

---

**立即开始**: 现在就去Umbraco后台，将alias改为 `serviceDisplayName` 并保存！