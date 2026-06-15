<template>
  <div class="page-submit">
    <div class="container">
      <!-- Page Header -->
      <div ref="headerRef" class="submit-header">
        <span class="submit-eyebrow">提交需求</span>
        <h1 class="submit-title">定制你的毕设项目</h1>
        <p class="submit-desc">请详细描述你的毕业设计需求，我会在收到后尽快与你联系沟通</p>
      </div>

      <!-- ========== FORM SECTION ========== -->
      <section v-if="!submitted" ref="formRef" class="form-section">
        <div class="form-card">
          <!-- Name -->
          <div class="field">
            <label class="field-label" for="field-name">姓名 <span class="required">*</span></label>
            <input
              id="field-name"
              v-model="form.name"
              type="text"
              placeholder="你的姓名"
              :class="{ 'field--error': errors.name }"
              @blur="validateField('name')"
              @input="clearFieldError('name')"
            />
            <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
          </div>

          <!-- Contact -->
          <div class="field">
            <label class="field-label" for="field-contact">联系方式 <span class="required">*</span></label>
            <input
              id="field-contact"
              v-model="form.contact"
              type="text"
              placeholder="手机号或微信号"
              :class="{ 'field--error': errors.contact }"
              @blur="validateField('contact')"
              @input="clearFieldError('contact')"
            />
            <p v-if="errors.contact" class="field-error">{{ errors.contact }}</p>
          </div>

          <!-- Project Title -->
          <div class="field">
            <label class="field-label" for="field-project">毕设题目 <span class="required">*</span></label>
            <input
              id="field-project"
              v-model="form.projectTitle"
              type="text"
              placeholder="例如：基于 STM32 的智能家居控制系统"
              :class="{ 'field--error': errors.projectTitle }"
              @blur="validateField('projectTitle')"
              @input="clearFieldError('projectTitle')"
            />
            <p v-if="errors.projectTitle" class="field-error">{{ errors.projectTitle }}</p>
          </div>

          <!-- Description -->
          <div class="field">
            <label class="field-label" for="field-desc">详细描述 <span class="required">*</span></label>
            <textarea
              id="field-desc"
              v-model="form.description"
              rows="5"
              placeholder="请详细描述你的需求，包括功能要求、技术栈偏好、交付时间等"
              :class="{ 'field--error': errors.description }"
              @blur="validateField('description')"
              @input="clearFieldError('description')"
            />
            <p v-if="errors.description" class="field-error">{{ errors.description }}</p>
          </div>

          <!-- Timeline -->
          <div class="field">
            <label class="field-label" for="field-timeline">期望时间</label>
            <input
              id="field-timeline"
              v-model="form.timeline"
              type="text"
              placeholder="例如：2 周内"
              :class="{ 'field--error': errors.timeline }"
              @blur="validateField('timeline')"
              @input="clearFieldError('timeline')"
            />
            <p v-if="errors.timeline" class="field-error">{{ errors.timeline }}</p>
          </div>

          <!-- Image Upload -->
          <div class="field">
            <label class="field-label">参考图片</label>

            <!-- Drop Zone -->
            <div
              class="upload-zone"
              :class="{ 'upload-zone--active': isDragOver, 'upload-zone--disabled': selectedFiles.length >= MAX_FILES }"
              @dragover.prevent="isDragOver = true"
              @dragenter.prevent="isDragOver = true"
              @dragleave="isDragOver = false"
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
              role="button"
              tabindex="0"
              @keydown.enter="triggerFileInput"
              @keydown.space.prevent="triggerFileInput"
              aria-label="点击或拖拽上传图片"
            >
              <input
                ref="fileInputRef"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.gif,.webp"
                style="display: none"
                @change="handleFileSelect"
              />
              <PhUploadSimple :size="24" weight="duotone" />
              <p class="upload-zone__text">
                <span class="upload-zone__link">点击上传</span>
                <span>或拖拽图片到此处</span>
              </p>
              <p class="upload-zone__hint">支持 JPG / PNG / GIF / WebP，单张不超过 10MB</p>
            </div>

            <!-- Image Previews -->
            <div v-if="selectedFiles.length > 0" class="image-previews">
              <div
                v-for="(file, index) in selectedFiles"
                :key="previewUrls[index]"
                class="preview-item"
              >
                <img :src="previewUrls[index]" :alt="file.name" class="preview-thumb" />
                <button
                  class="preview-delete"
                  :disabled="isUploading"
                  @click="removeImage(index)"
                  aria-label="删除图片"
                >
                  <PhX :size="14" weight="bold" />
                </button>

                <!-- Upload progress -->
                <div v-if="uploadStatuses[index] === 'uploading'" class="preview-progress">
                  <div class="preview-progress__bar" :style="{ width: uploadProgress[index] + '%' }" />
                  <span class="preview-progress__text">{{ uploadProgress[index] }}%</span>
                </div>

                <!-- Upload error -->
                <div v-else-if="uploadStatuses[index] === 'error'" class="preview-error">
                  <span class="preview-error__text">{{ uploadErrors[index] || '上传失败' }}</span>
                  <button class="preview-error__retry" @click="retryUpload(index)">重试</button>
                </div>

                <!-- Upload done -->
                <div v-else-if="uploadStatuses[index] === 'done'" class="preview-done">
                  <PhCheck :size="16" weight="bold" />
                </div>

                <span class="preview-name">{{ file.name }}</span>
              </div>
            </div>

            <!-- Upload hint -->
            <p class="upload-hint">
              最多上传 {{ MAX_FILES }} 张，已选择 {{ selectedFiles.length }} 张
              <span v-if="selectedFiles.length >= MAX_FILES" class="upload-hint--full">（已达上限）</span>
            </p>
          </div>

          <!-- Submit Button -->
          <button
            class="submit-btn"
            :class="{ 'submit-btn--loading': submitting, 'submit-btn--pulse': submitting }"
            :disabled="submitting"
            @click="handleSubmit"
          >
            <span v-if="submitting" class="submit-spinner" />
            {{ submitting ? '提交中...' : '提交需求' }}
            <PhArrowRight v-if="!submitting" :size="16" weight="bold" />
          </button>

          <!-- Submit Error -->
          <transition name="fade-slide">
            <p v-if="submitError" class="submit-error">
              <PhWarningCircle :size="16" weight="duotone" />
              {{ submitError }}
            </p>
          </transition>
        </div>
      </section>

      <!-- ========== SUCCESS SECTION ========== -->
      <section v-else ref="successRef" class="success-section">
        <div class="success-card">
          <div class="success-icon-wrap">
            <svg class="success-circle" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="2" />
              <path d="M26 40L35 49L54 31" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="success-title">提交成功！</h2>
          <p class="success-desc">我会在 24 小时内通过你留下的联系方式与你沟通</p>

          <div class="qr-area">
            <div class="qr-placeholder">
              <img src="/wx.jpg" alt="微信二维码" class="submit__qr-img" />
            </div>
            <p class="qr-hint">也可直接扫码联系</p>
          </div>

          <router-link to="/" class="back-btn">
            <PhArrowLeft :size="16" weight="bold" />
            返回首页
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { PhUploadSimple, PhX, PhCheck, PhArrowRight, PhArrowLeft, PhWarningCircle } from '@phosphor-icons/vue'
import { submitRequest, uploadImages } from '@/services/api'
import type { FormErrors } from '@/types/form'

