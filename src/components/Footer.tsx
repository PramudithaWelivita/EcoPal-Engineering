import { motion } from 'framer-motion';
import { Youtube, Facebook, Instagram, Linkedin, MessageCircle, ArrowUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface FooterProps {
  onNavigate?: (page: 'privacy' | 'terms' | 'cookies') => void;
}

export function Footer({ onNavigate }: FooterProps = {}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-604c55a2/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setStatusMessage(result.message);
        setEmail('');
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message);
      }
    } catch (error) {
      console.log('Newsletter subscription error:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: MessageCircle, href: "https://wa.me/94718001885", label: "WhatsApp", color: "hover:text-green-500" }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Podcast", href: "#podcast" },
    { name: "Contact", href: "#contact" }
  ];

  const services = [
    { name: "Biogas Systems", href: "#services" },
    { name: "Agriculture Solutions", href: "#services" },
    { name: "Tech Solutions", href: "#services" },
    { name: "Future Services", href: "#services" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B3D2E] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo-white.png" alt="EcoPal Engineering Logo" className="h-12 w-auto" />
                <div>
                  <h3 className="text-2xl font-bold text-white">EcoPal</h3>
                  <p className="text-emerald-300 text-sm">Engineering (Pvt) Ltd</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering sustainability through innovation. We provide cutting-edge renewable energy 
                and sustainable agriculture solutions to build a greener tomorrow for Sri Lanka.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-gray-300 text-sm">
                <p>📞 071 800 1885</p>
                <p>✉️ info@ecopal.lk</p>
                <p>📍 255/3, Kandaliyaddapaluwa, Ganemulla</p>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <motion.div
          className="border-t border-white/10 py-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest in sustainable technology
            </p>
            
            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg border mb-4 ${
                  submitStatus === 'success' 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                    : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}
              >
                <div className="flex items-center justify-center">
                  {submitStatus === 'success' ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  )}
                  <span className="text-xs">{statusMessage}</span>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-full text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 disabled:opacity-50"
              />
              <Button 
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none rounded-l-none rounded-r-full px-6 disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm text-center md:text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              © 2025 EcoPal Engineering (Pvt) Ltd. All Rights Reserved.
            </motion.p>

            <motion.div
              className="flex items-center space-x-6 mt-4 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button 
                onClick={() => onNavigate?.('privacy')}
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => onNavigate?.('terms')}
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => onNavigate?.('cookies')}
                className="text-gray-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Cookie Policy
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}