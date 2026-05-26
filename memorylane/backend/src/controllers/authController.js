import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/User.model.js'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: 'Invalid input', error: errors.array() })

    const { email, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ success: false, message: 'User already exists' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    const user = await User.create({ email, passwordHash })

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    res.json({ success: true, data: { token } })
  } catch (err) { next(err) }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(400).json({ success: false, message: 'Invalid credentials' })

    user.lastLoginAt = new Date()
    await user.save()

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    res.json({ success: true, data: { token } })
  } catch (err) { next(err) }
}

export const me = async (req, res, next) => {
  try {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).json({ success: false, message: 'Unauthorized' })
    const token = auth.split(' ')[1]
    const payload = jwt.verify(token, JWT_SECRET)
    const user = await User.findById(payload.id).select('-passwordHash')
    res.json({ success: true, data: { user } })
  } catch (err) { next(err) }
}
