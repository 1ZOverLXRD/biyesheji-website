import axios from 'axios'
import type { ApiResponse } from '@/types'

export interface SubmitRequestPayload {
  name: string
  contact: string
  projectTitle: string
  description: string
  budget?: number
  timeline?: string
  imageUrls?: string[]
}

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

export async function submitRequest(data: SubmitRequestPayload): Promise<ApiResponse> {
  const response = await api.post<ApiResponse>('/submit', data)
  return response.data
}

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach(file => formData.append('images', file))
  const response = await api.post<ApiResponse<{ urls: string[] }>>('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.data?.urls || []
}

export default api
