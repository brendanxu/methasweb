# 🏗️ Umbraco 内容创建完整指导教程

## 📋 教程概述

本教程将指导你在Umbraco后台创建所有Document Types和相应的内容，以完成与Next.js前端的完美集成。

### 🎯 最终目标
- 创建8个Document Types
- 为每个类型添加测试内容
- 确保前端能正确显示所有数据
- 实现100%的前后端集成

### ⏱️ 预计完成时间
- Document Types创建: 45-60分钟
- 内容添加: 30-45分钟
- 测试验证: 15分钟

---

## 🚀 开始前的准备工作

### 1. 确认Umbraco运行状态
```bash
# 确保Umbraco在运行
访问: http://localhost:5001/umbraco
用户名: admin@southpole.com
密码: Admin123!
```

### 2. 验证前端状态
```bash
# 确保前端在运行
访问: http://localhost:3000/umbraco-status
确认显示: ✅ Umbraco服务: 运行中
```

### 3. 创建顺序检查清单
- [ ] ✅ Service (sevice) - 已完成，有2个内容
- [ ] 🎯 Industry - 待创建
- [ ] 🎯 Category - 待创建  
- [ ] 🎯 Case Study - 待创建
- [ ] 🎯 News Article - 待创建
- [ ] 🎯 Team Member - 待创建
- [ ] 🎯 Office Location - 待创建
- [ ] 🎯 Company Info - 待创建
- [ ] 🎯 Company Stat - 待创建

---

## 📚 第一阶段：基础Document Types创建

### 🏭 1. Industry Document Type

**目的**: 为案例研究提供行业分类

#### 创建步骤:
1. **进入创建页面**
   ```
   Umbraco后台 → Settings → Document Types → Create Document Type
   ```

2. **基本信息填写**
   ```
   Name: Industry
   Alias: industry (自动生成，确认正确)
   Icon: 点击图标选择器 → 选择 "icon-industry" 或 "icon-folder"
   ```

3. **添加属性 - Industry Name**
   ```
   点击 "Design" tab → 点击 "Add property"
   
   Property settings:
   - Name: Industry Name
   - Alias: name (自动生成)
   - Editor: Textstring
   - Mandatory: ✅ 勾选
   - Description: 行业名称，如"金融服务"、"制造业"
   
   点击 "Submit"
   ```

4. **添加属性 - URL Slug**
   ```
   继续点击 "Add property"
   
   Property settings:
   - Name: URL Slug  
   - Alias: urlSlug
   - Editor: Textstring
   - Mandatory: ✅ 勾选
   - Description: URL友好的标识符，如"financial-services"
   
   点击 "Submit"
   ```

5. **添加属性 - Description**
   ```
   继续点击 "Add property"
   
   Property settings:
   - Name: Description
   - Alias: description
   - Editor: Textarea
   - Mandatory: ❌ 不勾选
   - Description: 行业详细描述
   
   点击 "Submit"
   ```

6. **设置权限**
   ```
   点击 "Permissions" tab
   - ✅ Allow as root: 勾选
   - ✅ Allow children of this type: 勾选
   ```

7. **保存Document Type**
   ```
   点击右上角 "Save" 按钮
   等待保存成功提示
   ```

#### ✅ 验证Industry Document Type
- 确认在Document Types列表中看到"Industry"
- Alias显示为"industry"
- 包含3个属性: name, urlSlug, description

---

### 🏷️ 2. Category Document Type

**目的**: 为新闻文章提供分类

#### 创建步骤:
1. **基本信息**
   ```
   Name: Category
   Alias: category
   Icon: 选择 "icon-tag" 或 "icon-folder"
   ```

2. **添加属性 - Category Name**
   ```
   Name: Category Name
   Alias: name
   Editor: Textstring
   Mandatory: ✅
   Description: 分类名称，如"新闻"、"报告"、"洞察"
   ```

3. **添加属性 - URL Slug**
   ```
   Name: URL Slug
   Alias: urlSlug  
   Editor: Textstring
   Mandatory: ✅
   Description: URL标识符，如"news"、"reports"
   ```

4. **设置权限并保存**
   ```
   Permissions: ✅ Allow as root, ✅ Allow children
   点击 "Save"
   ```

#### ✅ 验证Category Document Type
- Document Type创建成功
- 包含2个属性: name, urlSlug

