import axios from 'axios'

export interface SubmitRequestData {
  name: string
  contact: string
  projectTitle: string
  description: string
  budget?: number
  timeline?: string
  images?: string[]
}

function formatMarkdown(data: SubmitRequestData): string {
  const imageLinks = data.images && data.images.length
    ? `\n\n### 附件图片\n${data.images.map((url, i) => `![图片${i + 1}](${url})`).join('\n')}`
    : ''

  return [
    '## 📋 新需求提交',
    '---',
    '| 字段 | 内容 |',
    '| --- | --- |',
    `| **姓名** | ${data.name} |`,
    `| **联系方式** | ${data.contact} |`,
    `| **项目标题** | ${data.projectTitle} |`,
    data.budget ? `| **预算** | ${data.budget}元 |` : '',
    data.timeline ? `| **期望时间** | ${data.timeline} |` : '',
    `| **需求描述** | ${data.description.slice(0, 200)}${data.description.length > 200 ? '...' : ''} |`,
    imageLinks
  ].filter(Boolean).join('\n')
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function sendNewRequestNotification(data: SubmitRequestData): Promise<void> {
  const webhookUrl = process.env.DINGTALK_WEBHOOK_URL || ''
  if (!webhookUrl) {
    console.warn('DINGTALK_WEBHOOK_URL not configured, skipping DingTalk notification')
    return
  }

  let lastError: Error | null = null

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await axios.post(webhookUrl, {
        msgtype: 'markdown',
        markdown: {
          title: `新需求: ${data.projectTitle}`,
          text: formatMarkdown(data)
        }
      })
      console.log('DingTalk notification sent successfully')
      return
    } catch (error) {
      lastError = error as Error
      console.warn(`DingTalk attempt ${attempt + 1} failed:`, error)
      if (attempt < 2) {
        await sleep(Math.pow(2, attempt) * 1000)
      }
    }
  }

  console.error('DingTalk notification failed after 3 attempts:', lastError)
  throw lastError
}
