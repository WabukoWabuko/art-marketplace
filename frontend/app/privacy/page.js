'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, upload artworks, or make purchases. This includes your name, email address, payment information, and profile details.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We use your information to provide and improve our services, process transactions, send you updates about events and new artworks, and ensure platform security. We never sell your personal information to third parties.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Data Security</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We implement industry-standard security measures to protect your personal information. All payment data is encrypted and processed securely through our trusted payment partners.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Cookies & Tracking</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Our platform uses cookies to enhance your experience and understand how you interact with our services. You can control cookie settings in your browser preferences.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We use third-party services for payment processing, data storage, and analytics. These providers are contractually obligated to keep your information confidential and use it only for the purposes we specify.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            You have the right to access, correct, or delete your personal information at any time. To exercise these rights, contact us at privacy@artmarket.com.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Our services are not directed to children under 13. We do not knowingly collect personal information from children. If we learn that we have collected such information, we will delete it immediately.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Changes to Privacy Policy</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <div className="bg-purple-50 p-6 rounded-lg mt-12">
            <p className="text-gray-700">
              <strong>Last Updated:</strong> April 2026
            </p>
            <p className="text-gray-700 mt-4">
              For privacy questions, please contact us at <strong>privacy@artmarket.com</strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