// ----- Constants -----
const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

// ----- Form State -----
const form = reactive({
  name: '',
  contact: '',
  projectTitle: '',
  description: '',
  timeline: '',
})

const errors = reactive<FormErrors>({})

// ----- Submit State -----
const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

// ----- Image Upload State -----
const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])
const previewUrls = ref<string[]>([])
const uploadStatuses = ref<('pending' | 'uploading' | 'done' | 'error')[]>([])
const uploadProgress = ref<number[]>([])
const uploadErrors = ref<(string | null)[]>([])
const isDragOver = ref(false)
const isUploading = ref(false)
const imageUrls = ref<string[]>([])

// ----- Refs for GSAP -----
const headerRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const successRef = ref<HTMLElement | null>(null)

let entryTween: ReturnType<typeof gsap.fromTo> | null = null
let formTweens: ReturnType<typeof gsap.from>[] = []
let successTween: ReturnType<typeof gsap.fromTo> | null = null

// ========== Validation ==========

const validators: Record<string, () => string | undefined> = {
  name: () => {
    const v = form.name.trim()
    if (!v) return '请输入姓名'
    if (v.length < 2) return '姓名至少 2 个字符'
    return undefined
  },
  contact: () => {
    const v = form.contact.trim()
    if (!v) return '请输入联系方式'
    if (!/^1\d{10}$/.test(v) && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(v) && v.length < 5) {
      return '请输入有效的手机号或微信号'
    }
    return undefined
  },
  projectTitle: () => {
    const v = form.projectTitle.trim()
    if (!v) return '请输入毕设题目'
    if (v.length < 4) return '题目至少 4 个字符'
    return undefined
  },
  description: () => {
    const v = form.description.trim()
    if (!v) return '请输入详细描述'
    if (v.length < 10) return '描述至少 10 个字符'
    return undefined
  },
  timeline: () => {
    return undefined
  },
}

