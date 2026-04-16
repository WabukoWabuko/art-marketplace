'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            By accessing and using the ArtMarket platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. User Accounts</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Artwork Authenticity</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Artists guarantee that all artworks uploaded are original or properly licensed. ArtMarket reserves the right to remove any artwork that violates intellectual property rights.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Payment & Refunds</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            All transactions are processed securely. Refunds are subject to our refund policy and may be requested within 30 days of purchase. Digital artworks are non-refundable once downloaded.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Commission Structure</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            ArtMarket charges a 15% commission on all sales made through the platform. This fee covers payment processing, marketing, and platform maintenance.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Prohibited Activities</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Users agree not to: upload counterfeit or stolen artworks, engage in fraudulent transactions, harass other users, or violate any applicable laws and regulations.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            ArtMarket is provided on an &quot;as is&quot; basis. We do not warrant that the platform will be uninterrupted or error-free. We shall not be liable for any damages arising from your use of the platform.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes your acceptance of the new terms.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mt-12">
            <p className="text-gray-700">
              <strong>Last Updated:</strong> April 2026
            </p>
            <p className="text-gray-700 mt-4">
              For questions about these terms, please contact us at <strong>legal@artmarket.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
