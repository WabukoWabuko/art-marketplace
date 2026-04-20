'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now()
    const toast = { id, message, type, duration }

    setToasts(prev => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const showSuccess = useCallback((message, duration) => addToast(message, 'success', duration), [addToast])
  const showError = useCallback((message, duration) => addToast(message, 'error', duration), [addToast])
  const showInfo = useCallback((message, duration) => addToast(message, 'info', duration), [addToast])
  const showWarning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast])

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      showSuccess,
      showError,
      showInfo,
      showWarning
    }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function Toast({ toast, onRemove }) {
  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 border-green-400/50 text-white'
      case 'error':
        return 'bg-red-500/90 border-red-400/50 text-white'
      case 'warning':
        return 'bg-yellow-500/90 border-yellow-400/50 text-white'
      case 'info':
      default:
        return 'bg-blue-500/90 border-blue-400/50 text-white'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div className={`${getToastStyles(toast.type)} backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-sm animate-in slide-in-from-right-2`}>
      <div className="flex items-start space-x-3">
        <span className="text-lg flex-shrink-0">{getIcon(toast.type)}</span>
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}