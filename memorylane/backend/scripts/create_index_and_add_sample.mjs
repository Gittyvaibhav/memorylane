import { Meilisearch } from 'meilisearch'
import dotenv from 'dotenv'

dotenv.config()

const host = process.env.MEILISEARCH_HOST || 'http://127.0.0.1:7700'
const apiKey = process.env.MEILISEARCH_API_KEY || ''
const client = new Meilisearch({ host, apiKey })

const INDEX = 'files'

async function waitForMeili(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      await client.getVersion()
      return true
    } catch (e) {
      console.log('Meilisearch not ready yet, retrying...')
      await new Promise(r => setTimeout(r, 2000))
    }
  }
  throw new Error('Meilisearch did not become ready')
}

async function main() {
  await waitForMeili()
  try {
    const existing = await client.getIndex(INDEX).catch(()=>null)
    if (!existing) {
      console.log('Creating index', INDEX)
      await client.createIndex(INDEX, { primaryKey: '_id' })
    } else {
      console.log('Index already exists')
    }

    const index = client.index(INDEX)
    const sample = { _id: 'sample1', fileName: 'Sample Document', extractedText: 'This is a sample document about coffee and Berlin.' , tags: ['sample','coffee','berlin'] }
    const res = await index.addDocuments([sample])
    console.log('Added sample doc, updateId:', res)

    // allow indexing to complete
    await new Promise(r => setTimeout(r, 2000))

    const search = await index.search('coffee')
    console.log('Search results for "coffee":', JSON.stringify(search.hits, null, 2))
  } catch (err) {
    console.error('Error creating index or adding sample:', err)
    process.exit(1)
  }
}

main()
