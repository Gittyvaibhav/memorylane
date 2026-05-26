import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

/**
 * Connect to MongoDB using mongoose
 */
export async function connectDB() {
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set')
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error', err)
    throw err
  }
}

export default mongoose
