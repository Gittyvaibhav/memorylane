import arcjet, { shield, rateLimit, detectBot } from '@arcjet/node'
import dotenv from 'dotenv'

dotenv.config()

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: 'LIVE' }),
    detectBot({ mode: 'LIVE', allow: ['CATEGORY:SEARCH_ENGINE'] }),
    rateLimit({ mode: 'LIVE', window: '1m', max: 10, match: '/api/auth/*' }),
    rateLimit({ mode: 'LIVE', window: '1m', max: 60, match: '/api/search' })
  ]
})

export default aj
