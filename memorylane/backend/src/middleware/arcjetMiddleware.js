import aj from '../config/arcjet.js'

export const arcjetProtect = async (req, res, next) => {
  try {
    const decision = await aj.protect(req)
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) return res.status(429).json({ success: false, message: 'Too many requests. Please slow down.' })
      if (decision.reason.isBot()) return res.status(403).json({ success: false, message: 'Bot traffic not allowed.' })
      if (decision.reason.isShield()) return res.status(403).json({ success: false, message: 'Suspicious request blocked.' })
    }
    next()
  } catch (err) {
    console.error('Arcjet error', err)
    next()
  }
}
