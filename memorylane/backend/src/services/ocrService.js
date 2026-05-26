import { createWorker } from 'tesseract.js'

/**
 * Extract text from an image file path using tesseract.js
 * @param {string} filePath
 * @returns {Promise<{text: string, confidence: number}>}
 */
export async function extractTextFromImage(filePath) {
  const worker = createWorker()
  try {
    await worker.load()
    await worker.loadLanguage('eng+hin')
    await worker.initialize('eng+hin')
    const { data } = await worker.recognize(filePath)
    const text = data?.text || ''
    const confidence = data?.confidence || 0
    await worker.terminate()
    return { text, confidence }
  } catch (err) {
    try { await worker.terminate() } catch (e) {}
    return { text: '', confidence: 0 }
  }
}
