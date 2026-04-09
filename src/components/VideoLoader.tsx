import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Leaf, Sun, Wind } from 'lucide-react';

interface VideoLoaderProps {
  onComplete: () => void;
}

export function VideoLoader({ onComplete }: VideoLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing EcoPal Universe...",
    "Loading Sustainable Solutions...",
    "Preparing Renewable Energy Data...",
    "Almost Ready..."
  ];

  const icons = [Zap, Leaf, Sun, Wind];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [onComplete, loadingTexts.length]);

  return (
    <motion.div 
      className="fixed inset-0 bg-[#0B3D2E] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <div className="relative mx-auto w-24 h-24">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-full h-full bg-[#0B3D2E] rounded-full flex items-center justify-center m-1">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                {icons.map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    animate={{
                      opacity: currentText === index ? 1 : 0,
                      scale: currentText === index ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="text-5xl font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          EcoPal
        </motion.h1>

        {/* Loading Text */}
        <motion.div
          className="h-8 mb-8"
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/80 text-lg">
            {loadingTexts[currentText]}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="bg-white/10 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-emerald-300 text-sm">
            {progress}%
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/60 rounded-full"
              style={{
                left: `${20 + (i * 5)}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}