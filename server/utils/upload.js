import { existsSync, mkdirSync } from 'fs'
import multer from 'multer'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const _dirname = dirname(fileURLToPath(import.meta.url))

const upload = multer({
    storage: multer.diskStorage({
        destination: async (req, _, cb) => {
        const roomId = req.headers['x-chat-id']
        let dirPath = join(_dirname, '../files', roomId)
        if (roomId === 'avatar') {
          dirPath = join(_dirname, '../files/avatars')
        }
  
        if (!existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true })
        }
  
        cb(null, dirPath)
      },
      filename: (_, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '')}`
        cb(null, fileName)
      }
    })
  })
  
  export default upload