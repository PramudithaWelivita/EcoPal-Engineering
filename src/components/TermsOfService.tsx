import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            Terms of Service
          </h1>
          <p className="text-white/70 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">1. Agreement to Terms</h2>
            <div className="space-y-4 text-white/80">
              <p>
                By accessing and using the services of EcoPal Engineering (Pvt) Ltd, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">2. Description of Services</h2>
            <div className="space-y-4 text-white/80">
              <p>EcoPal Engineering provides:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Renewable energy system design and installation</li>
                <li>Biogas system development and maintenance</li>
                <li>Sustainable agriculture solutions</li>
                <li>Environmental consulting services</li>
                <li>Technical support and training</li>
                <li>Research and development in green technologies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">3. Project Terms and Conditions</h2>
            <div className="space-y-4 text-white/80">
              <h3 className="text-lg font-semibold text-emerald-300">3.1 Project Scope</h3>
              <p>
                All project specifications, timelines, and deliverables will be clearly defined in separate project agreements. Changes to project scope may result in additional costs and timeline adjustments.
              </p>
              
              <h3 className="text-lg font-semibold text-emerald-300">3.2 Payment Terms</h3>
              <p>
                Payment schedules will be outlined in individual project contracts. Standard terms include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Initial deposit required before project commencement</li>
                <li>Progress payments based on project milestones</li>
                <li>Final payment upon project completion and acceptance</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">4. Warranties and Guarantees</h2>
            <div className="space-y-4 text-white/80">
              <p>
                We provide warranties on our installations and services as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Equipment warranties as per manufacturer specifications</li>
                <li>Installation workmanship warranty for 12 months</li>
                <li>System performance guarantees based on agreed specifications</li>
                <li>Ongoing technical support during warranty period</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">5. Limitation of Liability</h2>
            <div className="space-y-4 text-white/80">
              <p>
                EcoPal Engineering's liability is limited to the value of the specific project or service provided. We are not liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or business interruption</li>
                <li>Damages caused by force majeure events</li>
                <li>Issues arising from client modifications to our systems</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">6. Intellectual Property</h2>
            <div className="space-y-4 text-white/80">
              <p>
                All designs, methodologies, and proprietary technologies developed by EcoPal Engineering remain our intellectual property. Clients receive usage rights for their specific installations but not ownership of the underlying intellectual property.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">7. Environmental Compliance</h2>
            <div className="space-y-4 text-white/80">
              <p>
                All our projects comply with local environmental regulations and sustainability standards. Clients are responsible for obtaining necessary permits and approvals for their projects.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">8. Termination</h2>
            <div className="space-y-4 text-white/80">
              <p>
                Either party may terminate services with written notice. Termination terms and conditions will be specified in individual project agreements, including payment for work completed and return of materials.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">9. Governing Law</h2>
            <div className="space-y-4 text-white/80">
              <p>
                These terms are governed by the laws of Sri Lanka. Any disputes will be resolved through arbitration in Colombo, Sri Lanka.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-4">10. Contact Information</h2>
            <div className="space-y-4 text-white/80">
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-emerald-900/20 p-4 rounded-lg">
                <p><strong>EcoPal Engineering (Pvt) Ltd</strong></p>
                <p>Email: legal@ecopalengineering.com</p>
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