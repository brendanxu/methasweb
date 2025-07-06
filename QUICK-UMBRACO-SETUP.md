# ⚡ Umbraco快速设置指南

## ✅ 已完成的配置

1. **前端集成配置** ✅
   - 环境变量已设置 (.env.local)
   - 数据源管理器已创建 (data-source.ts)
   - 状态检查页面已创建 (/umbraco-status)

2. **API配置** ✅
   - Umbraco正在运行在 localhost:5001
   - Delivery API已启用
   - API密钥已配置

## 🎯 现在需要您手动操作

### 第1步：访问Umbraco后台
1. 打开浏览器访问：http://localhost:5001/umbraco
2. 登录：
   - 用户名：admin@southpole.com
   - 密码：SouthPole2024!Railway

### 第2步：创建内容类型 (5分钟)

#### A. 创建Case Study内容类型
1. 点击 **Settings** → **Document Types**
2. 点击 **Create** → **Document Type**
3. 填写：
   - Name: `Case Study`
   - Alias: `caseStudy` 
   - Icon: 选择灯泡图标
4. 点击 **Add property** 添加以下属性：

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

5. 点击 **Save**

#### B. 创建Service内容类型
重复上述步骤，创建Service：
- Name: `Service`
- Alias: `service`
- 属性：Name, URL Slug, Description, Icon, Full Description

#### C. 创建News Article内容类型
- Name: `News Article` 
- Alias: `newsArticle`
- 属性：Title, URL Slug, Publish Date, Hero Image, Content, Summary

### 第3步：创建内容结构
1. 点击 **Content**
2. 右键点击内容树 → **Create**
3. 选择 **Folder** 创建以下文件夹：
   - Case Studies
   - Services  
   - News

### 第4步：创建示例内容
在每个文件夹下创建1-2个示例内容，例如：

**Case Studies文件夹下**：
- Title: "Climate Action Project"
- Client Name: "Global Tech Corp" 
- Summary: "Comprehensive carbon reduction strategy"
- 填写其他必填字段

**Services文件夹下**：
- Name: "Carbon Footprint Assessment"
- Description: "Comprehensive analysis service"

### 第5步：验证集成
1. 启动前端（新终端）：
```bash
cd apps/main-site
npm run dev
```

2. 访问状态页面：http://localhost:3001/umbraco-status

3. 检查是否显示内容统计

## 🚀 预期结果

完成后您将看到：
- ✅ Umbraco后台有完整的内容类型
- ✅ 有示例内容可以编辑
- ✅ 前端可以获取真实数据
- ✅ 状态页面显示正确的统计

## 🔧 测试命令

```bash
# 测试API是否返回内容
curl -H "Api-Key: southpole-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content?contentType=caseStudy

# 查看所有内容
curl -H "Api-Key: southpole-api-key-2024" \
     http://localhost:5001/umbraco/delivery/api/v1/content
```

## ⏱️ 时间估计
- 内容类型创建：5分钟
- 示例内容创建：10分钟  
- 验证测试：5分钟
- **总计：20分钟**

---

**重要提示**：创建内容时记得点击 **"Save and Publish"** 而不只是 **"Save"**，这样API才能获取到内容！