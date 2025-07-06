# 📋 Umbraco逐步操作指南

## 🎯 目标：将空的Umbraco配置为South Pole网站的完整后台

## 第一阶段：界面中文化（5分钟）

### 步骤1：设置用户语言
1. 登录 http://localhost:5001/umbraco
2. 点击右上角的用户头像
3. 选择 **"User"** 或查找语言设置
4. 如果有中文选项，选择并保存
5. 如果没有，继续下面的步骤

### 步骤2：检查系统语言
1. 进入 **Settings** → **Languages**
2. 查看是否有 "Chinese" 或 "中文" 选项
3. 如果没有，点击 **"Create"** 添加中文语言
4. 设为默认语言（可选）

## 第二阶段：创建Document Types（30分钟）

### 步骤3：创建Homepage Document Type
1. 进入 **Settings** → **Document Types**
2. 点击右上角的 **"Create"**
3. 选择 **"Document Type"**
4. 填写基本信息：
   ```
   Name: Homepage
   Alias: homepage
   Icon: 选择房子图标 (icon-home)
   ```
5. 在 **"Permissions"** 标签页中：
   - 勾选 ✅ **"Allow at root"**
6. 在 **"Design"** 标签页中添加Tab：
   - Tab名称：`基本信息`
7. 在 `基本信息` Tab下添加属性：

#### 属性添加步骤：
对每个属性，点击 **"Add property"**，然后填写：

**属性1：页面标题**
```
Name: 页面标题
Alias: pageTitle
Property Editor: Textstring
Mandatory: ✅
Description: 页面主标题
```

**属性2：Hero标题**
```
Name: Hero标题  
Alias: heroTitle
Property Editor: Textstring
Mandatory: ✅
Description: 首页大标题
```

**属性3：Hero描述**
```
Name: Hero描述
Alias: heroDescription  
Property Editor: Textarea
Mandatory: ✅
Description: 首页描述文字
```

**属性4：Hero背景图**
```
Name: Hero背景图
Alias: heroBackgroundImage
Property Editor: Media Picker
Mandatory: ✅
Description: 首页背景图片
```

8. 点击 **"Save"** 保存Document Type

### 步骤4：创建Service Document Type
1. 再次点击 **"Create"** → **"Document Type"**
2. 填写基本信息：
   ```
   Name: Service
   Alias: service  
   Icon: 选择设置图标 (icon-settings)
   Allow at root: ❌ (不勾选)
   ```
3. 添加Tab：`服务信息`
4. 添加属性：

**服务名称**
```
Name: 服务名称
Alias: serviceName
Property Editor: Textstring  
Mandatory: ✅
```

**URL别名**
```
Name: URL别名
Alias: urlSlug
Property Editor: Textstring
Mandatory: ✅
```

**简短描述**
```
Name: 简短描述
Alias: shortDescription
Property Editor: Textarea
Mandatory: ✅
```

**详细描述**
```
Name: 详细描述
Alias: fullDescription
Property Editor: Rich Text Editor
Mandatory: ✅
```

5. 保存Service Document Type

### 步骤5：创建Case Study Document Type
1. 创建新Document Type：
   ```
   Name: Case Study
   Alias: caseStudy
   Icon: 选择灯泡图标 (icon-lightbulb)
   ```
2. 添加Tab：`项目信息`
3. 添加关键属性：

**项目标题**
```
Name: 项目标题
Alias: projectTitle
Property Editor: Textstring
Mandatory: ✅
```

**客户名称**
```
Name: 客户名称
Alias: clientName
Property Editor: Textstring
Mandatory: ✅
```

**项目摘要**
```
Name: 项目摘要
Alias: projectSummary
Property Editor: Textarea
Mandatory: ✅
```

**项目目标**
```
Name: 项目目标
Alias: projectGoal
Property Editor: Rich Text Editor
Mandatory: ✅
```

4. 保存Case Study Document Type

### 步骤6：创建News Article Document Type
1. 创建新Document Type：
   ```
   Name: News Article
   Alias: newsArticle
   Icon: 选择报纸图标 (icon-newspaper)
   ```
2. 添加关键属性：

**新闻标题**
```
Name: 新闻标题
Alias: newsTitle
Property Editor: Textstring
Mandatory: ✅
```

**发布日期**
```
Name: 发布日期
Alias: publishDate
Property Editor: Date Picker
Mandatory: ✅
```

