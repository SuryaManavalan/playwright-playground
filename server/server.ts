import express = require('express')

const app = express()
app.use(express.json())

let items: { id: number; text: string }[] = []
let id = 1

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.get('/api/items', (_req, res) => res.json(items))
app.post('/api/items', (req, res) => {
    console.log('req.body:', req.body)
  const text = String(req.body?.text ?? '').trim()
  if (!text) return res.status(400).json({ error: 'text required' })
  const item = { id: id++, text }
  items.push(item)
  console.log('POST /api/items', { item })
  res.status(201).json(item)
})

const port = 4000
app.listen(port, () => console.log(`API running on http://localhost:${port}`))
