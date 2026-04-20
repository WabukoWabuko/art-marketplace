'use client'

import { CurrencyProvider } from '../lib/currencyContext'
import { ToastProvider } from './Toast'

export function Providers({ children }) {
  return (
    <CurrencyProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </CurrencyProvider>
  )
}