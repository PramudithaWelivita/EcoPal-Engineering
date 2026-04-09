import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap, Leaf, Wind, Sun, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ThreeScene, Card3D, Float3D } from './ThreeScene';
import { VideoLoader } from './VideoLoader';
import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1673236394928-fdd8ec9d3619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcyNTEyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Renewable Energy",
      subtitle: "Innovation"
    },
    {
      image: "https://images.unsplash.com/photo-1657442731413-a9a27965c6bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZ1dHVyZSUyMGNpdHklMjBncmVlbiUyMGVuZXJneXxlbnwxfHx8fDE3NTcyNTEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Sustainable Future",
      subtitle: "Technology"
    },
    {
      image: "https://images.unsplash.com/photo-1725203653092-494c7eec1a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMGFic3RyYWN0fGVufDF8fHx8MTc1NzI1MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Eco Innovation",
      subtitle: "Excellence"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIsLoaded(true);
  };

  const floatingIcons = [
    { Icon: Zap, delay: 0, x: '20%', y: '20%' },
    { Icon: Leaf, delay: 1, x: '80%', y: '30%' },
    { Icon: Wind, delay: 2, x: '15%', y: '70%' },
    { Icon: Sun, delay: 3, x: '85%', y: '80%' },
  ];

  if (showLoader) {
    return <VideoLoader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="relative min-h-screen bg-[#0B3D2E] overflow-hidden">
      {/* Animated Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E]/95 via-[#0B3D2E]/85 to-teal-900/90"></div>
          </motion.div>
        ))}
      </div>

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0, rotateY: 0 }}
            animate={isLoaded ? {
              opacity: 1,
              scale: 1,
              rotateY: 360,
              y: [0, -20, 0],
              x: [0, 10, 0]
            } : {}}
            transition={{
              duration: 2,
              delay: delay * 0.5,
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <Icon className="w-10 h-10 text-emerald-300" />
          </motion.div>
        ))}
      </div>

      {/* Geometric 3D Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large rotating cube */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32"
          style={{ perspective: '1000px' }}
          animate={isLoaded ? {
            rotateX: [0, 360],
            rotateY: [0, 360],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-400/30 transform-gpu"
            style={{ transform: 'rotateX(45deg) rotateY(45deg)' }}>
          </div>
        </motion.div>

        {/* Floating spheres */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full backdrop-blur-sm"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
            animate={isLoaded ? {
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7]
            } : {}}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <ThreeScene className="max-w-6xl mx-auto px-6 text-center">
          {/* Brand Logo/Symbol */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1.5, ease: "backOut" }}
          >
            <div className="relative mx-auto w-48 h-48 mb-6 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl opacity-60"></div>
              <img src="/logo-white.png" alt="EcoPal Engineering Logo" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 100 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: "backOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6 leading-none">
              <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                EcoPal
              </span>
            </h1>
            <div className="text-3xl md:text-5xl font-bold text-white mb-4">
              Sri Lanka&apos;s Green Future
            </div>
            <div className="text-xl md:text-2xl text-emerald-300 font-medium">
              Sustainable • Innovative • Transformative
            </div>
          </motion.div>

          {/* Animated Text Carousel */}
          <motion.div
            className="mb-12 h-16 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="text-2xl md:text-3xl text-white/90 font-medium">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : -30
                  }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {slide.title} • {slide.subtitle}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {[
              { icon: Zap, title: "Renewable Energy", desc: "Clean power solutions" },
              { icon: Leaf, title: "Sustainable Agriculture", desc: "Smart farming systems" },
              { icon: Wind, title: "Green Technology", desc: "Future-ready innovations" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateX: -45 }}
                animate={isLoaded ? { opacity: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.7 + index * 0.2 }}
              >
                <Card3D
                  className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300"
                  depth={30}
                >
                  <Float3D
                    amplitude={10}
                    speed={4 + index}
                    className="flex flex-col items-center"
                  >
                    <feature.icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  </Float3D>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.desc}</p>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 2.5, ease: "backOut" }}
          >
            {/* Video Play Button */}
            <motion.div
              className="relative mx-auto w-32 h-32 mb-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-emerald-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse"></div>
              <Button
                onClick={onEnter}
                className="relative w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-full border-4 border-white/20 shadow-2xl"
              >
                <Play className="w-12 h-12 text-white ml-2" fill="currentColor" />
              </Button>
            </motion.div>

            <div className="text-white/80 text-lg mb-8">
              Experience the Future of Sustainable Engineering
            </div>

            {/* Enter Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onEnter}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none px-12 py-4 rounded-full text-xl font-semibold shadow-2xl shadow-emerald-500/30"
              >
                Enter EcoPal Universe
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </motion.div>

            <div className="text-emerald-300/60 text-sm">
              Discover sustainable solutions that transform communities
            </div>
          </motion.div>
        </ThreeScene>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index
                  ? 'bg-emerald-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
                }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={onEnter}
      >
        <div className="flex flex-col items-center text-white/60 hover:text-emerald-300 transition-colors">
          <div className="text-sm mb-2">Enter Site</div>
          <ChevronDown className="w-6 h-6" />
        </div>
      </motion.div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D2E]/50 via-transparent to-[#0B3D2E]/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3D2E]/30 via-transparent to-[#0B3D2E]/30 pointer-events-none"></div>
    </div>
  );
}