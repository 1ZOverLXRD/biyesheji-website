export interface SubmitRequestData {
  name: string
  contact: string
  projectTitle: string
  description: string
  budget?: number
  timeline?: string
  images?: string[]  // URLs after upload to OSS
}

export interface FormErrors {
  name?: string
  contact?: string
  projectTitle?: string
  description?: string
  budget?: string
  timeline?: string
}

export interface UploadResponse {
  url: string
  filename: string
}