function validateField(field: keyof FormErrors): void {
  const fn = validators[field]
  if (fn) {
    const err = fn()
    errors[field] = err
  }
}

function clearFieldError(field: keyof FormErrors): void {
  errors[field] = undefined
}

function validateAll(): boolean {
  let valid = true
  for (const key of Object.keys(validators) as (keyof FormErrors)[]) {
    const err = validators[key]()
    errors[key] = err
    if (err) valid = false
  }
  return valid
}

// ========== Image Handling ==========

function triggerFileInput(): void {
  if (selectedFiles.value.length >= MAX_FILES) return
  fileInputRef.value?.click()
}

function handleFileSelect(e: Event): void {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  addFiles(Array.from(input.files))
  input.value = ''
}

function handleDrop(e: DragEvent): void {
  isDragOver.value = false
  if (selectedFiles.value.length >= MAX_FILES) return
  const files = Array.from(e.dataTransfer?.files || [])
  addFiles(files)
}

function addFiles(files: File[]): void {
  for (const file of files) {
    if (selectedFiles.value.length >= MAX_FILES) break
    if (!ACCEPTED_TYPES.includes(file.type)) continue
    if (file.size > MAX_FILE_SIZE) continue
    const idx = selectedFiles.value.length
    selectedFiles.value.push(file)
    previewUrls.value.push(URL.createObjectURL(file))
    uploadStatuses.value.push('pending')
    uploadProgress.value.push(0)
    uploadErrors.value.push(null)
    imageUrls.value.push('')
  }
}

function removeImage(index: number): void {
  URL.revokeObjectURL(previewUrls.value[index])
  selectedFiles.value.splice(index, 1)
  previewUrls.value.splice(index, 1)
  uploadStatuses.value.splice(index, 1)
  uploadProgress.value.splice(index, 1)
  uploadErrors.value.splice(index, 1)
  imageUrls.value.splice(index, 1)
}

function revokeAllPreviews(): void {
  previewUrls.value.forEach((url) => URL.revokeObjectURL(url))
}

async function uploadAllImages(): Promise<boolean> {
  if (selectedFiles.value.length === 0) return true

  isUploading.value = true
  let allSuccess = true

  for (let i = 0; i < selectedFiles.value.length; i++) {
    if (uploadStatuses.value[i] === 'done') continue

    const file = selectedFiles.value[i]
    uploadStatuses.value[i] = 'uploading'
    uploadProgress.value[i] = 0

    try {
      const formData = new FormData()
      formData.append('images', file)

      const xhr = new XMLHttpRequest()
      const url = await new Promise<string>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            uploadProgress.value[i] = Math.round((e.loaded / e.total) * 100)
          }
        })

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const res = JSON.parse(xhr.responseText)
              if (res.data?.urls?.[0]) {
                resolve(res.data.urls[0])
              } else {
                reject(new Error('返回数据格式错误'))
              }
            } catch {
              reject(new Error('解析响应失败'))
            }
          } else {
            reject(new Error(`上传失败 (${xhr.status})`))
          }
        })

        xhr.addEventListener('error', () => reject(new Error('网络错误，请检查连接')))
        xhr.addEventListener('abort', () => reject(new Error('上传已取消')))

        xhr.open('POST', '/api/upload')
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send(formData)
      })

      imageUrls.value[i] = url
      uploadStatuses.value[i] = 'done'
      uploadProgress.value[i] = 100
      uploadErrors.value[i] = null
    } catch (err) {
      uploadStatuses.value[i] = 'error'
      uploadErrors.value[i] = err instanceof Error ? err.message : '上传失败'
      allSuccess = false
    }
  }

  isUploading.value = false
  return allSuccess
}

