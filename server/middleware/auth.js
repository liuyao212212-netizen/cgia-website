const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'cgia-secret-change-in-production'

module.exports = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: '未登录' })

  try {
    const decoded = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET)
    req.admin = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token无效或已过期' })
  }
}
