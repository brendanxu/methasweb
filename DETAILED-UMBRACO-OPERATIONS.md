# 📋 Umbraco详细操作指南（每步都有截图说明）

## 🎯 目标：将空的Umbraco配置为South Pole网站后台

---

## 第1步：登录Umbraco后台

### 1.1 打开浏览器
1. 打开任意浏览器（Chrome、Safari、Firefox等）
2. 在地址栏输入：`http://localhost:5001/umbraco`
3. 按回车键

### 1.2 登录页面操作
**看到的界面**：Umbraco登录页面，有用户名和密码输入框

**具体操作**：
1. 在 **Email** 输入框中输入：`admin@southpole.com`
2. 在 **Password** 输入框中输入：`SouthPole2024!Railway`
3. 点击蓝色的 **"Login"** 按钮

**成功标志**：进入Umbraco管理界面，左侧有菜单栏

---

## 第2步：熟悉Umbraco界面

### 2.1 界面结构说明
登录后您会看到：
- **左侧**：主菜单栏（Content、Media、Settings等）
- **中间**：主工作区域
- **右上角**：用户头像和设置

### 2.2 主要菜单说明
- **Content**：管理网站内容（文章、页面等）
- **Media**：管理图片、文件等媒体资源
- **Settings**：系统设置（Document Types、语言等）

---

## 第3步：启用Delivery API（重要！）

### 3.1 进入Settings菜单
**操作**：
1. 点击左侧菜单栏中的 **"Settings"**
2. 菜单会展开，显示子选项

### 3.2 查找API设置
**在Settings展开的菜单中查找以下选项之一**：
- **"Headless"**
- **"API"** 
- **"Delivery API"**
- **"Configuration"**

### 3.3 配置Delivery API
**如果找到"Headless"或"Delivery API"**：
1. 点击进入
2. 确保有一个开关显示 **"Enable Delivery API"** 或类似
3. 如果是关闭状态，点击开启
4. 查找 **"API Key"** 输入框
5. 输入：`southpole-api-key-2024`
6. 点击 **"Save"** 保存

**如果找不到上述选项**：
1. 点击 **"Settings"** → **"Configuration"**
2. 查看是否有API相关设置
3. 暂时跳过此步，继续后续操作

---

## 第4步：尝试设置中文界面

### 4.1 进入用户设置
**操作**：
1. 点击右上角的用户头像（圆形图标）
2. 查找 **"User"**、**"Profile"** 或 **"Settings"** 选项
3. 点击进入

### 4.2 查找语言设置
**在用户设置页面查找**：
- **"Language"** 下拉菜单
- **"Culture"** 设置
- **"Locale"** 选项

**如果找到语言设置**：
1. 点击下拉菜单
2. 查看是否有 **"Chinese"**、**"中文"** 或 **"zh-CN"** 选项
3. 如果有，选择并保存
4. 如果没有，继续使用英文界面

---

## 第5步：创建第一个Document Type（Service）

### 5.1 进入Document Types
**操作**：
1. 点击左侧 **"Settings"**
2. 在展开的菜单中找到 **"Document Types"**
3. 点击 **"Document Types"**

**看到的界面**：Document Types列表页面（可能是空的）

### 5.2 创建新Document Type
**操作**：
1. 查找页面右上角的 **"Create"** 按钮（通常是蓝色或绿色）
2. 点击 **"Create"**
3. 在弹出的菜单中选择 **"Document Type"**

### 5.3 填写基本信息
**看到的界面**：Document Type创建表单

**具体填写**：
1. **Name** 输入框：输入 `Service`
2. **Alias** 输入框：输入 `service`（注意小写）
3. **Icon**：点击图标选择器，选择一个设置或齿轮图标
4. 不要勾选 **"Allow at root"**（保持未选中状态）

### 5.4 添加属性组
**操作**：
1. 查找 **"Add Group"** 或 **"Add Tab"** 按钮
2. 点击该按钮
3. 输入组名称：`服务信息`
4. 点击确认

### 5.5 添加第一个属性：服务名称
**操作**：
1. 在刚创建的 `服务信息` 组下，点击 **"Add property"** 按钮
2. 填写属性信息：
   - **Name**：`服务名称`
   - **Alias**：`serviceName`
   - **Property Editor**：选择 **"Textstring"**
   - **Mandatory**：勾选 ✅
   - **Description**：`服务的名称标题`
3. 点击 **"Submit"** 或 **"Save"**

### 5.6 添加第二个属性：URL别名
**重复上述操作，添加第二个属性**：
1. 点击 **"Add property"**
2. 填写：
   - **Name**：`URL别名`
   - **Alias**：`urlSlug`
   - **Property Editor**：**"Textstring"**
   - **Mandatory**：勾选 ✅
   - **Description**：`用于生成页面链接`