async function retryUpload(index: number): Promise<void> {
  uploadStatuses.value[index] = 'pending'
  uploadErrors.value[index] = null

  isUploading.value = true
  const file = selectedFiles.value[index]

  try {
    uploadStatuses.value[index] = 'uploading'
    uploadProgress.value[index] = 0

    const formData = new FormData()
    formData.append('images', file)

    const xhr = new XMLHttpRequest()
    const url = await new Promise<string>((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          uploadProgress.value[index] = Math.round((e.loaded / e.total) * 100)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText)
            if (res.data?.urls?.[0]) {
              resolve(res.data.urls[0])
            } else {
              reject(new Error('返回数据格式错误'))
            }
          } catch {
            reject(new Error('解析响应失败'))
          }
        } else {
          reject(new Error(`上传失败 (${xhr.status})`))
        }
      })

      xhr.addEventListener('error', () => reject(new Error('网络错误，请检查连接')))
      xhr.addEventListener('abort', () => reject(new Error('上传已取消')))

      xhr.open('POST', '/api/upload')
      xhr.setRequestHeader('Accept', 'application/json')
      xhr.send(formData)
    })

    imageUrls.value[index] = url
    uploadStatuses.value[index] = 'done'
    uploadProgress.value[index] = 100
    uploadErrors.value[index] = null
  } catch (err) {
    uploadStatuses.value[index] = 'error'
    uploadErrors.value[index] = err instanceof Error ? err.message : '上传失败'
  }

  isUploading.value = false
}

// ========== Submit ==========

async function handleSubmit(): Promise<void> {
  submitError.value = ''

  if (!validateAll()) {
    // Scroll to first error
    const firstError = document.querySelector('.field--error')
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }

  submitting.value = true

  try {
    // 1. Upload images
    const localUrls: string[] = []
    for (let i = 0; i < selectedFiles.value.length; i++) {
      if (uploadStatuses.value[i] === 'done' && imageUrls.value[i]) {
        localUrls.push(imageUrls.value[i])
      } else {
        // Need to upload this file
        // For simplicity, reset and re-upload all at once
        break
      }
    }

    let finalUrls: string[] = [...imageUrls.value.filter(Boolean)]
    if (selectedFiles.value.length > 0 && finalUrls.length !== selectedFiles.value.length) {
      // Upload files that haven't been uploaded yet
      const ok = await uploadAllImages()
      if (!ok) {
        submitting.value = false
        submitError.value = '部分图片上传失败，请重试或移除后重试'
        return
      }
      finalUrls = [...imageUrls.value.filter(Boolean)]
    }

    // 2. Submit form
    await submitRequest({
      name: form.name.trim(),
      contact: form.contact.trim(),
      projectTitle: form.projectTitle.trim(),
      description: form.description.trim(),
      timeline: form.timeline.trim() || undefined,
      imageUrls: finalUrls.length > 0 ? finalUrls : undefined,
    })

    // 3. Show success
    submitted.value = true
    await nextTick()
    animateSuccess()
    revokeAllPreviews()
  } catch (err) {
    if (err instanceof Error) {
      submitError.value = err.message.includes('timeout')
        ? '请求超时，请检查网络后重试'
        : err.message.includes('Network')
          ? '网络错误，请检查连接后重试'
          : `提交失败：${err.message}`
    } else {
      submitError.value = '提交失败，请稍后重试'
    }
  } finally {
    submitting.value = false
  }
}

