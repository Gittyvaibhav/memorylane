import MeiliSearch from 'meilisearch'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700'
const apiKey = process.env.MEILISEARCH_API_KEY || ''

const client = new MeiliSearch({ host, apiKey })

export default client
