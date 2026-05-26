import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config()

const REDIS_URL = process.env.REDIS_URL

let client
if (REDIS_URL) client = new Redis(REDIS_URL)
else client = new Redis()

client.on('connect', () => console.log('Redis connected'))
client.on('error', (err) => console.error('Redis error', err))

export default client
