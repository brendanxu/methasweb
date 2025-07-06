# 🚀 Umbraco操作快速参考卡

## 📝 第一次必须完成的操作清单

### ✅ 登录信息
```
URL: http://localhost:5001/umbraco
用户名: admin@southpole.com
密码: SouthPole2024!Railway
```

### ✅ 界面导航速查
```
左侧菜单：
├── Content    (管理内容)
├── Media      (管理图片)
└── Settings   (系统设置)
    ├── Document Types  (内容类型定义)
    ├── Languages      (语言设置)
    └── Headless/API   (API配置)
```

---

## 🎯 核心操作流程

### 1️⃣ 创建Document Type的必填信息
```
Name: Service
Alias: service  ← 必须小写！
Icon: 选择设置图标
Allow at root: ❌ 不勾选
```

### 2️⃣ 添加属性的模板
每个属性都要填写这4项：
```
Name: [显示名称]
Alias: [英文别名，小写]
Property Editor: [数据类型]
Mandatory: [是否必填]
```

### 3️⃣ Service的4个必需属性
```
1. 服务名称 / serviceName / Textstring / 必填✅
2. URL别名 / urlSlug / Textstring / 必填✅  
3. 简短描述 / shortDescription / Textarea / 必填✅
4. 详细描述 / fullDescription / Rich Text Editor / 必填✅
```

### 4️⃣ 示例内容数据
```
Name: 碳管理咨询
服务名称: 碳管理咨询
URL别名: carbon-management-consulting
简短描述: 为企业提供全面的碳排放管理和减排策略制定服务
详细描述: 我们的碳管理咨询服务包括企业碳盘查、减排路径规划、碳中和策略制定等...
```

---

## ⚠️ 关键注意事项

### 🚨 最容易犯的错误
1. **忘记发布**：必须点击 "Save and Publish"，不是 "Save"
2. **Alias错误**：Document Type的alias必须是 "service"（小写）
3. **没有启用API**：在Settings中找到并启用Delivery API

### 🔍 验证是否成功
运行验证命令：
```bash
./verify-umbraco-setup.sh
```
期望结果：
```
✅ service: 1 个项目
```

---

## 🆘 卡住了怎么办

### 找不到按钮时
- **Create**按钮：可能在右上角，或者是"+"图标
- **Add property**按钮：在属性组下方
- **Save**按钮：通常在页面顶部或右上角

### 找不到菜单时
- 展开左侧菜单项（点击箭头）
- 在Settings下查找所有子菜单
- 不同版本界面可能略有差异

### API不工作时
1. 检查内容是否已发布（绿色图标）
2. 检查Document Type的alias是否为"service"
3. 重启Umbraco服务

---

## 📱 紧急联系

遇到问题时，请提供：
1. 当前在哪个页面
2. 想要做什么操作
3. 看到什么错误信息
4. 已经尝试了什么

---

## 🎉 成功标准

完成后您应该有：
- ✅ 1个Service Document Type
- ✅ 1个已发布的服务内容
- ✅ API验证通过
- ✅ 可以在Content中编辑服务

**预计时间：第一次30-45分钟，熟练后10分钟**