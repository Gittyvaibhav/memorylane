import mongoose from '../config/db.js'

const FileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true, unique: true },
  fileType: { type: String, enum: ['image', 'pdf', 'txt', 'docx', 'csv'] },
  extractedText: { type: String, default: '' },
  tags: [{ type: String }],
  fileSize: { type: Number },
  thumbnailPath: { type: String },
  lastIndexedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('File', FileSchema)
