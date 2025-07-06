# Docker PostgreSQL 数据库安装指南

## 1. 安装 Docker

### macOS 安装 Docker Desktop：
1. 访问 https://docs.docker.com/desktop/install/mac/
2. 下载 Docker Desktop for Mac
3. 安装并启动 Docker Desktop

### 验证安装：
```bash
docker --version
```

## 2. 启动 PostgreSQL 容器

```bash
# 拉取并启动 PostgreSQL 容器
docker run --name postgres-cms \
  -e POSTGRES_PASSWORD=southpole_dev_2024 \
  -e POSTGRES_USER=southpole_user \
  -e POSTGRES_DB=southpole_cms \
  -p 5432:5432 \
  -d postgres:16
```

## 3. 验证数据库连接

```bash
# 检查容器状态
docker ps

# 连接到数据库
docker exec -it postgres-cms psql -U southpole_user -d southpole_cms
```

## 4. 初始化数据库

```bash
cd apps/cms-backend

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库模式
npm run db:push

# 填充示例数据
npm run seed
```

## 5. 容器管理命令

```bash
# 停止容器
docker stop postgres-cms

# 启动容器
docker start postgres-cms

# 删除容器（注意：会丢失数据）
docker rm postgres-cms

# 查看容器日志
docker logs postgres-cms
```

## 6. 数据持久化（可选）

如果要持久化数据，可以创建数据卷：

```bash
docker run --name postgres-cms \
  -e POSTGRES_PASSWORD=southpole_dev_2024 \
  -e POSTGRES_USER=southpole_user \
  -e POSTGRES_DB=southpole_cms \
  -p 5432:5432 \
  -v postgres_data:/var/lib/postgresql/data \
  -d postgres:16
```

## 环境变量配置

确保 `apps/cms-backend/.env` 文件包含：
```
DATABASE_URL="postgresql://southpole_user:southpole_dev_2024@localhost:5432/southpole_cms?schema=public"
```