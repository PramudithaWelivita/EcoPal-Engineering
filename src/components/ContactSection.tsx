import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { sendDiscordLog } from '../utils/discordLogger';

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-604c55a2/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        // Log to Discord
        await sendDiscordLog({
          embeds: [{
            title: "New Contact Message",
            color: 0x10B981, // Emerald 500
            fields: [
              { name: "Name", value: `${formData.firstName} ${formData.lastName}` || "N/A", inline: true },
              { name: "Email", value: formData.email || "N/A", inline: true },
              { name: "Phone", value: formData.phone || "N/A", inline: true },
              { name: "Service Interest", value: formData.service || "N/A", inline: true },
              { name: "Message", value: formData.message || "N/A" }
            ],
            timestamp: new Date().toISOString()
          }]
        });

        setSubmitStatus('success');
        setStatusMessage(result.message);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setStatusMessage(result.message);
      }
    } catch (error) {
      console.log('Contact form submission error:', error);
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "071 800 1885",
      href: "tel:+94718001885",
      color: "text-emerald-600"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@ecopal.lk",
      href: "mailto:info@ecopal.lk",
      color: "text-teal-600"
    },
    {
      icon: MapPin,
      label: "Address",
      value: "255/3, Kandaliyaddapaluwa, Ganemulla",
      href: "#",
      color: "text-cyan-600"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/94718001885",
      color: "text-green-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-[#0B3D2E] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-emerald-300 text-sm">Get In Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's Build a
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"> Sustainable Future</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your energy and agriculture systems? Contact our experts 
            for a free consultation and discover how we can help you go green.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      submitStatus === 'success' 
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                        : 'bg-red-500/20 border-red-500/50 text-red-300'
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus === 'success' ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2" />
                      )}
                      <span className="text-sm">{statusMessage}</span>
                    </div>
                  </motion.div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">First Name *</label>
                    <Input 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Last Name *</label>
                    <Input 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Email *</label>
                  <Input 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Phone</label>
                  <Input 
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+94 71 234 5678"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Service Interest</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="biogas">Biogas Systems</option>
                    <option value="agriculture">Agriculture Solutions</option>
                    <option value="tech">Tech Solutions</option>
                    <option value="future">Future Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">Message *</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-emerald-400"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none py-3 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="group block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{item.label}</h4>
                        <p className="text-gray-300 text-sm">{item.value}</p>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h4 className="text-white font-semibold mb-4">Find Us</h4>
                <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20"></div>
                  <div className="relative z-10 text-center">
                    <MapPin className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <p className="text-white text-sm">255/3, Kandaliyaddapaluwa</p>
                    <p className="text-gray-300 text-sm">Ganemulla, Sri Lanka</p>
                  </div>
                  
                  {/* Interactive elements */}
                  <motion.div
                    className="absolute top-4 left-4 w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity 
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-6 right-6 w-2 h-2 bg-teal-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity 
                    }}
                  />
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  Open in Google Maps
                </Button>
              </Card>
            </motion.div>

            {/* Quick Action Buttons */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild
                className="bg-green-600 hover:bg-green-700 text-white border-none"
              >
                <a href="https://wa.me/94718001885" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-4 h-4" />
                  WhatsApp
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <a href="tel:+94718001885">
                  <Phone className="mr-2 w-4 h-4" />
                  Call Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}