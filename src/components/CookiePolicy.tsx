import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface CookiePolicyProps {
  onBack: () => void;
}

export function CookiePolicy({ onBack }: CookiePolicyProps) {
  return (
    <div className="min-h-screen bg-[#0B3D2E] text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-white/70 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">1. What Are Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and improving our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">2. Types of Cookies We Use</h2>
            <div className="space-y-6 text-white/80">
              
              <div className="bg-emerald-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function properly and cannot be disabled.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Authentication and security</li>
                  <li>Form submission and data processing</li>
                  <li>Basic website functionality</li>
                </ul>
              </div>

              <div className="bg-blue-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Analytics Cookies</h3>
                <p>These help us understand how visitors interact with our website.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Website traffic analysis</li>
                  <li>Popular content identification</li>
                  <li>User behavior patterns</li>
                  <li>Performance optimization</li>
                </ul>
              </div>

              <div className="bg-purple-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Functional Cookies</h3>
                <p>These enhance functionality and personalization.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Language preferences</li>
                  <li>Region and location settings</li>
                  <li>Contact form preferences</li>
                  <li>Newsletter subscription status</li>
                </ul>
              </div>

              <div className="bg-orange-900/20 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-orange-300 mb-2">Marketing Cookies</h3>
                <p>These track your activity to provide relevant advertising.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Interest-based content</li>
                  <li>Social media integration</li>
                  <li>YouTube video preferences</li>
                  <li>Campaign effectiveness tracking</li>
                </ul>
              </div>

            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">3. Third-Party Cookies</h2>
            <div className="space-y-4 text-white/80">
              <p>We may use third-party services that place cookies on your device:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
                <li><strong>YouTube:</strong> Embedded video content and viewing preferences</li>
                <li><strong>Social Media Platforms:</strong> Social sharing and integration features</li>
                <li><strong>Supabase:</strong> Database and authentication services</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">4. Managing Your Cookie Preferences</h2>
            <div className="space-y-4 text-white/80">
              <p>You can control and manage cookies in several ways:</p>
              
              <h3 className="text-lg font-semibold text-emerald-300">Browser Settings</h3>
              <p>Most browsers allow you to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>View and delete cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block third-party cookies</li>
                <li>Clear all cookies when you close the browser</li>
              </ul>

              <h3 className="text-lg font-semibold text-emerald-300 mt-4">Opt-Out Links</h3>
              <p>You can opt out of specific tracking:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Google Analytics: <span className="text-emerald-300">tools.google.com/dlpage/gaoptout</span></li>
                <li>YouTube: Manage settings in your Google account</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">5. Cookie Retention</h2>
            <div className="space-y-4 text-white/80">
              <p>Different cookies have different lifespans:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 1-24 months)</li>
                <li><strong>Analytics Cookies:</strong> Usually expire after 2 years</li>
                <li><strong>Marketing Cookies:</strong> May persist for up to 2 years</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">6. Updates to This Policy</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">7. Contact Us</h2>
            <div className="space-y-4 text-white/80">
              <p>
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-emerald-900/20 p-4 rounded-lg">
                <p><strong>EcoPal Engineering (Pvt) Ltd</strong></p>
                <p>Email: privacy@ecopalengineering.com</p>
                <p>Phone: +94 71 800 1885</p>
                <p>Address: Colombo, Sri Lanka</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}