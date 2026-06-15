import { Router } from 'express'
import multer from 'multer'
import { uploadImages } from '../services/oss'

const router = Router()

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5 // max 5 files
  },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only jpg, png, gif, webp allowed.'))
    }
  }
})

// POST /api/upload
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[]
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'No files uploaded' })
      return
    }

    const urls = await uploadImages(files)
    res.json({ success: true, data: { urls } })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ success: false, message: 'Upload failed', error: String(error) })
  }
})

export default router
