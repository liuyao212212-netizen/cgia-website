const express = require('express')
const path = require('path')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')

const db = require('./db')
const authRoutes = require('./routes/auth')
const newsRoutes = require('./routes/news')
const membersRoutes = require('./routes/members')
const activitiesRoutes = require('./routes/activities')

const app = express()
const PORT = process.env.PORT || 3001

// 中间件
app.use(cors())
app.use(express.json())

// 静态文件 - 上传的图片
const uploadDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })
app.use('/uploads', express.static(uploadDir))

// Multer 配置 - 图片上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, allowed.includes(ext))
  }
})

// 图片上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: '请选择文件' })
  const url = `/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// API 路由
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/members', membersRoutes)
app.use('/api/activities', activitiesRoutes)

// 管理后台页面
app.use('/admin', express.static(path.join(__dirname, 'admin')))
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'))
})

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 CGIA Server running on http://0.0.0.0:${PORT}`)
  console.log(`📡 API: http://0.0.0.0:${PORT}/api`)
  console.log(`🔧 Admin: http://0.0.0.0:${PORT}/admin`)
})
