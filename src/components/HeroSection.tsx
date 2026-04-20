import { motion } from 'framer-motion';
import { ArrowRight, Zap, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  onNavigate?: (page: 'consultation' | 'story') => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps = {}) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1673236394928-fdd8ec9d3619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMHdpbmQlMjB0dXJiaW5lcyUyMHJlbmV3YWJsZSUyMGVuZXJneXxlbnwxfHx8fDE3NTY5OTAxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Renewable Energy Infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E]/90 via-[#0B3D2E]/70 to-teal-900/80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating Icons */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-emerald-400/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-8 h-8 text-emerald-300" />
        </motion.div>

        <motion.div
          className="absolute top-32 right-16 w-20 h-20 bg-teal-400/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          animate={{
            y: [0, 30, 0],
            x: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Leaf className="w-10 h-10 text-teal-300" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 w-12 h-12 bg-cyan-400/20 backdrop-blur-sm rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 right-32 w-14 h-14 bg-emerald-500/20 backdrop-blur-sm rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 0.8, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-emerald-300 text-sm">Sustainable Innovation Leader</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Empowering
            </span>
            <br />
            <span className="text-white">Sustainability</span>
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Through Innovation
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Leading Sri Lanka's renewable energy revolution with cutting-edge biogas systems,
            sustainable agriculture solutions, and smart technologies for a greener tomorrow.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onNavigate?.('consultation')}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none px-8 py-3 rounded-full shadow-2xl shadow-emerald-500/25"
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => onNavigate?.('story')}
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full"
              >
                Watch Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-300">500+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-300">50MW</div>
              <div className="text-gray-300">Clean Energy Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">100%</div>
              <div className="text-gray-300">Eco-Friendly Solutions</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
}