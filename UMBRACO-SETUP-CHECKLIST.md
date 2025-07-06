# ✅ Umbraco设置检查清单

## 📝 必须完成的步骤

### 1. ✅ Umbraco基础设置
- [x] Umbraco已启动运行
- [x] 可以访问后台管理界面
- [ ] 已登录管理员账户

### 2. ⚙️ 创建内容类型（在Umbraco后台操作）

#### A. Case Study 内容类型
1. 进入 **Settings** → **Document Types** → **Create**
2. 名称：`Case Study`，别名：`caseStudy`
3. 添加属性：

| 名称 | 别名 | 数据类型 | 必填 |
|------|------|----------|------|
| Title | title | Textstring | ✓ |
| URL Slug | slug | Textstring | ✓ |
| Client Name | clientName | Textstring | ✓ |
| Hero Image | heroImage | Media Picker | ✓ |
| Summary | summary | Textarea | ✓ |
| The Goal | theGoal | Rich Text Editor | ✓ |
| The Challenge | theChallenge | Rich Text Editor | ✓ |
| The Solution | theSolution | Rich Text Editor | ✓ |

#### B. Service 内容类型
1. 名称：`Service`，别名：`service`
2. 添加属性：

| 名称 | 别名 | 数据类型 | 必填 |
|------|------|----------|------|
| Name | name | Textstring | ✓ |
| URL Slug | slug | Textstring | ✓ |
| Description | description | Textarea | ✓ |
| Icon | icon | Media Picker |  |
| Full Description | fullDescription | Rich Text Editor |  |

#### C. News Article 内容类型
1. 名称：`News Article`，别名：`newsArticle`
2. 添加属性：

| 名称 | 别名 | 数据类型 | 必填 |
|------|------|----------|------|
| Title | title | Textstring | ✓ |
| URL Slug | slug | Textstring | ✓ |
| Publish Date | publishDate | Date Picker | ✓ |
| Hero Image | heroImage | Media Picker | ✓ |
| Content | content | Rich Text Editor | ✓ |
| Summary | summary | Textarea | ✓ |

### 3. 📁 创建内容结构（在Umbraco后台操作）

1. 进入 **Content** 部分
2. 右键点击内容树，选择 **Create**
3. 创建以下结构：

```
Content
├── Case Studies (文件夹类型)
│   ├── Climate Action Project (caseStudy)
│   └── Renewable Energy Initiative (caseStudy)
├── Services (文件夹类型)
│   ├── Carbon Footprint Assessment (service)
│   ├── Climate Strategy Development (service)
│   └── Renewable Energy Solutions (service)
└── News (文件夹类型)
    ├── Company Milestone Article (newsArticle)
    └── Industry Insight Article (newsArticle)
```

### 4. 🖼️ 上传示例媒体

1. 进入 **Media** 部分
2. 创建文件夹：
   - Images
   - Icons
3. 上传一些示例图片（可以使用项目中现有的图片）

### 5. 📄 创建示例内容

#### 示例案例研究内容：
- **Title**: "Climate Action Project"
- **Client Name**: "Global Tech Corp"
- **Summary**: "Comprehensive carbon reduction strategy implementation"
- **The Goal**: "Reduce carbon emissions by 50% within 2 years"
- **The Challenge**: "Complex supply chain and multiple operational sites"
- **The Solution**: "Implemented renewable energy and efficiency measures"

#### 示例服务内容：
- **Name**: "Carbon Footprint Assessment"
- **Description**: "Comprehensive analysis of your organization's carbon footprint"

### 6. 🔧 配置前端集成

运行集成配置脚本：
```bash
cd /Users/brendanxu/Desktop/projects/methasweb/southpole-clone
./setup-umbraco-integration.sh
```

### 7. 🧪 测试集成

1. **启动前端**：
```bash
cd apps/main-site
npm run dev
```

2. **访问状态页面**：
   - http://localhost:3001/umbraco-status

3. **测试API**：
```bash
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=caseStudy"
```

### 8. ✅ 验证清单

- [ ] 可以在Umbraco后台看到创建的内容类型
- [ ] 可以创建和编辑内容
- [ ] API返回正确的JSON数据
- [ ] 状态页面显示内容统计
- [ ] 前端页面显示Umbraco内容（而不是mock数据）

## 🎯 完成后的效果

1. **编辑体验**：
   - 编辑可以在Umbraco后台管理所有内容
   - 内容创建、编辑、发布流程清晰
   - 媒体管理集中化

2. **开发体验**：
   - 前端通过API自动获取最新内容
   - 支持本地开发和生产环境
   - 有fallback机制（Umbraco不可用时使用mock数据）

3. **网站效果**：
   - 所有页面显示真实内容
   - 内容更新立即反映在网站上
   - SEO友好的内容结构

## 🚨 常见问题

### Delivery API返回空数组？
1. 确认内容已"发布"（不只是保存）
2. 检查内容类型别名是否正确
3. 验证API密钥配置

### 前端显示不了内容？
1. 检查环境变量是否正确设置
2. 查看浏览器控制台错误
3. 确认CORS设置允许前端域名

### 图片不显示？
1. 确认媒体文件已上传
2. 检查媒体选择器是否正确配置
3. 验证图片URL是否包含完整域名

---

**重要提示**：按顺序完成上述步骤，每个步骤完成后进行验证再进行下一步。