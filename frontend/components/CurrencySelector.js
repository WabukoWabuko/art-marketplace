'use client'

import { useContext, useEffect } from 'react'
import { CurrencyContext } from '../lib/currencyContext'

export default function CurrencySelector() {
  const { currency, setCurrency } = useContext(CurrencyContext)

  // Comprehensive list of world currencies
  const currencies = [
    { code: 'USD', symbol: '$', name: 'United States - US Dollar' },
    { code: 'EUR', symbol: '€', name: 'European Union - Euro' },
    { code: 'GBP', symbol: '£', name: 'United Kingdom - British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japan - Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canada - Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australia - Australian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Switzerland - Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'China - Chinese Yuan' },
    { code: 'SEK', symbol: 'kr', name: 'Sweden - Swedish Krona' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand - New Zealand Dollar' },
    { code: 'MXN', symbol: '$', name: 'Mexico - Mexican Peso' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore - Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong - Hong Kong Dollar' },
    { code: 'NOK', symbol: 'kr', name: 'Norway - Norwegian Krone' },
    { code: 'KRW', symbol: '₩', name: 'South Korea - South Korean Won' },
    { code: 'TRY', symbol: '₺', name: 'Turkey - Turkish Lira' },
    { code: 'RUB', symbol: '₽', name: 'Russia - Russian Ruble' },
    { code: 'INR', symbol: '₹', name: 'India - Indian Rupee' },
    { code: 'BRL', symbol: 'R$', name: 'Brazil - Brazilian Real' },
    { code: 'ZAR', symbol: 'R', name: 'South Africa - South African Rand' },
    { code: 'AED', symbol: 'د.إ', name: 'United Arab Emirates - UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Arabia - Saudi Riyal' },
    { code: 'EGP', symbol: '£', name: 'Egypt - Egyptian Pound' },
    { code: 'KES', symbol: 'KSh', name: 'Kenya - Kenyan Shilling' },
    { code: 'NGN', symbol: '₦', name: 'Nigeria - Nigerian Naira' },
    { code: 'GHS', symbol: '₵', name: 'Ghana - Ghanaian Cedi' },
    { code: 'TZS', symbol: 'TSh', name: 'Tanzania - Tanzanian Shilling' },
    { code: 'UGX', symbol: 'USh', name: 'Uganda - Ugandan Shilling' },
    { code: 'MAD', symbol: 'د.م.', name: 'Morocco - Moroccan Dirham' },
    { code: 'DZD', symbol: 'د.ج', name: 'Algeria - Algerian Dinar' },
    { code: 'TND', symbol: 'د.ت', name: 'Tunisia - Tunisian Dinar' },
    { code: 'LYD', symbol: 'ل.د', name: 'Libya - Libyan Dinar' },
    { code: 'SDG', symbol: 'ج.س.', name: 'Sudan - Sudanese Pound' },
    { code: 'ETB', symbol: 'Br', name: 'Ethiopia - Ethiopian Birr' },
    { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
    { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
    { code: 'XPF', symbol: '₣', name: 'CFP Franc' },
    { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antilles - Netherlands Antillean Guilder' },
    { code: 'AWG', symbol: 'ƒ', name: 'Aruba - Aruban Florin' },
    { code: 'BBD', symbol: '$', name: 'Barbados - Barbadian Dollar' },
    { code: 'BMD', symbol: '$', name: 'Bermuda - Bermudian Dollar' },
    { code: 'BND', symbol: '$', name: 'Brunei - Brunei Dollar' },
    { code: 'BSD', symbol: '$', name: 'Bahamas - Bahamian Dollar' },
    { code: 'BZD', symbol: '$', name: 'Belize - Belize Dollar' },
    { code: 'CLP', symbol: '$', name: 'Chile - Chilean Peso' },
    { code: 'COP', symbol: '$', name: 'Colombia - Colombian Peso' },
    { code: 'CRC', symbol: '₡', name: 'Costa Rica - Costa Rican Colón' },
    { code: 'CUP', symbol: '$', name: 'Cuba - Cuban Peso' },
    { code: 'CVE', symbol: '$', name: 'Cape Verde - Cape Verdean Escudo' },
    { code: 'CZK', symbol: 'Kč', name: 'Czech Republic - Czech Koruna' },
    { code: 'DKK', symbol: 'kr', name: 'Denmark - Danish Krone' },
    { code: 'DOP', symbol: '$', name: 'Dominican Republic - Dominican Peso' },
    { code: 'FJD', symbol: '$', name: 'Fiji - Fijian Dollar' },
    { code: 'GMD', symbol: 'D', name: 'Gambia - Gambian Dalasi' },
    { code: 'GTQ', symbol: 'Q', name: 'Guatemala - Guatemalan Quetzal' },
    { code: 'GYD', symbol: '$', name: 'Guyana - Guyanese Dollar' },
    { code: 'HNL', symbol: 'L', name: 'Honduras - Honduran Lempira' },
    { code: 'HRK', symbol: 'kn', name: 'Croatia - Croatian Kuna' },
    { code: 'HTG', symbol: 'G', name: 'Haiti - Haitian Gourde' },
    { code: 'HUF', symbol: 'Ft', name: 'Hungary - Hungarian Forint' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesia - Indonesian Rupiah' },
    { code: 'ILS', symbol: '₪', name: 'Israel - Israeli New Shekel' },
    { code: 'ISK', symbol: 'kr', name: 'Iceland - Icelandic Króna' },
    { code: 'JMD', symbol: '$', name: 'Jamaica - Jamaican Dollar' },
    { code: 'JOD', symbol: 'JD', name: 'Jordan - Jordanian Dinar' },
    { code: 'KWD', symbol: 'KD', name: 'Kuwait - Kuwaiti Dinar' },
    { code: 'KYD', symbol: '$', name: 'Cayman Islands - Cayman Islands Dollar' },
    { code: 'KZT', symbol: '₸', name: 'Kazakhstan - Kazakhstani Tenge' },
    { code: 'LAK', symbol: '₭', name: 'Laos - Lao Kip' },
    { code: 'LBP', symbol: 'ل.ل', name: 'Lebanon - Lebanese Pound' },
    { code: 'LKR', symbol: 'Rs', name: 'Sri Lanka - Sri Lankan Rupee' },
    { code: 'LRD', symbol: '$', name: 'Liberia - Liberian Dollar' },
    { code: 'LSL', symbol: 'L', name: 'Lesotho - Lesotho Loti' },
    { code: 'MGA', symbol: 'Ar', name: 'Madagascar - Malagasy Ariary' },
    { code: 'MKD', symbol: 'ден', name: 'North Macedonia - Macedonian Denar' },
    { code: 'MMK', symbol: 'K', name: 'Myanmar - Burmese Kyat' },
    { code: 'MNT', symbol: '₮', name: 'Mongolia - Mongolian Tögrög' },
    { code: 'MOP', symbol: '$', name: 'Macau - Macanese Pataca' },
    { code: 'MUR', symbol: 'Rs', name: 'Mauritius - Mauritian Rupee' },
    { code: 'MVR', symbol: 'Rf', name: 'Maldives - Maldivian Rufiyaa' },
    { code: 'MWK', symbol: 'MK', name: 'Malawi - Malawian Kwacha' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysia - Malaysian Ringgit' },
    { code: 'MZN', symbol: 'MT', name: 'Mozambique - Mozambican Metical' },
    { code: 'NAD', symbol: '$', name: 'Namibia - Namibian Dollar' },
    { code: 'NIO', symbol: 'C$', name: 'Nicaragua - Nicaraguan Córdoba' },
    { code: 'NPR', symbol: 'Rs', name: 'Nepal - Nepalese Rupee' },
    { code: 'OMR', symbol: '﷼', name: 'Oman - Omani Rial' },
    { code: 'PAB', symbol: 'B/.', name: 'Panama - Panamanian Balboa' },
    { code: 'PEN', symbol: 'S/', name: 'Peru - Peruvian Sol' },
    { code: 'PGK', symbol: 'K', name: 'Papua New Guinea - Papua New Guinean Kina' },
    { code: 'PHP', symbol: '₱', name: 'Philippines - Philippine Peso' },
    { code: 'PKR', symbol: 'Rs', name: 'Pakistan - Pakistani Rupee' },
    { code: 'PLN', symbol: 'zł', name: 'Poland - Polish Złoty' },
    { code: 'PYG', symbol: '₲', name: 'Paraguay - Paraguayan Guaraní' },
    { code: 'QAR', symbol: '﷼', name: 'Qatar - Qatari Riyal' },
    { code: 'RON', symbol: 'lei', name: 'Romania - Romanian Leu' },
    { code: 'RSD', symbol: 'дин', name: 'Serbia - Serbian Dinar' },
    { code: 'SCR', symbol: 'Rs', name: 'Seychelles - Seychellois Rupee' },
    { code: 'SHP', symbol: '£', name: 'Saint Helena - Saint Helena Pound' },
    { code: 'SLL', symbol: 'Le', name: 'Sierra Leone - Sierra Leonean Leone' },
    { code: 'SOS', symbol: 'Sh', name: 'Somalia - Somali Shilling' },
    { code: 'SRD', symbol: 'Sr$', name: 'Suriname - Surinamese Dollar' },
    { code: 'SSP', symbol: '£', name: 'South Sudan - South Sudanese Pound' },
    { code: 'STN', symbol: 'Db', name: 'São Tomé and Príncipe - São Tomé and Príncipe Dobra' },
    { code: 'SVC', symbol: '₡', name: 'El Salvador - Salvadoran Colón' },
    { code: 'SYP', symbol: '£', name: 'Syria - Syrian Pound' },
    { code: 'SZL', symbol: 'L', name: 'Eswatini - Swazi Lilangeni' },
    { code: 'THB', symbol: '฿', name: 'Thailand - Thai Baht' },
    { code: 'TJS', symbol: 'SM', name: 'Tajikistan - Tajikistani Somoni' },
    { code: 'TMT', symbol: 'm', name: 'Turkmenistan - Turkmenistani Manat' },
    { code: 'TOP', symbol: 'T$', name: 'Tonga - Tongan Paʻanga' },
    { code: 'TTD', symbol: '$', name: 'Trinidad and Tobago - Trinidad and Tobago Dollar' },
    { code: 'TWD', symbol: '$', name: 'Taiwan - New Taiwan Dollar' },
    { code: 'UAH', symbol: '₴', name: 'Ukraine - Ukrainian Hryvnia' },
    { code: 'UYU', symbol: '$', name: 'Uruguay - Uruguayan Peso' },
    { code: 'UZS', symbol: 'лв', name: 'Uzbekistan - Uzbekistani Sum' },
    { code: 'VES', symbol: 'Bs.S', name: 'Venezuela - Venezuelan Sovereign Bolívar' },
    { code: 'VND', symbol: '₫', name: 'Vietnam - Vietnamese Đồng' },
    { code: 'VUV', symbol: 'VT', name: 'Vanuatu - Vanuatu Vatu' },
    { code: 'WST', symbol: 'T', name: 'Samoa - Samoan Tālā' },
    { code: 'XCD', symbol: '$', name: 'Eastern Caribbean - Eastern Caribbean Dollar' },
    { code: 'YER', symbol: '﷼', name: 'Yemen - Yemeni Rial' },
    { code: 'ZMW', symbol: 'ZK', name: 'Zambia - Zambian Kwacha' },
    { code: 'ZWL', symbol: '$', name: 'Zimbabwe - Zimbabwean Dollar' }
  ]

  useEffect(() => {
    // Auto-detect currency based on browser locale or IP (simplified)
    const detectCurrency = () => {
      const locale = navigator.language || 'en-US'
      const country = locale.split('-')[1] || 'US'
      
      // Map common countries to currencies
      const countryMap = {
        'US': 'USD', 'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR', 'ES': 'EUR', 'IT': 'EUR',
        'JP': 'JPY', 'CA': 'CAD', 'AU': 'AUD', 'CH': 'CHF', 'CN': 'CNY', 'SE': 'SEK',
        'NZ': 'NZD', 'MX': 'MXN', 'SG': 'SGD', 'HK': 'HKD', 'NO': 'NOK', 'KR': 'KRW',
        'TR': 'TRY', 'RU': 'RUB', 'IN': 'INR', 'BR': 'BRL', 'ZA': 'ZAR', 'AE': 'AED',
        'SA': 'SAR', 'EG': 'EGP', 'KE': 'KES', 'NG': 'NGN', 'GH': 'GHS', 'TZ': 'TZS',
        'UG': 'UGX', 'MA': 'MAD', 'DZ': 'DZD', 'TN': 'TND', 'LY': 'LYD', 'SD': 'SDG',
        'ET': 'ETB'
      }
      
      const detected = countryMap[country] || 'USD'
      if (!currency) setCurrency(detected)
    }
    
    detectCurrency()
  }, [currency, setCurrency])

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 cursor-pointer hover:border-gray-400"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.name} ({curr.symbol})
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