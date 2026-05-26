import mongoose from '../config/db.js'

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  watchedFolders: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date }
})

export default mongoose.model('User', UserSchema)
