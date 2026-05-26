import express from 'express'
import { listFiles, getFile, deleteFile, addWatch } from '../controllers/fileController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', requireAuth, listFiles)
router.get('/:id', requireAuth, getFile)
router.delete('/:id', requireAuth, deleteFile)
router.post('/watch', requireAuth, addWatch)

export default router
