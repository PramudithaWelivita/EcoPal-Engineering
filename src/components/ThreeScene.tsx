import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThreeSceneProps {
  children?: React.ReactNode;
  className?: string;
}

export function ThreeScene({ children, className = '' }: ThreeSceneProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`relative transform-gpu ${className}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      animate={{
        rotateY: mousePosition.x * 2,
        rotateX: -mousePosition.y * 2,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// 3D Card component
interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function Card3D({ children, className = '', depth = 50 }: Card3DProps) {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      whileHover={{
        rotateY: 15,
        rotateX: 10,
        translateZ: depth,
        scale: 1.05
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
}

// Floating 3D Element
interface Float3DProps {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  speed?: number;
  rotationSpeed?: number;
}

export function Float3D({ 
  children, 
  className = '', 
  amplitude = 20, 
  speed = 3, 
  rotationSpeed = 8 
}: Float3DProps) {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      animate={{
        y: [0, -amplitude, 0],
        rotateY: [0, 360],
        rotateZ: [0, 10, -10, 0]
      }}
      transition={{
        y: { duration: speed, repeat: Infinity, ease: "easeInOut" },
        rotateY: { duration: rotationSpeed, repeat: Infinity, ease: "linear" },
        rotateZ: { duration: speed * 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  );
}