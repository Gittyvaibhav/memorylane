import FileModel from '../models/File.model.js'
import meiliClient from '../config/meilisearch.js'
import fs from 'fs'

const INDEX_NAME = 'files'

async function ensureIndex() {
  try {
    const idx = await meiliClient.getIndex(INDEX_NAME)
    return idx
  } catch (err) {
    return await meiliClient.createIndex(INDEX_NAME, { primaryKey: '_id' })
  }
}

function generateTagsFromText(text) {
  if (!text) return []
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3)
  const freq = {}
  for (const w of words) freq[w] = (freq[w] || 0) + 1
  return Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,6).map(e=>e[0])
}

/**
 * Index or update a file: save to Mongo and Meilisearch
 * @param {object} fileObj { fileName, filePath, fileType, extractedText, fileSize }
 */
export async function indexFile(fileObj) {
  await ensureIndex()
  const tags = generateTagsFromText(fileObj.extractedText || '')
  const data = { ...fileObj, tags, lastIndexedAt: new Date() }

  // upsert into Mongo
  const doc = await FileModel.findOneAndUpdate({ filePath: data.filePath }, data, { upsert: true, new: true, setDefaultsOnInsert: true })

  // push to Meilisearch
  const index = meiliClient.index(INDEX_NAME)
  await index.addDocuments([{ _id: doc._id.toString(), fileName: doc.fileName, extractedText: doc.extractedText, tags: doc.tags, fileType: doc.fileType, filePath: doc.filePath }])
  return doc
}

export async function removeFile(filePath) {
  // remove from mongo and meili
  const doc = await FileModel.findOneAndDelete({ filePath })
  if (!doc) return
  const index = meiliClient.index(INDEX_NAME)
  try { await index.deleteDocument(doc._id.toString()) } catch (e) {}
}
