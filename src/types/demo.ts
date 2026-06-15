export interface DemoConfig {
  id: string
  name: string
  component: string  // lazy import path
  mockEnabled: boolean
  originalTheme: 'light' | 'dark' | 'custom'
  description: string
  screenshot?: string
}
