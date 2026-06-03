const express = require('express')
const db = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// 公开 API - 获取活动列表
router.get('/public', (req, res) => {
  const activities = db.prepare(
    'SELECT id, title, description, image, date, location, status FROM activities WHERE published = 1 ORDER BY date DESC'
  ).all()
  res.json(activities)
})

// 管理 API - 获取所有活动
router.get('/', authMiddleware, (req, res) => {
  const activities = db.prepare('SELECT * FROM activities ORDER BY date DESC').all()
  res.json(activities.map(a => ({ ...a, published: !!a.published })))
})

// 管理 API - 新增活动
router.post('/', authMiddleware, (req, res) => {
  const { title, description, image, date, location, status, published } = req.body
  if (!title) return res.status(400).json({ error: '活动标题为必填项' })
  const result = db.prepare(
    'INSERT INTO activities (title, description, image, date, location, status, published) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(title, description || '', image || '', date || '', location || '', status || 'upcoming', published !== false ? 1 : 0)
  res.json({ id: result.lastInsertRowid, message: '添加成功' })
})

// 管理 API - 更新活动
router.put('/:id', authMiddleware, (req, res) => {
  const { title, description, image, date, location, status, published } = req.body
  db.prepare(
    'UPDATE activities SET title=?, description=?, image=?, date=?, location=?, status=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).run(title, description || '', image || '', date || '', location || '', status || 'upcoming', published !== false ? 1 : 0, req.params.id)
  res.json({ message: '更新成功' })
})

// 管理 API - 删除活动
router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM activities WHERE id = ?').run(req.params.id)
  res.json({ message: '删除成功' })
})

module.exports = router