// ========== GSAP Animations ==========

function animateEntry(): void {
  // Header fade-in-up
  if (headerRef.value) {
    entryTween = gsap.fromTo(
      headerRef.value.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out' }
    )
  }

  // Form card sections stagger
  if (formRef.value) {
    const fields = formRef.value.querySelectorAll<HTMLElement>('.field, .submit-btn, .submit-error')
    if (fields.length) {
      formTweens.push(
        gsap.from(fields, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.3,
        })
      )
    }
  }
}

function animateSuccess(): void {
  if (successRef.value) {
    const children = successRef.value.querySelectorAll<HTMLElement>('.success-card > *')
    successTween = gsap.fromTo(
      children,
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
    )

    // Animate checkmark circle drawing
    const circle = successRef.value.querySelector('.success-circle circle') as SVGGeometryElement | null
    const path = successRef.value.querySelector('.success-circle path') as SVGGeometryElement | null
    if (circle && path) {
      const circleLen = circle.getTotalLength()
      const pathLen = path.getTotalLength()
      gsap.set([circle, path], {
        strokeDasharray: (i: number) => i === 0 ? circleLen : pathLen,
        strokeDashoffset: (i: number) => i === 0 ? circleLen : pathLen,
      })
      gsap.to(circle, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.1,
      })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.5,
      })
    }
  }
}

// ========== Lifecycle ==========

onMounted(() => {
  nextTick(() => {
    animateEntry()
  })
})

onBeforeUnmount(() => {
  entryTween?.kill()
  formTweens.forEach((t) => t.kill())
  successTween?.kill()
  revokeAllPreviews()
})
</script>

<style scoped>
/* ========== Page ========== */
.page-submit {
  padding: var(--space-20) 0 var(--space-24);
  min-height: calc(100dvh - var(--nav-height));
  background-color: var(--color-surface);
}

/* ========== Header ========== */
.submit-header {
  max-width: 640px;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.submit-eyebrow {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-family: var(--font-mono);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-3);
}

.submit-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
  margin-bottom: var(--space-3);
}

.submit-desc {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto;
}

/* ========== Form Section ========== */
.form-section {
  max-width: 640px;
  margin: 0 auto;
}

.form-card {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  box-shadow: var(--shadow-sm);
}

/* ========== Field ========== */
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5, 6px);
}

.field-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .field-row {
    grid-template-columns: 1fr 1fr;
  }
}

.field-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  line-height: 1.4;
}

.required {
  color: var(--color-error);
}

/* Input base */
.field input[type='text'],
.field input[type='number'],
.field textarea {
  width: 100%;
  padding: var(--space-2-5, 10px) var(--space-3);
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
  font-family: var(--font-sans);
}

.field input[type='text']:focus,
.field input[type='number']:focus,
.field textarea:focus {
  border-color: var(--color-accent-alt);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.field input::placeholder,
.field textarea::placeholder {
  color: var(--color-text-tertiary);
}

.field input.field--error,
.field textarea.field--error {
  border-color: var(--color-error);
}

.field input.field--error:focus,
.field textarea.field--error:focus {
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.15);
}

.field textarea {
  resize: vertical;
  min-height: 120px;
}

/* Remove number input spinner */
.field input[type='number'] {
  -moz-appearance: textfield;
}

.field input[type='number']::-webkit-outer-spin-button,
.field input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.field-error {
  font-size: var(--font-size-xs);
  color: var(--color-error);
  line-height: 1.4;
  margin-top: 2px;
}

/* ========== Upload Zone ========== */
.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-8) var(--space-4);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: border-color var(--transition-base), background-color var(--transition-base);
  min-height: 140px;
}

.upload-zone:hover {
  border-color: var(--color-accent-alt);
  background-color: var(--color-surface-hover);
}

.upload-zone--active {
  border-color: var(--color-accent-alt);
  background-color: rgba(59, 130, 246, 0.05);
}

