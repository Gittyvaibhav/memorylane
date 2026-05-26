import mongoose from '../config/db.js'

const SearchLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  query: { type: String, required: true },
  resultCount: { type: Number, default: 0 },
  searchedAt: { type: Date, default: Date.now }
})

export default mongoose.model('SearchLog', SearchLogSchema)
