import { motion } from 'framer-motion';

export function BuildingConstructionAnim() {
  return (
    <div className="relative w-full max-w-md mx-auto my-8 h-64 flex justify-center items-center">
      {/* Background soft glow for the illustration */}
      <div className="absolute inset-0 bg-emerald-100/50 rounded-full blur-3xl" />
      
      <svg viewBox="0 0 500 400" className="w-full h-full drop-shadow-xl relative z-10 overflow-visible">
        
        {/* Foundation / Platform */}
        <path d="M 150 320 L 350 320" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
        <path d="M 100 350 L 400 350" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
        
        {/* Holographic / Wireframe Eco-Dome being built */}
        <motion.path 
          d="M 150 320 A 100 100 0 0 1 350 320" 
          stroke="#10b981" 
          strokeWidth="3" 
          fill="none" 
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* The Structure being built (e.g. Wind Turbine / Tree structure inside the dome) */}
        <g stroke="#334155" strokeWidth="6" strokeLinecap="round">
          {/* Stem/Tower */}
          <motion.path 
            d="M 250 320 L 250 200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          {/* Leaves/Blades unfolding */}
          <motion.path 
            d="M 250 200 Q 200 150 180 180" 
            stroke="#059669"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.path 
            d="M 250 200 Q 300 150 320 180" 
            stroke="#059669"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </g>

        {/* Futuristic Construction Drone / Robotic Arm */}
        <motion.g
          animate={{ y: [-10, 10, -10], x: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Drone Body */}
          <rect x="300" y="80" width="40" height="20" rx="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" />
          <circle cx="310" cy="90" r="4" fill="#10b981">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </circle>
          {/* Drone Propellers */}
          <motion.ellipse cx="300" cy="75" rx="15" ry="3" fill="#94a3b8" opacity="0.5" animate={{ scaleX: [1, 0.2, 1] }} transition={{ duration: 0.1, repeat: Infinity }} />
          <motion.ellipse cx="340" cy="75" rx="15" ry="3" fill="#94a3b8" opacity="0.5" animate={{ scaleX: [1, 0.2, 1] }} transition={{ duration: 0.15, repeat: Infinity }} />
          
          {/* Laser beam constructing the dome */}
          <motion.path 
            d="M 320 100 L 250 150" 
            stroke="rgba(16, 185, 129, 0.4)" 
            strokeWidth="4" 
            strokeDasharray="10 5"
            animate={{ strokeDashoffset: [0, 50], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>

        {/* Floating Geometry / Magic Dust to make it feeling 'creative' */}
        {[...Array(6)].map((_, i) => (
          <motion.rect
            key={i}
            x={150 + Math.random() * 200}
            y={200 + Math.random() * 100}
            width="6"
            height="6"
            fill="#34d399"
            opacity="0.6"
            animate={{ 
              y: [0, -40, 0], 
              opacity: [0, 0.8, 0],
              rotate: [0, 90, 180] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </svg>
    </div>
  );
}
