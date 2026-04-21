'use client'

import { createContext, useState, useEffect } from 'react'

export const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('KES')
  const [exchangeRates, setExchangeRates] = useState({})

  // Currency symbols mapping
  const currencySymbols = {
    USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$', CHF: 'Fr',
    CNY: '¥', SEK: 'kr', NZD: 'NZ$', MXN: '$', SGD: 'S$', HKD: 'HK$', NOK: 'kr',
    KRW: '₩', TRY: '₺', RUB: '₽', INR: '₹', BRL: 'R$', ZAR: 'R', AED: 'د.إ',
    SAR: '﷼', EGP: '£', KES: 'KSh', NGN: '₦', GHS: '₵', TZS: 'TSh', UGX: 'USh',
    MAD: 'د.م.', DZD: 'د.ج', TND: 'د.ت', LYD: 'ل.د', SDG: 'ج.س.', ETB: 'Br',
    XAF: 'FCFA', XOF: 'CFA', XPF: '₣', ANG: 'ƒ', AWG: 'ƒ', BBD: '$', BMD: '$',
    BND: '$', BSD: '$', BZD: '$', CLP: '$', COP: '$', CRC: '₡', CUP: '$', CVE: '$',
    CZK: 'Kč', DKK: 'kr', DOP: '$', FJD: '$', GMD: 'D', GTQ: 'Q', GYD: '$',
    HNL: 'L', HRK: 'kn', HTG: 'G', HUF: 'Ft', IDR: 'Rp', ILS: '₪', ISK: 'kr',
    JMD: '$', JOD: 'JD', KWD: 'KD', KYD: '$', KZT: '₸', LAK: '₭', LBP: 'ل.ل',
    LKR: 'Rs', LRD: '$', LSL: 'L', MGA: 'Ar', MKD: 'ден', MMK: 'K', MNT: '₮',
    MOP: '$', MUR: 'Rs', MVR: 'Rf', MWK: 'MK', MYR: 'RM', MZN: 'MT', NAD: '$',
    NIO: 'C$', NPR: 'Rs', OMR: '﷼', PAB: 'B/.', PEN: 'S/', PGK: 'K', PHP: '₱',
    PKR: 'Rs', PLN: 'zł', PYG: '₲', QAR: '﷼', RON: 'lei', RSD: 'дин', SCR: 'Rs',
    SHP: '£', SLL: 'Le', SOS: 'Sh', SRD: 'Sr$', SSP: '£', STN: 'Db', SVC: '₡',
    SYP: '£', SZL: 'L', THB: '฿', TJS: 'SM', TMT: 'm', TOP: 'T$', TTD: '$',
    TWD: '$', UAH: '₴', UYU: '$', UZS: 'лв', VES: 'Bs.S', VND: '₫', VUV: 'VT',
    WST: 'T', XCD: '$', YER: '﷼', ZMW: 'ZK', ZWL: '$'
  }

  useEffect(() => {
    // Load exchange rates from a free API
    const loadRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        const data = await response.json()
        setExchangeRates(data.rates)
      } catch (error) {
        console.error('Failed to load exchange rates:', error)
        // Fallback to mock rates
        setExchangeRates({
          USD: 1,
          EUR: 0.85,
          GBP: 0.73,
          JPY: 110,
        })
      }
    }
    loadRates()
  }, [])

  const convertPrice = (price, fromCurrency, toCurrency) => {
    if (fromCurrency === toCurrency) return price
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]
    return (price * rate).toFixed(2)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, currencySymbols }}>
      {children}
    </CurrencyContext.Provider>
  )
}