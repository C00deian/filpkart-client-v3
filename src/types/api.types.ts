export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
}

export interface ApiError {
  status: number
  error: string
  message: string
  errors?: Record<string, string>
  path?: string
  timestamp?: string
}

export interface PaginationParams {
  page?: number
  size?: number
  sort?: string
}