---

## 🎨 第二阶段：主要内容类型创建

### 📖 3. Case Study Document Type

**目的**: 客户案例研究，展示成功项目

#### 创建步骤:
1. **基本信息**
   ```
   Name: Case Study
   Alias: caseStudy
   Icon: 选择 "icon-document" 或 "icon-notepad"
   ```

2. **添加基础属性**

   **Title属性:**
   ```
   Name: Title
   Alias: title
   Editor: Textstring
   Mandatory: ✅
   Description: 案例标题
   ```

   **URL Slug属性:**
   ```
   Name: URL Slug
   Alias: urlSlug
   Editor: Textstring  
   Mandatory: ✅
   Description: 用于URL的唯一标识符
   ```

   **Client Name属性:**
   ```
   Name: Client Name
   Alias: clientName
   Editor: Textstring
   Mandatory: ✅  
   Description: 客户公司名称
   ```

3. **添加媒体属性**

   **Hero Image属性:**
   ```
   Name: Hero Image
   Alias: heroImage
   Editor: Media Picker
   Mandatory: ❌
   
   Editor Settings:
   - Pick multiple items: No (不勾选)
   - Start node: Media (保持默认)
   
   Description: 案例主图片
   ```

4. **添加内容属性**

   **Summary属性:**
   ```
   Name: Summary  
   Alias: summary
   Editor: Textarea
   Mandatory: ✅
   Description: 案例简要概述，1-2段文字
   ```

   **The Goal属性:**
   ```
   Name: The Goal
   Alias: theGoal
   Editor: Rich Text Editor
   Mandatory: ❌
   Description: 项目目标和期望结果
   ```

   **The Challenge属性:**
   ```
   Name: The Challenge
   Alias: theChallenge  
   Editor: Rich Text Editor
   Mandatory: ❌
   Description: 项目面临的主要挑战
   ```

   **The Solution属性:**
   ```
   Name: The Solution
   Alias: theSolution
   Editor: Rich Text Editor  
   Mandatory: ❌
   Description: 我们提供的解决方案
   ```

5. **添加关联属性**

   **Published Date属性:**
   ```
   Name: Published Date
   Alias: publishedDate
   Editor: Date Picker
   Mandatory: ❌
   Description: 案例发布日期
   ```

   **Related Services属性:**
   ```
   Name: Related Services
   Alias: services
   Editor: Content Picker
   Mandatory: ❌
   
   Editor Settings:
   - Pick multiple items: Yes (勾选)
   - Start node: Content (保持默认)
   - Filter by document type: sevice (如果有此选项)
   
   Description: 相关的服务类型
   ```

   **Related Industry属性:**
   ```
   Name: Related Industry  
   Alias: industry
   Editor: Content Picker
   Mandatory: ❌
   
   Editor Settings:
   - Pick multiple items: No (不勾选)
   - Start node: Content
   - Filter by document type: industry (如果有此选项)
   
   Description: 所属行业分类
   ```

6. **设置权限并保存**
   ```
   Permissions: ✅ Allow as root, ✅ Allow children
   点击 "Save"
   ```

#### ✅ 验证Case Study Document Type
- 确认包含11个属性
- Content Picker配置正确
- Media Picker配置正确

---

### 📰 4. News Article Document Type

**目的**: 新闻文章和公司动态

#### 创建步骤:
1. **基本信息**
   ```
   Name: News Article
   Alias: newsArticle
   Icon: 选择 "icon-newspaper" 或 "icon-article"
   ```

2. **添加所有属性**

   **基础信息属性:**
   ```
   Title:
   - Name: Title
   - Alias: title
   - Editor: Textstring
   - Mandatory: ✅
   
   URL Slug:
   - Name: URL Slug
   - Alias: urlSlug
   - Editor: Textstring
   - Mandatory: ✅
   
   Published Date:
   - Name: Published Date
   - Alias: publishedDate
   - Editor: Date Picker
   - Mandatory: ✅
   ```

   **内容属性:**
   ```
   Featured Image:
   - Name: Featured Image
   - Alias: featuredImage
   - Editor: Media Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   
   Content:
   - Name: Content
   - Alias: content
   - Editor: Rich Text Editor
   - Mandatory: ✅
   
   Excerpt:
   - Name: Excerpt
   - Alias: excerpt
   - Editor: Textarea
   - Mandatory: ❌
   - Description: 文章摘要，用于列表页显示
   ```

   **分类属性:**
   ```
   Category:
   - Name: Category
   - Alias: category
   - Editor: Content Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   - Filter by document type: category
   ```

