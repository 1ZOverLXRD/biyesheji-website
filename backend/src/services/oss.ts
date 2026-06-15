import OSS from 'ali-oss'

// Initialize client from env vars
let client: OSS | null = null

function getClient(): OSS {
  if (!client) {
    client = new OSS({
      region: process.env.OSS_REGION || 'oss-cn-hangzhou',
      accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
      bucket: process.env.OSS_BUCKET || ''
    })
  }
  return client
}

// Upload a single image
export async function uploadImage(file: Express.Multer.File): Promise<string> {
  const date = new Date().toISOString().split('T')[0]
  const ext = file.originalname.split('.').pop() || 'jpg'
  const filename = `submissions/${date}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const ossClient = getClient()
  const result = await ossClient.put(filename, file.buffer)
  return result.url
}

// Upload multiple images
export async function uploadImages(files: Express.Multer.File[]): Promise<string[]> {
  return Promise.all(files.map(f => uploadImage(f)))
}
