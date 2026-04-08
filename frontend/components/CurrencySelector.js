import { useContext } from 'react'
import { CurrencyContext } from '../lib/currencyContext'

export default function CurrencySelector() {
  const { currency, setCurrency } = useContext(CurrencyContext)

  const currencies = ['USD', 'EUR', 'GBP', 'JPY']

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="border rounded px-3 py-2"
    >
      {currencies.map((curr) => (
        <option key={curr} value={curr}>{curr}</option>
      ))}
    </select>
  )
}