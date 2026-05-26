import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'
import { indexFile, removeFile } from './indexService.js'
import { extractTextFromImage } from './ocrService.js'
import { parsePDF } from './pdfService.js'

const DEBOUNCE_MS = 500
const pending = new Map()

function debounceProcess(filePath, cb) {
  if (pending.has(filePath)) clearTimeout(pending.get(filePath))
  const t = setTimeout(() => { pending.delete(filePath); cb() }, DEBOUNCE_MS)
  pending.set(filePath, t)
}

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  if (['.png', '.jpg', '.jpeg'].includes(ext)) return 'image'
  if (ext === '.pdf') return 'pdf'
  if (ext === '.txt') return 'txt'
  if (ext === '.csv') return 'csv'
  if (ext === '.docx') return 'docx'
  return 'unknown'
}

export function watchFolders(folders = []) {
  if (!folders || folders.length === 0) return
  const watcher = chokidar.watch(folders, { persistent: true, ignoreInitial: false, depth: 2 })

  watcher.on('add', (filePath) => debounceProcess(filePath, async () => handleFileAdd(filePath)))
  watcher.on('change', (filePath) => debounceProcess(filePath, async () => handleFileChange(filePath)))
  watcher.on('unlink', (filePath) => debounceProcess(filePath, async () => handleFileDelete(filePath)))

  console.log('Watching folders:', folders)
  return watcher
}

async function handleFileAdd(filePath) {
  try {
    const stat = fs.statSync(filePath)
    const fileType = getFileType(filePath)
    let extractedText = ''
    if (fileType === 'image') {
      const r = await extractTextFromImage(filePath)
      extractedText = r.text
    } else if (fileType === 'pdf') {
      const r = await parsePDF(filePath)
      extractedText = r.text
    } else if (fileType === 'txt' || fileType === 'csv') {
      extractedText = fs.readFileSync(filePath, 'utf8')
    }

    await indexFile({ fileName: path.basename(filePath), filePath, fileType, extractedText, fileSize: stat.size })
    console.log('Indexed:', filePath)
  } catch (err) {
    console.error('Error indexing file', filePath, err)
  }
}

async function handleFileChange(filePath) {
  await handleFileAdd(filePath)
}

async function handleFileDelete(filePath) {
  try {
    await removeFile(filePath)
    console.log('Removed from index:', filePath)
  } catch (err) {
    console.error('Error removing file', filePath, err)
  }
}
