# 数据库安装设置指南

## 🔧 macOS 安装 PostgreSQL

### 方法1: 使用提供的脚本（推荐）
```bash
./setup-database.sh
```

### 方法2: 手动安装

#### 1. 安装 Homebrew（如果未安装）
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. 安装 PostgreSQL
```bash
brew install postgresql@16
brew services start postgresql@16
```

#### 3. 创建数据库和用户
```bash
# 进入 PostgreSQL 控制台
psql postgres

# 在 psql 控制台中执行以下命令：
CREATE USER southpole_user WITH PASSWORD 'southpole_dev_2024';
CREATE DATABASE southpole_cms OWNER southpole_user;
GRANT ALL PRIVILEGES ON DATABASE southpole_cms TO southpole_user;
\q
```

#### 4. 更新 .env 文件
编辑 `apps/cms-backend/.env` 文件，设置数据库连接：
```
DATABASE_URL="postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public"
```

## 🗄️ 初始化数据库

```bash
cd apps/cms-backend

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 填充示例数据
npm run seed
```

## 🧪 测试连接

```bash
# 测试数据库连接
psql -U southpole_user -d southpole_cms -h localhost

# 或者启动 Prisma Studio 查看数据
npm run db:studio
```

## 🚨 常见问题

### 1. PostgreSQL 服务未启动
```bash
brew services restart postgresql@16
```

### 2. 权限问题
```bash
# 重置用户密码
psql postgres
ALTER USER southpole_user WITH PASSWORD 'southpole_dev_2024';
```

### 3. 端口被占用
检查 5432 端口：
```bash
lsof -i :5432
```

## 🔒 安全提示

- 这是开发环境配置，生产环境请使用强密码
- 不要将真实的数据库密码提交到 Git
- 使用环境变量管理敏感信息