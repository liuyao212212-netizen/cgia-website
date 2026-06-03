const express = require('express')
const db = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// 公开 API - 获取资讯列表（已发布，按日期倒序）
router.get('/public', (req, res) => {
  const posts = db.prepare(
    'SELECT id, date, title, image, tags FROM news WHERE published = 1 ORDER BY date DESC'
  ).all()
  // tags 是逗号分隔字符串，转为数组
  const result = posts.map(p => ({
    ...p,
    tags: p.tags ? p.tags.split(',').filter(Boolean) : []
  }))
  res.json(result)
})

// 管理 API - 获取所有资讯（含未发布）
router.get('/', authMiddleware, (req, res) => {
  const posts = db.prepare(
    'SELECT * FROM news ORDER BY date DESC'
  ).all()
  const result = posts.map(p => ({
    ...p,
    tags: p.tags ? p.tags.split(',').filter(Boolean) : [],
    published: !!p.published
  }))
  res.json(result)
})

// 管理 API - 获取单条
router.get('/:id', authMiddleware, (req, res) => {
  const post = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ error: '未找到' })
  res.json({
    ...post,
    tags: post.tags ? post.tags.split(',').filter(Boolean) : [],
    published: !!post.published
  })
})

// 管理 API - 新增
router.post('/', authMiddleware, (req, res) => {
  const { date, title, image, tags, published } = req.body
  if (!date || !title || !image) {
    return res.status(400).json({ error: '日期、标题和图片为必填项' })
  }
  const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '')
  const result = db.prepare(
    'INSERT INTO news (date, title, image, tags, published) VALUES (?, ?, ?, ?, ?)'
  ).run(date, title, image, tagsStr, published !== false ? 1 : 0)
  res.json({ id: result.lastInsertRowid, message: '添加成功' })
})

// 管理 API - 更新
router.put('/:id', authMiddleware, (req, res) => {
  const { date, title, image, tags, published } = req.body
  const tagsStr = Array.isArray(tags) ? tags.join(',') : (tags || '')
  db.prepare(
    'UPDATE news SET date=?, title=?, image=?, tags=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).run(date, title, image, tagsStr, published !== false ? 1 : 0, req.params.id)
  res.json({ message: '更新成功' })
})

// 管理 API - 删除
router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id)
  res.json({ message: '删除成功' })
})

module.exports = router
