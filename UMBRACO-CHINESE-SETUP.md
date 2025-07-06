# 🇨🇳 Umbraco中文配置和内容创建指南

## 🌏 任务1：设置中文界面

### 方法1：用户偏好设置（快速方法）
1. 登录Umbraco后台：http://localhost:5001/umbraco
2. 点击右上角用户头像
3. 选择 **"User Settings"** 或 **"用户设置"**
4. 在 **"Language"** 下拉菜单中选择 **"Chinese (Simplified)"** 或 **"中文(简体)"**
5. 点击 **"Save"** 保存

### 方法2：全局语言配置
如果方法1没有中文选项，需要在后台启用：

1. 进入 **Settings** → **Languages**
2. 点击 **"Create"** 创建新语言
3. 选择 **"Chinese (China)"** 或输入语言代码 `zh-CN`
4. 设为默认语言（如需要）
5. 保存配置

### 方法3：安装中文语言包
1. 进入 **Settings** → **Packages**
2. 搜索 "Chinese" 或 "中文"
3. 安装官方或社区中文语言包
4. 重启Umbraco服务

## 📝 任务2：创建Document Types

### 1. 基础设置
在创建内容前，先创建以下基础Document Types：

#### A. 创建Homepage Document Type
1. 进入 **Settings** → **Document Types**
2. 点击 **"Create"** → **"Document Type"**
3. 填写信息：
   - **Name**: `Homepage`
   - **Alias**: `homepage`
   - **Icon**: 选择房子图标
   - **Allow at root**: ✓（勾选）

4. 添加属性（Properties）：

| 显示名称 | 别名 | 数据类型 | 必填 | 描述 |
|----------|------|----------|------|------|
| 页面标题 | pageTitle | Textstring | ✓ | 页面主标题 |
| SEO标题 | seoTitle | Textstring |  | 搜索引擎标题 |
| SEO描述 | seoDescription | Textarea |  | 搜索引擎描述 |
| Hero标题 | heroTitle | Textstring | ✓ | 首页大标题 |
| Hero副标题 | heroSubtitle | Textstring |  | 首页副标题 |
| Hero描述 | heroDescription | Textarea | ✓ | 首页描述文字 |
| Hero背景图 | heroBackgroundImage | Media Picker | ✓ | 首页背景图片 |
| Hero CTA文字 | heroCTAText | Textstring |  | 行动按钮文字 |
| Hero CTA链接 | heroCTALink | Textstring |  | 行动按钮链接 |

#### B. 创建Service Document Type
1. 创建新Document Type：
   - **Name**: `Service`
   - **Alias**: `service`
   - **Icon**: 设置图标

2. 添加属性：

| 显示名称 | 别名 | 数据类型 | 必填 | 描述 |
|----------|------|----------|------|------|
| 服务名称 | serviceName | Textstring | ✓ | 服务标题 |
| URL别名 | urlSlug | Textstring | ✓ | 页面链接 |
| 服务图标 | serviceIcon | Media Picker |  | 服务图标 |
| 简短描述 | shortDescription | Textarea | ✓ | 服务简介 |
| 详细描述 | fullDescription | Rich Text Editor | ✓ | 服务详情 |
| 服务特点 | features | Repeatable Textstrings |  | 特点列表 |
| 显示顺序 | displayOrder | Numeric |  | 排序权重 |

#### C. 创建Case Study Document Type
1. 创建新Document Type：
   - **Name**: `Case Study`
   - **Alias**: `caseStudy`
   - **Icon**: 灯泡图标

2. 添加属性：

| 显示名称 | 别名 | 数据类型 | 必填 | 描述 |
|----------|------|----------|------|------|
| 项目标题 | projectTitle | Textstring | ✓ | 案例标题 |
| URL别名 | urlSlug | Textstring | ✓ | 页面链接 |
| 客户名称 | clientName | Textstring | ✓ | 客户公司 |
| 项目时间 | projectDate | Date Picker |  | 项目日期 |
| 封面图片 | heroImage | Media Picker | ✓ | 案例封面 |
| 项目摘要 | projectSummary | Textarea | ✓ | 项目简介 |
| 项目目标 | projectGoal | Rich Text Editor | ✓ | 目标描述 |
| 面临挑战 | challenges | Rich Text Editor | ✓ | 挑战分析 |
| 解决方案 | solutions | Rich Text Editor | ✓ | 方案说明 |
| 项目成果 | results | Rich Text Editor |  | 成果展示 |
| 相关服务 | relatedServices | Content Picker |  | 关联服务 |

#### D. 创建News Article Document Type
1. 创建新Document Type：
   - **Name**: `News Article`
   - **Alias**: `newsArticle`
   - **Icon**: 报纸图标

2. 添加属性：

