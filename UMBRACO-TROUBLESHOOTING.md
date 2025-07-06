# 🔧 Umbraco操作故障排除指南

## 🎯 按问题类型分类解决

---

## 🚪 登录问题

### 问题：无法访问 http://localhost:5001/umbraco
**症状**：页面无法加载、连接被拒绝

**解决步骤**：
1. 检查Umbraco是否在运行：
   ```bash
   ps aux | grep dotnet
   ```
2. 如果没有运行，启动Umbraco：
   ```bash
   ./start-local.sh
   ```
3. 等待看到 "Now listening on: http://localhost:5001" 消息

### 问题：登录失败
**症状**：输入用户名密码后提示错误

**解决步骤**：
1. 确认用户名：`admin@southpole.com`
2. 确认密码：`SouthPole2024!Railway`
3. 如果仍然失败，可能需要重新初始化用户

---

## 📋 界面导航问题

### 问题：找不到某个菜单项
**常见情况**：
- 找不到"Document Types"
- 找不到"Headless"或"API"设置

**解决步骤**：
1. **展开所有菜单**：点击左侧菜单项旁的箭头
2. **检查Settings子菜单**：
   ```
   Settings → 展开查看所有子项
   ├── Document Types
   ├── Languages  
   ├── Configuration
   ├── Headless (可能在这里)
   └── 其他选项...
   ```
3. **版本差异**：不同Umbraco版本菜单可能略有不同

### 问题：找不到"Create"按钮
**可能的位置**：
- 页面右上角（蓝色或绿色按钮）
- 内容区域中间
- "+"图标
- 右键菜单中的"Create"选项

---

## 🏗️ Document Type创建问题

### 问题：创建Document Type后找不到
**检查清单**：
1. **Name是否填写**：`Service`
2. **Alias是否正确**：必须是`service`（小写）
3. **是否保存**：点击了Save按钮
4. **刷新页面**：F5刷新后重新查看

### 问题：添加属性时Property Editor选项很少
**原因**：Umbraco版本差异或包未安装

**常用Property Editor类型**：
```
文本类：
- Textstring (单行文本)
- Textarea (多行文本)  
- Rich Text Editor (富文本)

其他类：
- Media Picker (媒体选择器)
- Date Picker (日期选择器)
- Numeric (数字)
```

**解决方案**：如果找不到需要的类型，选择最接近的

### 问题：属性保存失败
**检查清单**：
1. **Name不能为空**
2. **Alias必须唯一**且只能包含字母数字
3. **Alias不能包含空格或特殊字符**
4. **建议的Alias格式**：驼峰命名，如`serviceName`

---

## 📝 内容创建问题

### 问题：创建内容时没有"Service"选项
**原因分析**：
1. Document Type没有创建成功
2. Document Type的设置有问题

**解决步骤**：
1. **重新检查Document Type**：
   - 进入Settings → Document Types
   - 确认"Service"存在
   - 检查Alias是否为"service"

2. **检查权限设置**：
   - 编辑Document Type
   - 查看Permissions标签页
   - 可能需要调整"Allow at root"或其他权限

3. **重启Umbraco**：
   ```bash
   # 停止当前服务 (Ctrl+C)
   # 重新启动
   ./start-local.sh
   ```

### 问题：内容保存后API仍然获取不到
**最常见原因**：内容没有发布

**解决步骤**：
1. **确认发布状态**：
   - 在Content中查看内容节点
   - 确认有绿色发布标记
   
2. **重新发布**：
   - 打开内容编辑页面
   - 点击"Save and Publish"（不是Save）
   - 等待发布完成提示

3. **检查内容状态**：
   - 已保存但未发布：橙色图标
   - 已发布：绿色图标

---

## 🔌 API访问问题

### 问题：API返回400或401错误
**症状**：验证脚本显示API认证失败

**解决步骤**：
1. **检查API配置**：
   - Settings → 查找Headless/API选项
   - 确认"Enable Delivery API"已启用
   - 确认API Key为：`southpole-api-key-2024`

2. **检查内容发布状态**：
   - 所有内容必须是"Published"状态
   - 不能只是"Saved"

3. **重新配置API**：
   ```bash
   # 如果找不到API设置，可能需要手动启用
   # 检查appsettings.json中的DeliveryApi配置
   ```

### 问题：API返回空数组 []
**原因**：没有匹配的内容类型

**解决步骤**：
1. **检查URL参数**：
   ```bash
   # 测试获取所有内容
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content"
   
   # 测试特定类型
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content?contentType=service"
   ```

2. **检查contentType参数**：
   - 必须与Document Type的Alias完全匹配
   - 区分大小写：`service`（不是`Service`）

---

## 🔄 系统级问题

### 问题：Umbraco启动失败
**症状**：运行`./start-local.sh`后报错

**常见错误和解决方案**：

1. **端口被占用**：
   ```bash
   # 查找占用端口的进程
   lsof -i :5001
   # 终止进程
   kill -9 [PID]
   ```

2. **数据库文件损坏**：
   ```bash
   # 备份当前数据库
   cp apps/umbraco-simple/umbraco/Data/Umbraco.sqlite.db backup.db
   # 如果有问题可以删除重新初始化
   ```

3. **.NET环境问题**：
   ```bash
   # 确认.NET SDK可用
   /usr/local/share/dotnet/dotnet --version
   ```

### 问题：验证脚本一直显示错误
**解决步骤**：
1. **手动测试每个组件**：
   ```bash
   # 测试Umbraco响应
   curl http://localhost:5001/umbraco
   
   # 测试API健康
   curl http://localhost:5001/umbraco/api/health
   
   # 测试API访问
   curl -H "Api-Key: southpole-api-key-2024" \
        "http://localhost:5001/umbraco/delivery/api/v1/content"
   ```

2. **重新运行验证**：
   ```bash
   ./verify-umbraco-setup.sh
   ```

---

## 📞 获得帮助的最佳方式

### 报告问题时请提供：
1. **具体错误信息**：复制粘贴完整的错误消息
2. **当前进行的步骤**：在第几步遇到问题
3. **屏幕显示内容**：描述当前看到的界面
4. **已尝试的解决方案**：避免重复建议

### 示例问题报告：
```
问题：创建Document Type时找不到Save按钮
当前步骤：正在第5步创建Service Document Type
屏幕显示：Document Type编辑页面，已填写Name和Alias
已尝试：刷新页面，查看页面各个角落
```

---

## 🎯 常用验证命令

```bash
# 检查Umbraco运行状态
ps aux | grep dotnet

# 验证完整设置
./verify-umbraco-setup.sh

# 测试API单独功能
curl -H "Api-Key: southpole-api-key-2024" \
     "http://localhost:5001/umbraco/delivery/api/v1/content"

# 重启Umbraco
# Ctrl+C 停止，然后
./start-local.sh
```

---

**记住**：大多数问题都是由于"内容未发布"或"Alias不匹配"导致的！