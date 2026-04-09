import { useContext } from 'react'
import { CurrencyContext } from '../lib/currencyContext'

export default function CurrencySelector() {
  const { currency, setCurrency } = useContext(CurrencyContext)

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
  ]

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 cursor-pointer hover:border-gray-400"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}