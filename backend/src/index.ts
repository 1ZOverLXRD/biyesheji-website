import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import path from 'path'
import fs from 'fs'
import uploadRoutes from './routes/upload'
import submitRoutes from './routes/submit'

// Load .env if exists
config({ path: path.resolve(__dirname, '../.env') })

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve frontend static files (../dist from backend/)
const frontendDist = path.resolve(__dirname, '../../dist')
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist))
  // SPA fallback: serve index.html for unknown routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'))
  })
}

app.use('/api/upload', uploadRoutes)
app.use('/api/submit', submitRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'ok' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
