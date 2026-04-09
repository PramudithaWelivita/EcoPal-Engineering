import { motion } from 'framer-motion';
import { Factory, Sprout, Cpu, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ServicesSection() {
  const services = [
    {
      icon: Factory,
      title: "Biogas Systems",
      description: "Installation & maintenance of biogas systems",
      details: "Complete biogas plant solutions from design to implementation. Convert organic waste into clean energy with our advanced biogas technology.",
      image: "https://images.unsplash.com/photo-1597173942310-1f9532d282c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxiaW9nYXMlMjBwbGFudCUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5fGVufDF8fHx8MTc1NzAwMzc5MXww&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-green-400 to-emerald-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Sprout,
      title: "Agriculture Solutions",
      description: "Eco-friendly bio-fertilizers & sustainable farming",
      details: "Revolutionary bio-fertilizers and sustainable farming techniques that increase yield while protecting the environment.",
      image: "https://images.unsplash.com/photo-1737943052554-2894fb46f3ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdXN0YWluYWJsZSUyMGZhcm1pbmclMjBvcmdhbmljJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU3MDQ5ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Cpu,
      title: "Tech Solutions",
      description: "Smart gardening & greenhouse systems",
      details: "IoT-enabled smart greenhouse systems with automated climate control, irrigation, and monitoring for optimal crop growth.",
      image: "https://images.unsplash.com/photo-1651478853726-a0daf0c4a6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWFydCUyMGdyZWVuaG91c2UlMjBhZ3JpY3VsdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU3MDQ5ODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-teal-400 to-cyan-600",
      bgColor: "bg-teal-50"
    },
    {
      icon: Zap,
      title: "Future Services",
      description: "Hybrid renewable energy solutions",
      details: "Next-generation hybrid renewable energy systems integrating solar, wind, ocean, and biogas technologies for maximum efficiency.",
      image: "https://images.unsplash.com/photo-1673236394928-fdd8ec9d3619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHdpbmQlMjB0dXJiaW5lcyUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NTY5OTAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: "from-cyan-400 to-blue-600",
      bgColor: "bg-cyan-50"
    }
  ];

  return (
    <section id="services" className="py-20 bg-[#0B3D2E] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
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
            <span className="text-emerald-300 text-sm">Our Services</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Comprehensive
            <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent"> Solutions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From biogas systems to smart agriculture, we provide end-to-end sustainable solutions 
            that drive innovation and environmental responsibility.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="relative bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden h-full flex flex-col">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60`}></div>
                  
                  {/* Floating Icon */}
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {service.description}
                  </p>
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                    {service.details}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></div>
                      Expert Installation
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2"></div>
                      24/7 Support
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                      Eco-Friendly
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 group-hover:border-emerald-400 group-hover:text-emerald-300 transition-all duration-300 mt-auto"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Ready to transform your energy and agriculture systems?
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none px-8 py-3 rounded-full shadow-2xl shadow-emerald-500/25"
          >
            Get Custom Quote
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}