import './globals.css'
import { CurrencyProvider } from '../lib/currencyContext'
import CurrencySelector from '../components/CurrencySelector'

export const metadata = {
  title: 'Art Marketplace',
  description: 'Discover and purchase unique artworks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">ArtMarket</div>
              <ul className="flex space-x-6 items-center">
                <li><a href="/" className="text-gray-600 hover:text-gray-800">Home</a></li>
                <li><a href="/marketplace" className="text-gray-600 hover:text-gray-800">Marketplace</a></li>
                <li><a href="/events" className="text-gray-600 hover:text-gray-800">Events</a></li>
                <li><a href="/tutorials" className="text-gray-600 hover:text-gray-800">Tutorials</a></li>
                <li><a href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</a></li>
                <li><CurrencySelector /></li>
              </ul>
            </nav>
          </header>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  )
}