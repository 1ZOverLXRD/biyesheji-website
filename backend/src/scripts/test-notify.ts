/**
 * 通知服务测试脚本
 * 用法: cd backend && npx tsx src/scripts/test-notify.ts
 * 需要提前在 .env 中配置以下变量:
 *   NOTIFY_EMAIL=your_email@example.com
 *   EMAIL_HOST=smtpdm.aliyun.com
 *   EMAIL_PORT=465
 *   EMAIL_USER=your_email@example.com
 *   EMAIL_PASS=your_password
 *   EMAIL_FROM=your_email@example.com
 *   DINGTALK_WEBHOOK_URL=https://oapi.dingtalk.com/robot/send?access_token=xxx
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { sendNewRequestNotification as sendEmail } from '../services/email'
import { sendNewRequestNotification as sendDingTalk } from '../services/dingtalk'

// Load .env
config({ path: resolve(__dirname, '../../.env') })

const testData = {
  name: '测试用户',
  contact: '微信: QZZT0NGW1thme',
  projectTitle: '【测试】基于物联网的智能家居系统',
  description: '这是一个测试提交，用于验证邮件和钉钉通知是否正常发送。如果收到此消息，说明通知服务配置正确。',
  budget: 288,
  timeline: '2周内',
  images: [],
}

async function main() {
  console.log('=== 通知服务测试 ===\n')

  // Test 1: 检查环境变量
  const hasEmail = !!process.env.NOTIFY_EMAIL
  const hasDingTalk = !!process.env.DINGTALK_WEBHOOK_URL
  console.log(`[配置检查] NOTIFY_EMAIL: ${hasEmail ? '✅ 已配置' : '❌ 未配置'}`)
  console.log(`[配置检查] DINGTALK_WEBHOOK_URL: ${hasDingTalk ? '✅ 已配置' : '❌ 未配置'}`)

  if (!hasEmail && !hasDingTalk) {
    console.log('\n❌ 未检测到任何通知配置。请先在 backend/.env 中配置:')
    console.log('  NOTIFY_EMAIL=你的邮箱')
    console.log('  EMAIL_HOST=smtpdm.aliyun.com')
    console.log('  EMAIL_USER=你的邮箱')
    console.log('  EMAIL_PASS=你的密码')
    console.log('  DINGTALK_WEBHOOK_URL=你的钉钉机器人URL')
    process.exit(1)
  }

  // Test 2: 测试邮件
  if (hasEmail) {
    console.log('\n--- 测试邮件通知 ---')
    try {
      await sendEmail(testData)
      console.log('✅ 邮件发送成功（或已跳过: NOTIFY_EMAIL 未配置）')
    } catch (err) {
      console.log(`❌ 邮件发送失败: ${err}`)
    }
  }

  // Test 3: 测试钉钉
  if (hasDingTalk) {
    console.log('\n--- 测试钉钉通知 ---')
    try {
      await sendDingTalk(testData)
      console.log('✅ 钉钉消息发送成功')
    } catch (err) {
      console.log(`❌ 钉钉发送失败: ${err}`)
    }
  }

  console.log('\n=== 测试完成 ===')
}

main().catch(console.error)