3. **保存Document Type**

#### ✅ 验证News Article Document Type
- 包含7个属性
- Date Picker和Media Picker配置正确

---

## 👥 第三阶段：团队和地点信息

### 👤 5. Team Member Document Type

**目的**: 团队成员信息管理

#### 创建步骤:
1. **基本信息**
   ```
   Name: Team Member
   Alias: teamMember
   Icon: 选择 "icon-user" 或 "icon-users"
   ```

2. **添加个人信息属性**

   **基础信息:**
   ```
   Name:
   - Name: Name
   - Alias: name
   - Editor: Textstring
   - Mandatory: ✅
   
   Title:
   - Name: Title
   - Alias: title
   - Editor: Textstring
   - Mandatory: ✅
   - Description: 职位名称
   
   Department:
   - Name: Department
   - Alias: department
   - Editor: Textstring
   - Mandatory: ❌
   - Description: 所属部门
   ```

   **详细信息:**
   ```
   Bio:
   - Name: Bio
   - Alias: bio
   - Editor: Textarea
   - Mandatory: ❌
   - Description: 个人简介
   
   Profile Image:
   - Name: Profile Image
   - Alias: profileImage
   - Editor: Media Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   ```

3. **添加联系信息属性**

   ```
   LinkedIn URL:
   - Name: LinkedIn URL
   - Alias: linkedinUrl
   - Editor: Textstring
   - Mandatory: ❌
   
   Email:
   - Name: Email
   - Alias: email
   - Editor: Email Address
   - Mandatory: ❌
   ```

4. **添加管理属性**

   **布尔值属性:**
   ```
   Is Leadership:
   - Name: Is Leadership
   - Alias: isLeadership
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: False
   - Description: 是否为领导层成员
   
   Is Active:
   - Name: Is Active
   - Alias: isActive
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: True
   - Description: 是否在职
   ```

   **数字属性:**
   ```
   Display Order:
   - Name: Display Order
   - Alias: displayOrder
   - Editor: Numeric
   - Mandatory: ❌
   - Description: 显示顺序（数字越小越靠前）
   ```

5. **保存Document Type**

#### ✅ 验证Team Member Document Type
- 包含10个属性
- 布尔值字段配置正确
- Email Address类型配置正确

---

### 🏢 6. Office Location Document Type

**目的**: 办公地点信息管理

#### 创建步骤:
1. **基本信息**
   ```
   Name: Office Location
   Alias: officeLocation
   Icon: 选择 "icon-location" 或 "icon-map-location"
   ```

2. **添加地址信息属性**

   ```
   Office Name:
   - Name: Office Name
   - Alias: name
   - Editor: Textstring
   - Mandatory: ✅
   - Description: 办公室名称，如"北京办公室"
   
   Address:
   - Name: Address
   - Alias: address
   - Editor: Textarea
   - Mandatory: ✅
   - Description: 详细地址
   
   City:
   - Name: City
   - Alias: city
   - Editor: Textstring
   - Mandatory: ✅
   
   Country:
   - Name: Country
   - Alias: country
   - Editor: Textstring
   - Mandatory: ✅
   
   Country Code:
   - Name: Country Code
   - Alias: countryCode
   - Editor: Textstring
   - Mandatory: ❌
   - Description: 国家代码，如"CN"、"US"
   ```

3. **添加联系信息属性**

   ```
   Phone:
   - Name: Phone
   - Alias: phone
   - Editor: Textstring
   - Mandatory: ❌
   
   Email:
   - Name: Email
   - Alias: email
   - Editor: Email Address
   - Mandatory: ❌
   
   Timezone:
   - Name: Timezone
   - Alias: timezone
   - Editor: Textstring
   - Mandatory: ❌
   - Description: 时区信息，如"Asia/Shanghai"
   ```

