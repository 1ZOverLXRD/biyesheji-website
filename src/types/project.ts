export interface ProjectInfo {
  id: string
  name: string
  description: string
  longDescription?: string
  image?: string
  techStack: string[]
  demoPath: string
  features: string[]
  category: 'iot' | 'web' | 'mobile' | 'other'
}
