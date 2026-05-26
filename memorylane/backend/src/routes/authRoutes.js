import express from 'express'
import { body } from 'express-validator'
import { register, login, me } from '../controllers/authController.js'
import { arcjetProtect } from '../middleware/arcjetMiddleware.js'

const router = express.Router()

router.post('/register', arcjetProtect, [body('email').isEmail(), body('password').isLength({ min: 6 })], register)
router.post('/login', arcjetProtect, [body('email').isEmail(), body('password').exists()], login)
router.get('/me', me)

export default router