4. **添加扩展信息属性**

   ```
   Coordinates:
   - Name: Coordinates
   - Alias: coordinates
   - Editor: Textstring
   - Mandatory: ❌
   - Description: GPS坐标，格式"纬度,经度"
   
   Description:
   - Name: Description
   - Alias: description
   - Editor: Textarea
   - Mandatory: ❌
   - Description: 办公室描述
   
   Office Image:
   - Name: Office Image
   - Alias: image
   - Editor: Media Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   ```

5. **添加管理属性**

   ```
   Is Headquarters:
   - Name: Is Headquarters
   - Alias: isHeadquarters
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: False
   
   Is Active:
   - Name: Is Active
   - Alias: isActive
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: True
   ```

6. **保存Document Type**

#### ✅ 验证Office Location Document Type
- 包含12个属性
- 地理位置信息完整

---

## 📊 第四阶段：公司信息类型

### 🏛️ 7. Company Info Document Type

**目的**: 公司信息内容块管理

#### 创建步骤:
1. **基本信息**
   ```
   Name: Company Info
   Alias: companyInfo
   Icon: 选择 "icon-info" 或 "icon-document"
   ```

2. **添加分类属性**

   **创建Section下拉选择:**
   ```
   首先需要创建一个Dropdown数据类型:
   
   Settings → Data Types → Create Data Type
   Name: Company Info Sections
   Property Editor: Dropdown
   
   在Prevalues中添加选项:
   - HERO
   - ABOUT  
   - MISSION
   - VALUES
   - LEADERSHIP
   
   保存数据类型
   ```

   **添加Section属性:**
   ```
   Name: Section
   Alias: section
   Editor: Company Info Sections (选择刚创建的)
   Mandatory: ✅
   Description: 内容所属区域
   ```

3. **添加内容属性**

   ```
   Title:
   - Name: Title
   - Alias: title
   - Editor: Textstring
   - Mandatory: ✅
   
   Subtitle:
   - Name: Subtitle
   - Alias: subtitle
   - Editor: Textstring
   - Mandatory: ❌
   
   Content:
   - Name: Content
   - Alias: content
   - Editor: Rich Text Editor
   - Mandatory: ❌
   ```

4. **添加媒体属性**

   ```
   Image:
   - Name: Image
   - Alias: image
   - Editor: Media Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   
   Video URL:
   - Name: Video URL
   - Alias: videoUrl
   - Editor: Textstring
   - Mandatory: ❌
   - Description: YouTube或其他视频平台链接
   ```

5. **添加CTA属性**

   ```
   CTA Text:
   - Name: CTA Text
   - Alias: ctaText
   - Editor: Textstring
   - Mandatory: ❌
   - Description: 按钮文字
   
   CTA URL:
   - Name: CTA URL
   - Alias: ctaUrl
   - Editor: Textstring
   - Mandatory: ❌
   - Description: 按钮链接
   ```

6. **添加管理属性**

   ```
   Display Order:
   - Name: Display Order
   - Alias: displayOrder
   - Editor: Numeric
   - Mandatory: ❌
   
   Is Active:
   - Name: Is Active
   - Alias: isActive
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: True
   
   Author:
   - Name: Author
   - Alias: author
   - Editor: Content Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   - Filter by document type: teamMember (如果可用)
   ```

7. **保存Document Type**

#### ✅ 验证Company Info Document Type
- 包含10个属性
- Dropdown选择器工作正常

---

### 📈 8. Company Stat Document Type

**目的**: 公司统计数据展示

#### 创建步骤:
1. **基本信息**
   ```
   Name: Company Stat
   Alias: companyStat
   Icon: 选择 "icon-chart" 或 "icon-graph"
   ```

2. **添加统计信息属性**

   ```
   Label:
   - Name: Label
   - Alias: label
   - Editor: Textstring
   - Mandatory: ✅
   - Description: 统计项目名称，如"Years in Business"
   
   Value:
   - Name: Value
   - Alias: value
   - Editor: Textstring
   - Mandatory: ✅
   - Description: 统计值，如"15+"、"500+"
   
   Description:
   - Name: Description
   - Alias: description
   - Editor: Textarea
   - Mandatory: ❌
   - Description: 统计项目的详细说明
   ```

3. **添加视觉元素**

   ```
   Icon:
   - Name: Icon
   - Alias: icon
   - Editor: Media Picker
   - Mandatory: ❌
   - Settings: Pick multiple items = No
   - Description: 统计项目的图标
   ```

