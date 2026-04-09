import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  onNavigate?: (page: 'story' | 'consultation') => void;
}

export function Navigation({ onNavigate }: NavigationProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { name: 'Biogas Systems', desc: 'Installation & maintenance of biogas systems' },
    { name: 'Agriculture Solutions', desc: 'Eco-friendly bio-fertilizers & sustainable farming' },
    { name: 'Tech Solutions', desc: 'Smart gardening & greenhouse systems' },
    { name: 'Future Services', desc: 'Hybrid renewable energy solutions' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="/logo-white.png" alt="EcoPal Engineering Logo" className="h-14 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-white">EcoPal</h1>
              <p className="text-xs text-emerald-300">Engineering</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-emerald-300 transition-colors">Home</a>
            <button 
              onClick={() => onNavigate?.('story')}
              className="text-white hover:text-emerald-300 transition-colors"
            >
              Our Story
            </button>
            <a href="#podcast" className="text-white hover:text-emerald-300 transition-colors">Podcast</a>
            <a href="#about" className="text-white hover:text-emerald-300 transition-colors">About Us</a>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center text-white hover:text-emerald-300 transition-colors"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                Our Services <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              
              {servicesOpen && (
                <motion.div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {services.map((service, index) => (
                    <a
                      key={index}
                      href={`#services`}
                      className="block p-3 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                      <h4 className="text-white group-hover:text-emerald-300">{service.name}</h4>
                      <p className="text-sm text-gray-300 mt-1">{service.desc}</p>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
            
            <a href="#contact" className="text-white hover:text-emerald-300 transition-colors">Contact Us</a>
            
            <Button 
              onClick={() => onNavigate?.('consultation')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none"
            >
              Get Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="md:hidden bg-white/10 backdrop-blur-md rounded-lg mt-2 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-white hover:text-emerald-300 transition-colors">Home</a>
              <button 
                onClick={() => {
                  onNavigate?.('story');
                  setIsOpen(false);
                }}
                className="text-white hover:text-emerald-300 transition-colors text-left"
              >
                Our Story
              </button>
              <a href="#podcast" className="text-white hover:text-emerald-300 transition-colors">Podcast</a>
              <a href="#about" className="text-white hover:text-emerald-300 transition-colors">About Us</a>
              <a href="#services" className="text-white hover:text-emerald-300 transition-colors">Our Services</a>
              <a href="#contact" className="text-white hover:text-emerald-300 transition-colors">Contact Us</a>
              <Button 
                onClick={() => {
                  onNavigate?.('consultation');
                  setIsOpen(false);
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none w-full"
              >
                Get Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}