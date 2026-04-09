'use client'

import { createContext, useState, useEffect } from 'react'

export const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  const [exchangeRates, setExchangeRates] = useState({})

  useEffect(() => {
    // Load exchange rates from API or local storage
    const loadRates = async () => {
      // For now, use mock rates
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
      })
    }
    loadRates()
  }, [])

  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return price
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]
    return (price * rate).toFixed(2)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  )
}