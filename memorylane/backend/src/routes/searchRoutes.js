import express from 'express'
import { doSearch } from '../controllers/searchController.js'
import { arcjetProtect } from '../middleware/arcjetMiddleware.js'

const router = express.Router()

router.get('/', arcjetProtect, doSearch)

export default router
