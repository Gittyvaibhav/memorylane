import FileModel from '../models/File.model.js'
import { validationResult } from 'express-validator'
import { removeFile } from '../services/indexService.js'

export const listFiles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || '1')
    const limit = parseInt(req.query.limit || '20')
    const skip = (page - 1) * limit
    const files = await FileModel.find().sort({ lastIndexedAt: -1 }).skip(skip).limit(limit)
    const total = await FileModel.countDocuments()
    res.json({ success: true, data: { results: files, total } })
  } catch (err) { next(err) }
}

export const getFile = async (req, res, next) => {
  try {
    const file = await FileModel.findById(req.params.id)
    if (!file) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: { file } })
  } catch (err) { next(err) }
}

export const deleteFile = async (req, res, next) => {
  try {
    const file = await FileModel.findById(req.params.id)
    if (!file) return res.status(404).json({ success: false, message: 'Not found' })
    await removeFile(file.filePath)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) { next(err) }
}

export const addWatch = async (req, res, next) => {
  try {
    const { path } = req.body
    if (!path) return res.status(400).json({ success: false, message: 'path required' })
    // For now, just echo back; watcher service runs at startup
    res.json({ success: true, data: { watched: path } })
  } catch (err) { next(err) }
}