4. **添加管理属性**

   ```
   Display Order:
   - Name: Display Order
   - Alias: displayOrder
   - Editor: Numeric
   - Mandatory: ❌
   - Description: 显示顺序
   
   Is Active:
   - Name: Is Active
   - Alias: isActive
   - Editor: True/False
   - Mandatory: ❌
   - Default Value: True
   ```

5. **保存Document Type**

#### ✅ 验证Company Stat Document Type
- 包含6个属性
- 结构简洁实用

---

## 🎯 第五阶段：创建测试内容

### 📝 内容创建顺序

#### 1. 创建基础分类内容

**创建Industry内容:**
```
Content → Create Content → Industry

示例内容1:
- Industry Name: 金融服务
- URL Slug: financial-services
- Description: 为银行、保险、投资等金融机构提供可持续发展解决方案

示例内容2:
- Industry Name: 制造业
- URL Slug: manufacturing
- Description: 帮助制造企业实现碳中和目标和绿色转型

示例内容3:
- Industry Name: 能源电力
- URL Slug: energy-power
- Description: 可再生能源项目开发和传统能源绿色升级
```

**创建Category内容:**
```
Content → Create Content → Category

示例内容1:
- Category Name: 公司新闻
- URL Slug: company-news

示例内容2:
- Category Name: 行业洞察
- URL Slug: industry-insights

示例内容3:
- Category Name: 政策解读
- URL Slug: policy-analysis
```

#### 2. 创建Case Study内容

```
Content → Create Content → Case Study

示例内容1:
- Title: 某大型银行碳中和转型项目
- URL Slug: bank-carbon-neutral-transformation
- Client Name: 工商银行
- Summary: 通过建立完整的碳管理体系，帮助银行实现碳中和目标...
- The Goal: 建立银行业碳中和管理体系...
- The Challenge: 金融机构碳排放计算复杂...
- The Solution: 通过数字化碳管理平台...
- Published Date: 选择当前日期
- Related Services: 选择相关的服务
- Related Industry: 选择"金融服务"

示例内容2:
- Title: 制造企业绿色供应链建设
- URL Slug: manufacturing-green-supply-chain
- Client Name: 比亚迪
- (填写相应内容...)
```

#### 3. 创建News Article内容

```
Content → Create Content → News Article

示例内容1:
- Title: 南极加入联合国全球契约组织
- URL Slug: southpole-joins-un-global-compact
- Published Date: 当前日期
- Content: 使用Rich Text Editor添加文章内容
- Excerpt: 南极正式成为联合国全球契约组织成员...
- Category: 选择"公司新闻"

示例内容2:
- Title: 2024年碳市场发展趋势分析
- URL Slug: carbon-market-trends-2024
- (填写相应内容...)
- Category: 选择"行业洞察"
```

#### 4. 创建Team Member内容

```
Content → Create Content → Team Member

示例内容1:
- Name: 张伟
- Title: 首席执行官
- Department: 管理层
- Bio: 在气候变化和可持续发展领域拥有15年经验...
- LinkedIn URL: https://linkedin.com/in/zhangwei
- Email: zhang.wei@southpole.com
- Is Leadership: True
- Is Active: True
- Display Order: 1

示例内容2:
- Name: 李莉
- Title: 技术总监
- Department: 技术部
- Is Leadership: True
- Display Order: 2
```

#### 5. 创建Office Location内容

```
Content → Create Content → Office Location

示例内容1:
- Office Name: 北京总部
- Address: 北京市朝阳区建国门外大街甲12号
- City: 北京
- Country: 中国
- Country Code: CN
- Phone: +86-10-1234-5678
- Email: beijing@southpole.com
- Timezone: Asia/Shanghai
- Is Headquarters: True
- Is Active: True

示例内容2:
- Office Name: 上海办公室
- Address: 上海市黄浦区南京东路100号
- City: 上海
- Country: 中国
- Is Headquarters: False
```

#### 6. 创建Company Info内容

```
Content → Create Content → Company Info

示例内容1:
- Section: HERO
- Title: 引领全球气候行动
- Subtitle: 专业的碳管理和可持续发展解决方案提供商
- Content: 南极致力于为全球企业提供专业的碳管理...
- CTA Text: 了解更多
- CTA URL: /about
- Display Order: 1
- Is Active: True

示例内容2:
- Section: ABOUT
- Title: 关于南极
- Content: 我们是全球领先的气候解决方案提供商...
- Display Order: 1
```

