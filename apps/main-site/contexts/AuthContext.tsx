'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { 
  User, 
  AuthState, 
  LoginCredentials, 
  RegisterData,
  loginUser,
  registerUser,
  verifyToken,
  refreshToken,
  logoutUser,
  getStoredToken,
  setStoredToken,
  removeStoredToken,
  isTokenExpired
} from '../lib/auth'

// Action types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'TOKEN_REFRESH'; payload: string }

// Auth context interface
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
  refreshAuth: () => Promise<boolean>
  updateUser: (userData: Partial<User>) => Promise<void>
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
}

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      }
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'TOKEN_REFRESH':
      return {
        ...state,
        token: action.payload,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth()
  }, [])

  // Set up token refresh interval
  useEffect(() => {
    if (state.isAuthenticated && state.token) {
      const interval = setInterval(async () => {
        await refreshAuth()
      }, 15 * 60 * 1000) // Refresh every 15 minutes

      return () => clearInterval(interval)
    }
  }, [state.isAuthenticated, state.token])

  const initializeAuth = async () => {
    const token = getStoredToken()
    
    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false })
      return
    }

    if (isTokenExpired(token)) {
      removeStoredToken()
      dispatch({ type: 'LOGIN_FAILURE' })
      return
    }

    const user = await verifyToken(token)
    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })
    } else {
      removeStoredToken()
      dispatch({ type: 'LOGIN_FAILURE' })
    }
  }

  const login = async (credentials: LoginCredentials) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    const response = await loginUser(credentials)
    
    if (response.success && response.data) {
      setStoredToken(response.data.token)
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: response.data.user, 
          token: response.data.token 
        } 
      })
      return { success: true }
    } else {
      dispatch({ type: 'LOGIN_FAILURE' })
      return { success: false, message: response.message }
    }
  }

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    const response = await registerUser(userData)
    
    if (response.success && response.data) {
      setStoredToken(response.data.token)
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: response.data.user, 
          token: response.data.token 
        } 
      })
      return { success: true }
    } else {
      dispatch({ type: 'LOGIN_FAILURE' })
      return { success: false, message: response.message }
    }
  }

  const logout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    await logoutUser()
    dispatch({ type: 'LOGOUT' })
  }

  const refreshAuth = async (): Promise<boolean> => {
    const newToken = await refreshToken()
    
    if (newToken) {
      setStoredToken(newToken)
      dispatch({ type: 'TOKEN_REFRESH', payload: newToken })
      return true
    } else {
      await logout()
      return false
    }
  }

  const updateUser = async (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData }
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAuth,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 text-center mb-6">
              You need to be logged in to access this page.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.location.href = '/login'}
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}