.upload-zone--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.upload-zone__text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  display: flex;
  gap: var(--space-1);
}

.upload-zone__link {
  color: var(--color-accent-alt);
  font-weight: var(--font-weight-medium);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.upload-zone__hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* ========== Image Previews ========== */
.image-previews {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-3);
}

.preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.preview-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-delete {
  position: absolute;
  top: var(--space-1);
  right: var(--space-1);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0;
  cursor: pointer;
  transition: background-color var(--transition-fast);
  z-index: 2;
  border: none;
}

.preview-delete:hover {
  background-color: rgba(0, 0, 0, 0.75);
}

.preview-delete:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.preview-name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-1) var(--space-1-5, 6px);
  font-size: 0.6875rem;
  color: #fff;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  z-index: 1;
}

/* Progress overlay */
.preview-progress {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 3;
}

.preview-progress__bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: var(--color-accent-alt);
  transition: width 200ms ease;
}

.preview-progress__text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #fff;
  font-family: var(--font-mono);
}

/* Error overlay */
.preview-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
}

.preview-error__text {
  font-size: var(--font-size-xs);
  color: #fca5a5;
  text-align: center;
  padding: 0 var(--space-1);
}

.preview-error__retry {
  font-size: var(--font-size-xs);
  color: #fff;
  background-color: var(--color-error);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  border: none;
  font-weight: var(--font-weight-medium);
  transition: opacity var(--transition-fast);
}

.preview-error__retry:hover {
  opacity: 0.8;
}

/* Done overlay */
.preview-done {
  position: absolute;
  top: var(--space-1);
  left: var(--space-1);
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background-color: var(--color-success);
  color: #fff;
  z-index: 2;
}

.upload-hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
}

.upload-hint--full {
  color: var(--color-error);
}

/* ========== Submit Button ========== */
.submit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-3) var(--space-8);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-bg);
  background-color: var(--color-accent);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-base), transform var(--transition-fast), opacity var(--transition-fast);
  position: relative;
  min-height: 48px;
}

@media (min-width: 640px) {
  .submit-btn {
    width: auto;
    min-width: 200px;
  }
}

.submit-btn:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-btn--loading {
  pointer-events: none;
}

.submit-btn--pulse {
  animation: pulse-loader 1.5s ease-in-out infinite;
}

@keyframes pulse-loader {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.submit-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Submit Error */
.submit-error {
  display: flex;
  align-items: center;
  gap: var(--space-1-5, 6px);
  font-size: var(--font-size-sm);
  color: var(--color-error);
  padding: var(--space-2) var(--space-3);
  background-color: rgba(239, 68, 68, 0.08);
  border-radius: var(--radius-sm);
  line-height: 1.4;
}

/* ========== Success Section ========== */
.success-section {
  max-width: 480px;
  margin: 0 auto;
}

.success-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  text-align: center;
  padding: var(--space-12) var(--space-8);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.success-icon-wrap {
  width: 80px;
  height: 80px;
  color: var(--color-success);
}

.success-circle {
  width: 100%;
  height: 100%;
}

.success-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-text);
}

.success-desc {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  max-width: 340px;
}

.qr-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.qr-placeholder {
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  background-color: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-tertiary);
}

.submit__qr-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.qr-hint {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5, 6px);
  padding: var(--space-2-5, 10px) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
  text-decoration: none;
}

.back-btn:hover {
  border-color: var(--color-text);
  background-color: var(--color-surface-hover);
}

/* ========== Transition ========== */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 250ms var(--ease-spring);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ========== Mobile Adjustments ========== */
@media (max-width: 767px) {
  .page-submit {
    padding: var(--space-12) 0 var(--space-16);
  }

  .submit-title {
    font-size: var(--font-size-2xl);
  }

  .submit-desc {
    font-size: var(--font-size-sm);
  }

  .form-card {
    padding: var(--space-6);
    border-radius: var(--radius-md);
  }

  .image-previews {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }

  .success-card {
    padding: var(--space-8) var(--space-6);
  }

  .success-title {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 480px) {
  .image-previews {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