| 显示名称 | 别名 | 数据类型 | 必填 | 描述 |
|----------|------|----------|------|------|
| 新闻标题 | newsTitle | Textstring | ✓ | 文章标题 |
| URL别名 | urlSlug | Textstring | ✓ | 页面链接 |
| 发布日期 | publishDate | Date Picker | ✓ | 发布时间 |
| 作者 | author | Textstring |  | 文章作者 |
| 特色图片 | featuredImage | Media Picker | ✓ | 文章封面 |
| 文章摘要 | articleSummary | Textarea | ✓ | 内容摘要 |
| 正文内容 | content | Rich Text Editor | ✓ | 文章正文 |
| 标签 | tags | Tags |  | 文章标签 |
| 分类 | category | Content Picker |  | 文章分类 |

#### E. 创建Folder Document Type
1. 创建新Document Type：
   - **Name**: `Folder`
   - **Alias**: `folder`
   - **Icon**: 文件夹图标
   - **Allow at root**: ✓

2. 不需要添加属性，只用于组织内容

### 2. 设置Document Type结构权限

#### 配置允许的子节点类型：
1. **Homepage**:
   - 允许子节点：Folder, Service, Case Study, News Article

2. **Folder**:
   - 允许子节点：Service, Case Study, News Article, Folder

3. **Service, Case Study, News Article**:
   - 不允许子节点（终端节点）

## 🏗️ 任务3：创建内容结构

### 1. 创建根节点和文件夹结构
1. 进入 **Content** 部分
2. 右键点击根节点，选择 **"Create"**
3. 创建以下结构：

```
📁 South Pole Official Site (Homepage)
├── 📁 Services (Folder)
│   ├── 🔧 碳管理咨询 (Service)
│   ├── 🔧 可持续发展战略 (Service)
│   ├── 🔧 ESG报告服务 (Service)
│   └── 🔧 碳信用交易 (Service)
├── 📁 Case Studies (Folder)
│   ├── 💡 气候行动项目 (Case Study)
│   ├── 💡 可再生能源计划 (Case Study)
│   └── 💡 碳中和实施案例 (Case Study)
└── 📁 News (Folder)
    ├── 📰 公司里程碑新闻 (News Article)
    ├── 📰 行业洞察文章 (News Article)
    └── 📰 政策解读报告 (News Article)
```

### 2. 填写示例内容

#### Homepage示例内容：
- **页面标题**: "南极气候解决方案"
- **Hero标题**: "引领气候行动，共建可持续未来"
- **Hero副标题**: "专业的碳管理和气候变化解决方案提供商"
- **Hero描述**: "我们致力于帮助企业实现碳中和目标，通过创新的技术和专业的咨询服务，为应对气候变化贡献力量。"

#### Service示例内容：
**碳管理咨询**：
- **服务名称**: "碳管理咨询"
- **URL别名**: "carbon-management-consulting"
- **简短描述**: "为企业提供全面的碳排放管理和减排策略制定服务"
- **详细描述**: "我们的碳管理咨询服务包括碳盘查、减排路径规划、碳中和策略制定等，帮助企业建立科学的碳管理体系。"

#### Case Study示例内容：
**气候行动项目**：
- **项目标题**: "全球科技公司碳中和实施项目"
- **客户名称**: "Global Tech Corp"
- **项目摘要**: "帮助一家全球性科技公司制定并实施全面的碳中和战略"
- **项目目标**: "在2025年前实现公司运营的碳中和，并制定供应链减排计划"
- **面临挑战**: "复杂的全球供应链、多样化的业务模式、缺乏统一的碳管理体系"
- **解决方案**: "制定分阶段的减排计划，实施可再生能源转换，建立碳抵消机制"

## 🔧 任务4：配置API访问

### 检查Delivery API配置
1. 进入 **Settings** → **Headless**
2. 确保 **"Enable Delivery API"** 已启用
3. 配置 **"API Key"**: `southpole-api-key-2024`
4. 设置 **"CORS Origins"**: `http://localhost:3001, http://localhost:3000`

### 测试API访问
```bash
# 测试获取所有内容
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content"

# 测试获取特定类型内容
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
```

## ✅ 验证清单

完成后检查以下项目：
- [ ] Umbraco界面显示为中文
- [ ] 所有Document Types已创建
- [ ] 内容结构已建立
- [ ] 示例内容已填写并发布
- [ ] API返回正确的JSON数据
- [ ] 前端状态页面显示内容统计

## ⏱️ 时间估计
- 中文界面设置：5分钟
- Document Types创建：20分钟
- 内容结构和示例：30分钟
- **总计：55分钟**

---

**重要提示**：创建内容后务必点击 **"Save and Publish"** 而不只是 **"Save"**！