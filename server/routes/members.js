const express = require('express')
const db = require('../db')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// 公开 API - 获取会员列表
router.get('/public', (req, res) => {
  const members = db.prepare(
    'SELECT id, name, company, type, certificate_image FROM members WHERE published = 1 ORDER BY id DESC'
  ).all()
  res.json(members)
})

// 管理 API - 获取所有会员
router.get('/', authMiddleware, (req, res) => {
  const members = db.prepare('SELECT * FROM members ORDER BY id DESC').all()
  res.json(members.map(m => ({ ...m, published: !!m.published })))
})

// 管理 API - 新增会员
router.post('/', authMiddleware, (req, res) => {
  const { name, company, type, certificate_image, published } = req.body
  if (!name) return res.status(400).json({ error: '会员名称为必填项' })
  const result = db.prepare(
    'INSERT INTO members (name, company, type, certificate_image, published) VALUES (?, ?, ?, ?, ?)'
  ).run(name, company || '', type || 'company', certificate_image || '', published !== false ? 1 : 0)
  res.json({ id: result.lastInsertRowid, message: '添加成功' })
})

// 管理 API - 更新会员
router.put('/:id', authMiddleware, (req, res) => {
  const { name, company, type, certificate_image, published } = req.body
  db.prepare(
    'UPDATE members SET name=?, company=?, type=?, certificate_image=?, published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?'
  ).run(name, company || '', type || 'company', certificate_image || '', published !== false ? 1 : 0, req.params.id)
  res.json({ message: '更新成功' })
})

// 管理 API - 删除会员
router.delete('/:id', authMiddleware, (req, res) => {
  db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id)
  res.json({ message: '删除成功' })
})

module.exports = router
