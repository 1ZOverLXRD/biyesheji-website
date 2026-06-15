import { Router } from 'express'
import { sendNewRequestNotification as sendEmail } from '../services/email'
import { sendNewRequestNotification as sendDingtalk } from '../services/dingtalk'

const router = Router()

interface SubmitBody {
  name: string
  contact: string
  projectTitle: string
  description: string
  budget?: number
  timeline?: string
  imageUrls?: string[]
}

// 校验请求体，返回错误列表
function validateBody(body: any): string[] {
  const errors: string[] = []
  if (!body.name?.trim()) errors.push('name is required')
  if (!body.contact?.trim()) errors.push('contact is required')
  if (!body.projectTitle?.trim()) errors.push('projectTitle is required')
  if (!body.description?.trim()) errors.push('description is required')
  return errors
}

router.post('/', async (req, res) => {
  try {
    const errors = validateBody(req.body)
    if (errors.length > 0) {
      res.status(400).json({ success: false, message: 'Validation failed', errors })
      return
    }

    const data = {
      name: req.body.name,
      contact: req.body.contact,
      projectTitle: req.body.projectTitle,
      description: req.body.description,
      budget: req.body.budget ? Number(req.body.budget) : undefined,
      timeline: req.body.timeline,
      images: req.body.imageUrls
    }

    // 并行发送通知，不等待结果直接响应
    Promise.all([
      sendEmail(data).catch(e => console.error('Email failed:', e)),
      sendDingtalk(data).catch(e => console.error('DingTalk failed:', e))
    ]).catch(e => console.error('Notification error:', e))

    res.json({ success: true, message: '提交成功！我会尽快与你联系。' })
  } catch (error) {
    console.error('Submit error:', error)
    res.status(500).json({ success: false, message: '请求处理失败', error: String(error) })
  }
})

export default router
