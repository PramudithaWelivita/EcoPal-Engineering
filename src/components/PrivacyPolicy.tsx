import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
            Privacy Policy
          </h1>
          <p className="text-white/70 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-white/80">
              <p>
                At EcoPal Engineering (Pvt) Ltd, we collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information (name, email, phone number, address)</li>
                <li>Project details and technical requirements for renewable energy solutions</li>
                <li>Communication preferences and feedback</li>
                <li>Business information for B2B partnerships</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-white/80">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide renewable energy and sustainable agriculture consulting services</li>
                <li>Design and implement biogas systems and agricultural solutions</li>
                <li>Communicate about project updates and technical support</li>
                <li>Send newsletters about sustainable technology innovations</li>
                <li>Improve our services and develop new eco-friendly solutions</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties except:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To trusted partners who assist in providing our services</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">4. Data Security</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. Our systems use encryption 
                and secure protocols to safeguard your data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">5. Your Rights</h2>
            <div className="space-y-4 text-white/80">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">6. Cookies and Tracking</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                Please refer to our Cookie Policy for detailed information about our use of cookies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">7. Contact Information</h2>
            <div className="space-y-4 text-white/80">
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-emerald-900/20 p-4 rounded-lg">
                <p><strong>EcoPal Engineering (Pvt) Ltd</strong></p>
                <p>Email: info@ecopalengineering.com</p>
                <p>Phone: +94 71 800 1885</p>
                <p>Address: Colombo, Sri Lanka</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">8. Changes to This Policy</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}