3. 点击 **"Submit"**

### 5.7 添加第三个属性：简短描述
**继续添加**：
1. 点击 **"Add property"**
2. 填写：
   - **Name**：`简短描述`
   - **Alias**：`shortDescription`
   - **Property Editor**：**"Textarea"**
   - **Mandatory**：勾选 ✅
   - **Description**：`服务的简短介绍`
3. 点击 **"Submit"**

### 5.8 添加第四个属性：详细描述
**最后一个属性**：
1. 点击 **"Add property"**
2. 填写：
   - **Name**：`详细描述`
   - **Alias**：`fullDescription`
   - **Property Editor**：**"Rich Text Editor"**
   - **Mandatory**：勾选 ✅
   - **Description**：`服务的详细说明`
3. 点击 **"Submit"**

### 5.9 保存Document Type
**操作**：
1. 查找页面上的 **"Save"** 按钮（通常在右上角）
2. 点击 **"Save"**
3. 等待保存完成的提示

**成功标志**：页面显示保存成功，Document Type列表中出现"Service"

---

## 第6步：创建第一个内容（服务）

### 6.1 进入Content管理
**操作**：
1. 点击左侧菜单栏中的 **"Content"**
2. 进入内容管理界面

**看到的界面**：内容树（可能只有Recycle Bin）

### 6.2 创建新内容
**操作**：
1. 右键点击内容树的空白区域（或根节点）
2. 选择 **"Create"**
3. 在弹出的菜单中查找 **"Service"** 选项
4. 点击 **"Service"**

### 6.3 填写服务内容
**看到的界面**：Service内容编辑表单

**具体填写**：
1. **Name** 输入框：`碳管理咨询`
2. **服务名称**：`碳管理咨询`
3. **URL别名**：`carbon-management-consulting`
4. **简短描述**：
   ```
   为企业提供全面的碳排放管理和减排策略制定服务
   ```
5. **详细描述**：
   ```
   我们的碳管理咨询服务包括企业碳盘查、减排路径规划、碳中和策略制定等，帮助企业建立科学的碳管理体系，实现可持续发展目标。
   ```

### 6.4 发布内容（重要！）
**操作**：
1. **不要**点击 "Save"
2. 查找并点击 **"Save and Publish"** 按钮（通常是绿色的）
3. 等待发布完成的提示

**成功标志**：
- 内容树中出现"碳管理咨询"节点
- 节点图标旁边有绿色标记（表示已发布）

---

## 第7步：验证设置是否成功

### 7.1 运行验证脚本
**操作**：
1. 回到终端
2. 输入命令：`./verify-umbraco-setup.sh`
3. 按回车键运行

### 7.2 查看验证结果
**期望看到的结果**：
- ✅ Umbraco服务正在运行
- ✅ API密钥认证成功
- ✅ service: 1 个项目

**如果仍然显示错误**：
- 检查内容是否真的已"发布"（不只是保存）
- 检查Document Type的alias是否正确（`service`）
- 等待1-2分钟后重新运行验证

---

## 🚨 常见问题和解决方案

### 问题1：找不到"Create"按钮
**解决方案**：
- 按钮可能在页面的不同位置（右上角、中间区域）
- 按钮可能是"+"号图标
- 刷新页面重试

### 问题2：没有"Service"选项可选
**原因**：Document Type没有创建成功
**解决方案**：
- 重新检查Document Type创建步骤
- 确保Document Type已保存
- 确保alias是"service"（小写）

### 问题3：API仍然返回错误
**解决方案**：
- 确保内容已"发布"（不只是保存）
- 重启Umbraco服务：停止后重新运行`./start-local.sh`
- 检查Delivery API是否启用

### 问题4：界面找不到某个菜单
**解决方案**：
- 不同版本的Umbraco界面可能略有不同
- 查看左侧菜单是否需要展开
- 尝试在Settings下查找所有子菜单

---

## 📞 需要帮助时请提供

如果遇到问题，请告诉我：
1. **具体在哪一步遇到困难**
2. **当前看到的页面是什么样的**
3. **点击了什么按钮后出现问题**
4. **看到的具体错误信息**

我会提供针对性的解决方案！

---

## 🎉 成功完成的标志

当您完成所有步骤后，应该达到：
1. 在Umbraco后台Content区域看到"碳管理咨询"内容
2. 验证脚本显示"service: 1 个项目"
3. 可以编辑和管理这个服务内容

**估计完成时间：30-45分钟**