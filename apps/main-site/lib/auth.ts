// Authentication utilities and types
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  avatar?: string
  isActive: boolean
  createdAt: string
  lastLoginAt?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  data?: {
    user: User
    token: string
  }
  message?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Token management
export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export const setStoredToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export const removeStoredToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

// API calls
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    return {
      success: true,
      data: {
        user: data.data.user,
        token: data.data.token
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Login failed'
    }
  }
}

export async function registerUser(userData: RegisterData): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed')
    }

    return {
      success: true,
      data: {
        user: data.data.user,
        token: data.data.token
      }
    }
  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed'
    }
  }
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Token verification failed')
    }

    const data = await response.json()
    return data.data.user
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export async function refreshToken(): Promise<string | null> {
  try {
    const currentToken = getStoredToken()
    if (!currentToken) return null

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${currentToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    return data.data.token
  } catch (error) {
    console.error('Token refresh error:', error)
    return null
  }
}

export async function logoutUser(): Promise<void> {
  try {
    const token = getStoredToken()
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    }
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    removeStoredToken()
  }
}

// Utility functions
export const isTokenExpired = (token: string): boolean => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return true
    
    const payload = JSON.parse(atob(parts[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const getUserFromToken = (token: string): Partial<User> | null => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    return {
      id: payload.userId || payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role
    }
  } catch {
    return null
  }
}