**文章内容**
```
Name: 文章内容
Alias: content
Property Editor: Rich Text Editor
Mandatory: ✅
```

3. 保存News Article Document Type

### 步骤7：创建Folder Document Type
1. 创建Document Type：
   ```
   Name: Folder
   Alias: folder
   Icon: 选择文件夹图标 (icon-folder)
   Allow at root: ✅
   ```
2. 只添加一个属性：

**文件夹名称**
```
Name: 文件夹名称
Alias: folderName
Property Editor: Textstring
Mandatory: ✅
```

## 第三阶段：创建内容结构（20分钟）

### 步骤8：创建网站根节点
1. 进入 **Content** 部分
2. 右键点击内容树的根部
3. 选择 **"Create"**
4. 选择 **"Homepage"**
5. 填写内容：
   ```
   Name: South Pole Official Site
   页面标题: 南极气候解决方案
   Hero标题: 引领气候行动，共建可持续未来
   Hero描述: 我们致力于帮助企业实现碳中和目标，通过创新的技术和专业的咨询服务，为应对气候变化贡献力量。
   ```
6. 上传一张Hero背景图（或先跳过）
7. 点击 **"Save and Publish"**

### 步骤9：创建文件夹结构
1. 右键点击刚创建的 "South Pole Official Site"
2. 选择 **"Create"** → **"Folder"**
3. 创建名为 "Services" 的文件夹
4. 重复步骤，创建 "Case Studies" 和 "News" 文件夹
5. 每个文件夹都要 **"Save and Publish"**

### 步骤10：创建示例服务内容
1. 右键点击 "Services" 文件夹
2. 选择 **"Create"** → **"Service"**
3. 填写第一个服务：
   ```
   Name: 碳管理咨询
   服务名称: 碳管理咨询
   URL别名: carbon-management-consulting
   简短描述: 为企业提供全面的碳排放管理和减排策略制定服务
   详细描述: 我们的碳管理咨询服务包括碳盘查、减排路径规划、碳中和策略制定等，帮助企业建立科学的碳管理体系。
   ```
4. 点击 **"Save and Publish"**
5. 重复创建其他服务（可再创建2-3个）

### 步骤11：创建示例案例研究
1. 右键点击 "Case Studies" 文件夹
2. 选择 **"Create"** → **"Case Study"**
3. 填写内容：
   ```
   Name: 全球科技公司碳中和项目
   项目标题: 全球科技公司碳中和实施项目
   客户名称: Global Tech Corp
   项目摘要: 帮助一家全球性科技公司制定并实施全面的碳中和战略
   项目目标: 在2025年前实现公司运营的碳中和，并制定供应链减排计划
   ```
4. 点击 **"Save and Publish"**

### 步骤12：创建示例新闻
1. 右键点击 "News" 文件夹
2. 选择 **"Create"** → **"News Article"**
3. 填写内容：
   ```
   Name: 公司获得认证
   新闻标题: 南极气候解决方案获得国际碳管理认证
   发布日期: 选择当前日期
   文章内容: 我们很荣幸地宣布，南极气候解决方案正式获得了国际碳管理协会的专业认证...
   ```
4. 点击 **"Save and Publish"**

## 第四阶段：验证API访问（10分钟）

### 步骤13：测试API
1. 打开终端，运行：
```bash
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
```

2. 应该看到JSON格式的服务数据

### 步骤14：检查前端集成
1. 启动前端服务器：
```bash
cd apps/main-site
npm run dev
```

2. 访问状态页面：http://localhost:3001/umbraco-status

3. 应该看到内容统计显示您创建的内容数量

## ✅ 完成检查清单

- [ ] Umbraco界面显示中文（如果支持）
- [ ] 创建了5个Document Types（Homepage, Service, Case Study, News Article, Folder）
- [ ] 创建了网站根节点和文件夹结构
- [ ] 至少创建了1个服务、1个案例研究、1个新闻
- [ ] 所有内容都已"发布"（不只是保存）
- [ ] API测试返回正确数据
- [ ] 前端状态页面显示内容统计

## 🎉 成功标志

当您完成上述步骤后，您将拥有：
1. 一个结构完整的Umbraco CMS
2. 可以管理South Pole网站所有内容的后台
3. 通过API与前端完美集成的数据流

---

**预计总时间：65分钟**

**重要提示**：每次创建内容后都要记得点击 **"Save and Publish"**！