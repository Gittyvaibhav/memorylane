import fs from 'fs'
import pdf from 'pdf-parse'

/**
 * Extract text and metadata from a PDF buffer or file path
 * @param {Buffer|string} input
 * @returns {Promise<{text: string, numpages: number, info: object}>}
 */
export async function parsePDF(input) {
  try {
    let dataBuffer
    if (typeof input === 'string') dataBuffer = fs.readFileSync(input)
    else dataBuffer = input
    const data = await pdf(dataBuffer)
    return { text: data.text || '', numpages: data.numpages || 0, info: data.info || {} }
  } catch (err) {
    return { text: '', numpages: 0, info: {} }
  }
}