#### 7. 创建Company Stat内容

```
Content → Create Content → Company Stat

示例内容1:
- Label: 服务年限
- Value: 15+
- Description: 在气候变化领域的专业服务经验
- Display Order: 1
- Is Active: True

示例内容2:
- Label: 完成项目
- Value: 500+
- Description: 成功完成的碳管理和可持续发展项目
- Display Order: 2

示例内容3:
- Label: 服务国家
- Value: 25+
- Description: 遍布全球的服务网络
- Display Order: 3
```

---

## ✅ 第六阶段：验证和测试

### 🔍 内容验证清单

**每创建一个Document Type后:**
- [ ] 检查Document Type在列表中显示
- [ ] 尝试创建一个测试内容
- [ ] 确认所有字段都能正常填写
- [ ] 保存并发布内容

**创建内容后:**
- [ ] 在Content区域能看到所有内容
- [ ] 内容状态显示为已发布
- [ ] 字段值正确保存

### 🚀 前端集成测试

#### 1. 检查状态页面
```
访问: http://localhost:3000/umbraco-status

期望结果:
✅ Umbraco服务: 运行中
✅ Delivery API: 可用  
✅ 数据库: 连接
✅ API密钥: 有效

内容统计应显示:
- 案例研究: X 个
- 新闻文章: X 个  
- 服务: X 个 (包括之前的2个)
```

#### 2. 测试API端点
```bash
# 测试Case Study
curl "http://localhost:5001/umbraco/delivery/api/v2/content?contentType=caseStudy" \
     -H "Api-Key: southpole-api-key-2024"

# 测试News Article  
curl "http://localhost:5001/umbraco/delivery/api/v2/content?contentType=newsArticle" \
     -H "Api-Key: southpole-api-key-2024"

# 测试Team Member
curl "http://localhost:5001/umbraco/delivery/api/v2/content?contentType=teamMember" \
     -H "Api-Key: southpole-api-key-2024"
```

#### 3. 前端页面测试
```
访问前端页面:
- http://localhost:3000/ (首页应显示真实数据)
- http://localhost:3000/work (案例研究页面)
- http://localhost:3000/news (新闻页面)

检查:
- 数据正确显示
- 图片正常加载
- 无控制台错误
```

---

## 🎉 完成检查清单

### Document Types创建 ✅
- [ ] Industry
- [ ] Category  
- [ ] Case Study
- [ ] News Article
- [ ] Team Member
- [ ] Office Location
- [ ] Company Info
- [ ] Company Stat

### 测试内容创建 ✅
- [ ] 至少2个Industry
- [ ] 至少2个Category
- [ ] 至少2个Case Study
- [ ] 至少2个News Article
- [ ] 至少2个Team Member
- [ ] 至少1个Office Location
- [ ] 至少2个Company Info
- [ ] 至少3个Company Stat

### 集成验证 ✅
- [ ] 状态页面全绿
- [ ] API返回数据
- [ ] 前端显示正常
- [ ] 无控制台错误

---

## 🚨 常见问题解决

### Document Type创建问题
**问题**: Alias自动生成不正确
**解决**: 手动修改Alias确保与代码中的contentType匹配

**问题**: Content Picker无法选择特定类型
**解决**: 先创建被引用的Document Type和内容

### 内容创建问题  
**问题**: 必填字段无法保存
**解决**: 检查所有Mandatory字段都已填写

**问题**: 图片无法上传
**解决**: 先在Media区域上传图片，然后在Media Picker中选择

### API集成问题
**问题**: API返回404
**解决**: 确认contentType alias拼写正确

**问题**: 前端不显示数据
**解决**: 检查content状态是否为已发布

---

## 🎯 下一步建议

完成本教程后，你将拥有一个完整的Umbraco + Next.js集成系统。接下来可以考虑:

1. **内容丰富化**: 添加更多真实内容
2. **媒体管理**: 优化图片和文档管理
3. **权限设置**: 配置用户角色和权限
4. **性能优化**: 启用缓存和CDN
5. **生产部署**: 准备生产环境配置

---

**🎊 祝你创建成功！如有问题，请检查Umbraco日志或前端开发者工具。**