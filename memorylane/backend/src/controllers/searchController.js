import { search } from '../services/searchService.js'

export const doSearch = async (req, res, next) => {
  try {
    const q = req.query.q || ''
    if (!q) return res.status(400).json({ success: false, message: 'q required' })
    const results = await search(q, req.query)
    res.json({ success: true, data: { results } })
  } catch (err) { next(err) }
}
