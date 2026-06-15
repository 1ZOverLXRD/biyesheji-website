import nodemailer from 'nodemailer'

export interface SubmitRequestData {
  name: string
  contact: string
  projectTitle: string
  description: string
  budget?: number
  timeline?: string
  images?: string[]
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtpdm.aliyun.com',
    port: parseInt(process.env.EMAIL_PORT || '465', 10),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || ''
    }
  })
}

function formatEmailHtml(data: SubmitRequestData): string {
  const imageSection = data.images && data.images.length
    ? `<p><strong>附件图片:</strong></p>${data.images.map(url => `<img src="${url}" style="max-width:400px;margin:8px 0;display:block" />`).join('')}`
    : ''

  return `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #18181b;">📋 新需求提交 - ${data.projectTitle}</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #e4e4e7; color: #52525b;">姓名</td><td style="padding: 8px; border-bottom: 1px solid #e4e4e7;">${data.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e4e4e7; color: #52525b;">联系方式</td><td style="padding: 8px; border-bottom: 1px solid #e4e4e7;">${data.contact}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #e4e4e7; color: #52525b;">项目标题</td><td style="padding: 8px; border-bottom: 1px solid #e4e4e7;">${data.projectTitle}</td></tr>
        ${data.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e4e4e7; color: #52525b;">预算</td><td style="padding: 8px; border-bottom: 1px solid #e4e4e7;">${data.budget}元</td></tr>` : ''}
        ${data.timeline ? `<tr><td style="padding: 8px; border-bottom: 1px solid #e4e4e7; color: #52525b;">期望时间</td><td style="padding: 8px; border-bottom: 1px solid #e4e4e7;">${data.timeline}</td></tr>` : ''}
      </table>
      <div style="background: #fafafa; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <h3 style="margin: 0 0 8px; font-size: 14px; color: #52525b;">需求描述</h3>
        <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${data.description}</p>
      </div>
      ${imageSection}
      <p style="color: #a1a1aa; font-size: 12px; margin-top: 24px;">此邮件由代做毕设展示站自动发送</p>
    </div>
  `
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function sendNewRequestNotification(data: SubmitRequestData): Promise<void> {
  const toEmail = process.env.NOTIFY_EMAIL || ''
  if (!toEmail) {
    console.warn('NOTIFY_EMAIL not configured, skipping email notification')
    return
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const transporter = createTransporter()
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER || toEmail,
        to: toEmail,
        subject: `【代做毕设】新需求提交 - ${data.projectTitle}`,
        html: formatEmailHtml(data)
      })
      console.log('Email notification sent successfully')
      return
    } catch (error) {
      lastError = error as Error
      console.warn(`Email attempt ${attempt + 1} failed:`, error)
      if (attempt < 2) {
        await sleep(Math.pow(2, attempt) * 1000)
      }
    }
  }

  console.error('Email notification failed after 3 attempts:', lastError)
  throw lastError
}
