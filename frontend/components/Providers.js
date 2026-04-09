'use client'

import { CurrencyProvider } from '../lib/currencyContext'

export function Providers({ children }) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  )
}