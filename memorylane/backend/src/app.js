import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import redis from './config/redis.js'
import authRoutes from './routes/authRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import searchRoutes from './routes/searchRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import { watchFolders } from './services/watcherService.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/search', searchRoutes)

app.get('/api/stats', async (req, res) => {
  res.json({ success: true, data: { message: 'stats not implemented' } })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

async function start() {
  await connectDB()
  // start watcher based on env
  const watched = (process.env.WATCHED_FOLDERS || '').split(',').map(s => s.trim()).filter(Boolean)
  if (watched.length) watchFolders(watched)

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

start().catch(err => { console.error(err); process.exit(1) })
