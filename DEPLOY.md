# CGIA 官网阿里云部署指南

## 架构总览

```
阿里云 ECS (47.239.7.229)
├── Nginx
│   ├── / → 静态前端 (dist/)
│   ├── /api/ → 反向代理到 Node.js 后端
│   └── /admin/ → 管理后台
│   └── /uploads/ → 上传的图片
├── Node.js (PM2 守护)
│   └── server/index.js (Express API)
└── SQLite 数据库 (server/cgia.db)
```

---

## 第一步：服务器环境准备

SSH 登录你的阿里云服务器后，依次执行：

### 1. 安装 Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt-get install -y nodejs
node -v  # 确认输出 v22.x.x
```

### 2. 安装 PM2（进程守护）

```bash
sudo npm install -g pm2
```

### 3. 安装 Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx
nginx -v  # 确认安装成功
```

### 4. 创建项目目录

```bash
sudo mkdir -p /var/www/cgia
sudo chown -R $USER:$USER /var/www/cgia
```

---

## 第二步：上传代码

在你本地电脑终端执行：

```bash
# 1. 把代码上传到服务器（替换你的实际密码）
scp -r ./cgia-website/server root@47.239.7.229:/var/www/cgia/
scp -r ./cgia-website/dist root@47.239.7.229:/var/www/cgia/
```

或者用 Git 在服务器上拉代码：

```bash
# 在服务器上执行
cd /var/www/cgia
git clone https://github.com/liuyao212212-netizen/cgia-website.git .
```

---

## 第三步：启动后端服务

在服务器上执行：

```bash
cd /var/www/cgia/server

# 安装依赖
npm install --production

# 初始化数据库（首次部署）
node -e "
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('admin123', 10);
const Database = require('better-sqlite3');
const db = new Database('cgia.db');
db.pragma('journal_mode = WAL');
db.exec('CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, tags TEXT DEFAULT \"\", published INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
db.exec('CREATE TABLE IF NOT EXISTS members (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, company TEXT DEFAULT \"\", type TEXT DEFAULT \"company\", certificate_image TEXT DEFAULT \"\", published INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
db.exec('CREATE TABLE IF NOT EXISTS activities (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT DEFAULT \"\", image TEXT DEFAULT \"\", date TEXT DEFAULT \"\", location TEXT DEFAULT \"\", status TEXT DEFAULT \"upcoming\", published INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
db.exec('CREATE TABLE IF NOT EXISTS admins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)');
db.prepare('INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)').run('admin', hash);
console.log('DB 初始化完成！');
db.close();
"

# 用 PM2 启动服务
pm2 start index.js --name cgia-api
pm2 save
pm2 startup  # 开机自启，按提示执行输出的命令
```

验证后端是否启动：

```bash
curl http://localhost:3001/api/health
# 应返回 {"status":"ok","time":"..."}
```

---

## 第四步：配置 Nginx

### 1. 创建 Nginx 配置文件

```bash
sudo nano /etc/nginx/sites-available/cgia
```

粘贴以下内容：

```nginx
server {
    listen 80;
    server_name 47.239.7.229;  # 有域名改成域名，如 cgia.geo-innovation.com

    # 前端静态文件
    root /var/www/cgia/dist;
    index index.html;

    # 前端路由 - SPA 都指向 index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 60s;
    }

    # 管理后台
    location /admin/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 上传的图片
    location /uploads/ {
        proxy_pass http://127.0.0.1:3001;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 1000;

    # 静态资源缓存
    location /assets/ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. 启用配置

```bash
sudo ln -s /etc/nginx/sites-available/cgia /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # 删掉默认站点（如果不需要）
sudo nginx -t  # 测试配置
sudo systemctl reload nginx
```

---

## 第五步：修改前端配置（重要！）

部署到阿里云后，前端需要调整 base 路径：

### 方案 A：用 IP 直接访问（推荐先这样）

1. 修改 `vite.config.ts`，将 `base` 改为 `'/'`
2. 重新 build：`cd cgia-website && npx tsc -b && npx vite build`
3. 上传新的 dist 到服务器：`scp -r dist root@47.239.7.229:/var/www/cgia/`

### 方案 B：绑定域名（推荐正式上线用）

1. 阿里云域名解析 → A 记录指向 47.239.7.229
2. Nginx 配置里 `server_name` 改为域名
3. 配置 SSL（免费 Let's Encrypt）：

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

4. 修改 `vite.config.ts` 的 `base` 为 `'/'`
5. 重新 build 并上传 dist

---

## 第六步：配置阿里云安全组

在阿里云控制台：

1. ECS → 安全组 → 入方向规则
2. 添加规则：
   - **80 端口**（HTTP）→ 允许 0.0.0.0/0
   - **443 端口**（HTTPS）→ 允许 0.0.0.0/0
   - **22 端口**（SSH）→ 允许你的办公 IP

---

## 日常使用

### 📰 每天发布资讯速递

1. 打开浏览器访问：`http://47.239.7.229/admin`
2. 用 `admin` / `admin123` 登录
3. 点"资讯管理" → "添加资讯"
4. 填日期、标题，上传海报图片，选标签
5. 点"发布" → 前端自动更新，无需改代码

### 🏅 更新会员证书

1. 管理后台 → "会员管理"
2. 添加会员 → 填名字、公司、上传证书图片
3. 发布 → 前端自动显示

### 🎉 发布活动

1. 管理后台 → "活动管理"
2. 填标题、描述、时间地点、上传封面图
3. 发布 → 前端自动显示

### 🔒 修改管理员密码

1. 管理后台 → "系统设置"
2. 输入新密码 → 保存

---

## 常用运维命令

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs cgia-api

# 重启服务
pm2 restart cgia-api

# 更新代码后重新部署
cd /var/www/cgia
git pull origin main
cd /var/www/cgia/server && npm install --production
cd /var/www/cgia && npm install && npx tsc -b && npx vite build
pm2 restart cgia-api
sudo systemctl reload nginx

# 备份数据库
cp /var/www/cgia/server/cgia.db /var/www/cgia/server/cgia.db.bak.$(date +%Y%m%d)
```

---

## 文件结构

```
/var/www/cgia/
├── dist/                    # 前端构建产物
│   ├── index.html
│   └── assets/
├── server/                  # 后端 API
│   ├── index.js             # 入口
│   ├── db.js                # 数据库
│   ├── cgia.db              # SQLite 数据库文件
│   ├── routes/              # API 路由
│   │   ├── auth.js
│   │   ├── news.js
│   │   ├── members.js
│   │   └── activities.js
│   ├── middleware/
│   │   └── auth.js          # JWT 认证
│   ├── admin/
│   │   └── index.html       # 管理后台 SPA
│   ├── uploads/             # 上传的图片
│   └── package.json
└── (vite.config.ts 等源码不需要部署)
```

---

## ⚠️ 注意事项

1. **数据库备份**：SQLite 文件在 `server/cgia.db`，定期备份！
2. **图片存储**：目前图片存在服务器 `server/uploads/` 目录。如果量大可以接阿里云 OSS
3. **HTTPS**：生产环境强烈建议配 SSL 证书
4. **修改密码**：首次部署后务必修改默认密码 `admin123`
5. **防火墙**：只开放 80/443 端口，22 端口限制 IP
