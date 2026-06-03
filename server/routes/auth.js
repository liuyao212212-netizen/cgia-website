const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'cgia-secret-change-in-production'

// 登录
router.post('/login', (req, res) => {
  const { username, password } = req.body
  const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username)

  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ error: '用户名或密码错误' })
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, username: admin.username })
})

// 修改密码
router.post('/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body
  const auth = req.headers.authorization

  if (!auth) return res.status(401).json({ error: '未登录' })

  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET)
    const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(decoded.id)

    if (!admin || !bcrypt.compareSync(oldPassword, admin.password)) {
      return res.status(401).json({ error: '原密码错误' })
    }

    const hash = bcrypt.hashSync(newPassword, 10)
    db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hash, admin.id)
    res.json({ message: '密码修改成功' })
  } catch (err) {
    res.status(401).json({ error: 'Token无效' })
  }
})

module.exports = router
