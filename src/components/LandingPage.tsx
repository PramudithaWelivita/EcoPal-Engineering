// EcoPal LandingPage
import { motion, useMotionValue, useTransform, animate, useScroll } from 'framer-motion';
import {
  ArrowRight, Zap, Leaf, Wind, ChevronDown, Sparkles,
  Sun, Building2, Globe, TrendingUp, Shield, Cpu
} from 'lucide-react';
import { VideoLoader } from './VideoLoader';
import { useState, useEffect, useRef, useCallback } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const inView = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting && !inView.current) {
        inView.current = true;
        animate(count, to, { duration: 2.4, ease: [0.25, 0.46, 0.45, 0.94] });
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

/* ─────────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────────── */
function ParticleField() {
  const particles = useRef(
    [...Array(70)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 8,
      dur: Math.random() * 8 + 6,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: `rgba(52,211,153,${p.opacity})`,
          }}
          animate={{ opacity: [0, p.opacity, 0], y: [-10, -160], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED CITY ILLUSTRATION (Right Hero)
───────────────────────────────────────────── */
function CityIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 520, height: 520, background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{ width: 460, height: 460, borderColor: 'rgba(52,211,153,0.15)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full border"
        style={{ width: 360, height: 360, borderColor: 'rgba(45,212,191,0.12)' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* City SVG */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <svg width="420" height="380" viewBox="0 0 420 380" fill="none">
          {/* Ground glow */}
          <ellipse cx="210" cy="350" rx="180" ry="18" fill="rgba(52,211,153,0.15)" />

          {/* Building 1 – tall center */}
          <rect x="170" y="160" width="80" height="185" rx="4" fill="rgba(13,148,136,0.25)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
          <rect x="175" y="165" width="70" height="180" rx="3" fill="url(#buildingGrad1)" />
          {/* windows */}
          {[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2].map(c => (
            <motion.rect key={`${r}-${c}`} x={183 + c * 20} y={175 + r * 26} width="12" height="16" rx="2"
              fill={Math.random() > 0.3 ? 'rgba(52,211,153,0.7)' : 'rgba(52,211,153,0.15)'}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          )))}
          {/* Antenna */}
          <line x1="210" y1="160" x2="210" y2="120" stroke="rgba(52,211,153,0.8)" strokeWidth="2" />
          <motion.circle cx="210" cy="116" r="5" fill="#34d399"
            animate={{ opacity: [0.4, 1, 0.4], r: [4, 6, 4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Building 2 – left */}
          <rect x="70" y="210" width="60" height="135" rx="3" fill="url(#buildingGrad2)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
          {[0, 1, 2, 3].map(r => [0, 1].map(c => (
            <motion.rect key={`b2-${r}-${c}`} x={80 + c * 22} y={220 + r * 26} width="12" height="16" rx="2"
              fill={Math.random() > 0.4 ? 'rgba(52,211,153,0.6)' : 'rgba(52,211,153,0.1)'}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
            />
          )))}

          {/* Building 3 – right */}
          <rect x="295" y="225" width="55" height="120" rx="3" fill="url(#buildingGrad3)" stroke="rgba(45,212,191,0.3)" strokeWidth="1" />
          {[0, 1, 2].map(r => [0, 1].map(c => (
            <motion.rect key={`b3-${r}-${c}`} x={303 + c * 20} y={235 + r * 28} width="11" height="16" rx="2"
              fill={Math.random() > 0.35 ? 'rgba(45,212,191,0.65)' : 'rgba(45,212,191,0.1)'}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2 + Math.random() * 2.5, repeat: Infinity, delay: Math.random() * 2.5 }}
            />
          )))}

          {/* Building 4 – far left small */}
          <rect x="20" y="265" width="42" height="80" rx="3" fill="rgba(6,78,59,0.5)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />

          {/* Building 5 – far right small */}
          <rect x="358" y="270" width="38" height="75" rx="3" fill="rgba(6,78,59,0.5)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />

          {/* Solar Panels on rooftop */}
          {[-12, 0, 12].map((ox, i) => (
            <motion.rect key={`solar-${i}`} x={192 + ox} y={155} width="21" height="10" rx="2"
              fill="rgba(52,211,153,0.6)" stroke="rgba(52,211,153,0.9)" strokeWidth="0.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}

          {/* Wind Turbine – left */}
          <motion.g animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 230px' }}>
            <line x1="50" y1="196" x2="50" y2="222" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />
            <line x1="50" y1="196" x2="38" y2="212" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />
            <line x1="50" y1="196" x2="62" y2="212" stroke="rgba(52,211,153,0.4)" strokeWidth="1.5" />
            <circle cx="50" cy="210" r="3" fill="rgba(52,211,153,0.7)" />
          </motion.g>
          <line x1="50" y1="208" x2="50" y2="265" stroke="rgba(52,211,153,0.3)" strokeWidth="1.5" />

          {/* Wind Turbine – right */}
          <motion.g animate={{ rotate: [0, -360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '375px 240px' }}>
            <line x1="375" y1="208" x2="375" y2="232" stroke="rgba(45,212,191,0.4)" strokeWidth="1.5" />
            <line x1="375" y1="208" x2="362" y2="224" stroke="rgba(45,212,191,0.4)" strokeWidth="1.5" />
            <line x1="375" y1="208" x2="388" y2="224" stroke="rgba(45,212,191,0.4)" strokeWidth="1.5" />
            <circle cx="375" cy="222" r="3" fill="rgba(45,212,191,0.7)" />
          </motion.g>
          <line x1="375" y1="218" x2="375" y2="270" stroke="rgba(45,212,191,0.3)" strokeWidth="1.5" />

          {/* Energy beams between buildings */}
          <motion.path d="M130 290 Q160 260 170 270" stroke="rgba(52,211,153,0.4)" strokeWidth="1" fill="none"
            animate={{ opacity: [0, 0.8, 0], pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <motion.path d="M250 275 Q275 255 295 265" stroke="rgba(52,211,153,0.4)" strokeWidth="1" fill="none"
            animate={{ opacity: [0, 0.8, 0], pathLength: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />

          {/* Floating orbs / planets */}
          <motion.circle cx="340" cy="100" r="22"
            fill="rgba(16,185,129,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1"
            animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle cx="340" cy="100" r="14"
            fill="rgba(52,211,153,0.25)"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.circle cx="80" cy="145" r="16"
            fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"
            animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
          />

          {/* Road */}
          <rect x="0" y="345" width="420" height="8" rx="2" fill="rgba(6,78,59,0.4)" />
          <rect x="180" y="343" width="60" height="12" rx="2" fill="rgba(52,211,153,0.08)" />

          {/* Road lines */}
          {[60, 120, 180, 240, 300].map((x, i) => (
            <motion.rect key={`road-${i}`} x={x} y={348} width="25" height="2" rx="1"
              fill="rgba(52,211,153,0.2)"
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          {/* Gradient defs */}
          <defs>
            <linearGradient id="buildingGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(16,185,129,0.3)" />
              <stop offset="100%" stopColor="rgba(6,78,59,0.5)" />
            </linearGradient>
            <linearGradient id="buildingGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(13,148,136,0.3)" />
              <stop offset="100%" stopColor="rgba(6,78,59,0.45)" />
            </linearGradient>
            <linearGradient id="buildingGrad3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(45,212,191,0.25)" />
              <stop offset="100%" stopColor="rgba(6,78,59,0.4)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating stat badges */}
      <motion.div
        className="absolute top-12 right-4 flex items-center gap-2 px-3 py-2 rounded-xl border"
        style={{ background: 'rgba(5,150,80,0.15)', backdropFilter: 'blur(12px)', borderColor: 'rgba(52,211,153,0.3)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sun className="w-4 h-4 text-yellow-400" />
        <span className="text-xs font-semibold text-emerald-300">Solar Active</span>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-2 flex items-center gap-2 px-3 py-2 rounded-xl border"
        style={{ background: 'rgba(13,148,136,0.15)', backdropFilter: 'blur(12px)', borderColor: 'rgba(45,212,191,0.3)' }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <TrendingUp className="w-4 h-4 text-teal-300" />
        <span className="text-xs font-semibold text-teal-300">CO₂ −42%</span>
      </motion.div>

      <motion.div
        className="absolute top-32 left-0 flex items-center gap-2 px-3 py-2 rounded-xl border"
        style={{ background: 'rgba(6,182,212,0.12)', backdropFilter: 'blur(12px)', borderColor: 'rgba(6,182,212,0.25)' }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
      >
        <Globe className="w-4 h-4 text-cyan-300" />
        <span className="text-xs font-semibold text-cyan-300">Net Zero 2040</span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: Zap,
    title: 'Renewable Energy',
    desc: 'Next-generation solar, wind, and hydro systems engineered for maximum efficiency across Sri Lanka.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    bg: 'rgba(13,148,136,0.18)',
    border: 'rgba(52,211,153,0.2)',
  },
  {
    Icon: Leaf,
    title: 'Sustainable Agriculture',
    desc: 'IoT-powered smart farming that boosts yields, cuts waste, and respects the ecosystem.',
    color: '#86efac',
    glow: 'rgba(134,239,172,0.3)',
    bg: 'rgba(13,148,136,0.18)',
    border: 'rgba(134,239,172,0.2)',
  },
  {
    Icon: Wind,
    title: 'Green Technology',
    desc: 'Cutting-edge ecological innovations — from carbon capture to smart city infrastructure.',
    color: '#2dd4bf',
    glow: 'rgba(45,212,191,0.3)',
    bg: 'rgba(13,148,136,0.1)',
    border: 'rgba(45,212,191,0.2)',
  },
];

function FeatureCard({ Icon, title, desc, color, glow, bg, border }: typeof FEATURES[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative rounded-2xl p-8 cursor-default overflow-hidden h-full"
      style={{
        background: bg,
        border: `1px solid ${hovered ? color.replace(')', ',0.5)').replace('rgb', 'rgba') : border}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered ? `0 0 60px ${glow}, 0 20px 60px rgba(0,0,0,0.4)` : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s, border 0.4s',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* background glow blob */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${glow} 0%, transparent 60%)`, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* icon */}
      <motion.div
        className="relative mb-6 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: `rgba(${color === '#34d399' ? '52,211,153' : color === '#86efac' ? '134,239,172' : '45,212,191'},0.12)`, border: `1px solid ${border}` }}
        animate={hovered ? { boxShadow: `0 0 30px ${glow}` } : { boxShadow: 'none' }}
        transition={{ duration: 0.3 }}
      >
        <Icon style={{ color, width: 28, height: 28 }} />
      </motion.div>

      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{desc}</p>

      {/* bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        animate={hovered ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STATS
───────────────────────────────────────────── */
const STATS = [
  { value: 150, suffix: '+', label: 'Projects Delivered', Icon: Building2 },
  { value: 98, suffix: '%', label: 'Client Satisfaction', Icon: Shield },
  { value: 12, suffix: '+', label: 'Years of Excellence', Icon: TrendingUp },
  { value: 5000, suffix: '+', label: 'Tons CO₂ Saved', Icon: Globe },
];

/* ─────────────────────────────────────────────
   BIOGAS ILLUSTRATION — Premium SVG Animation
───────────────────────────────────────────── */
function BiogasIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ minHeight: 440 }}>

      {/* ── Outer glow ring ── */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ width: 480, height: 480, background: 'radial-gradient(circle, rgba(52,211,153,0.09) 0%, transparent 68%)' }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg width="520" height="430" viewBox="0 0 520 430" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          {/* digester body gradient */}
          <linearGradient id="digBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d4a2a" />
            <stop offset="50%" stopColor="#063318" />
            <stop offset="100%" stopColor="#031a0c" />
          </linearGradient>
          {/* dome gradient */}
          <linearGradient id="digDome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a6b3a" />
            <stop offset="100%" stopColor="#063318" />
          </linearGradient>
          {/* glass tank gradient */}
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(13,148,136,0.18)" />
            <stop offset="100%" stopColor="rgba(6,78,59,0.35)" />
          </linearGradient>
          {/* liquid inside digester */}
          <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(52,211,153,0.6)" />
            <stop offset="100%" stopColor="rgba(5,150,80,0.2)" />
          </linearGradient>
          {/* platform gradient */}
          <radialGradient id="platformGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0)" />
          </radialGradient>
          {/* organic content */}
          <radialGradient id="organicGrad" cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.3)" />
            <stop offset="100%" stopColor="rgba(6,78,59,0.1)" />
          </radialGradient>
          {/* fertilizer content */}
          <radialGradient id="fertGrad" cx="50%" cy="60%" r="55%">
            <stop offset="0%" stopColor="rgba(34,197,94,0.35)" />
            <stop offset="100%" stopColor="rgba(6,78,59,0.1)" />
          </radialGradient>
          {/* pipe glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Background arc rings ── */}
        {[180, 230, 280].map((r, i) => (
          <motion.circle key={`ring-${r}`} cx="260" cy="195" r={r}
            fill="none" stroke="rgba(52,211,153,0.06)" strokeWidth="1"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.01, 1] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
            style={{ transformOrigin: '260px 195px' }}
          />
        ))}
        {/* arc highlights */}
        <path d="M 100 195 A 160 160 0 0 1 420 195" fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="1" />
        <path d="M 70 195 A 190 190 0 0 1 450 195" fill="none" stroke="rgba(52,211,153,0.07)" strokeWidth="1" />

        {/* ── Glowing platform ── */}
        <ellipse cx="260" cy="385" rx="210" ry="18" fill="url(#platformGrad)" />
        <ellipse cx="260" cy="385" rx="210" ry="18" fill="none" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
        <motion.ellipse cx="260" cy="385" rx="190" ry="14" fill="none" stroke="rgba(52,211,153,0.2)" strokeWidth="0.5"
          animate={{ rx: [190, 200, 190], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* ══════════════════════════════════════
            LEFT TANK — Organic Waste
        ══════════════════════════════════════ */}
        {/* tank body */}
        <rect x="58" y="228" width="72" height="148" rx="6" fill="url(#glassGrad)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
        {/* tank top ellipse */}
        <ellipse cx="94" cy="228" rx="36" ry="10" fill="rgba(13,148,136,0.3)" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5" />
        {/* organic content fill */}
        <rect x="60" y="295" width="68" height="79" rx="4" fill="url(#organicGrad)" />
        {/* organic waste — leaf shapes */}
        <motion.g animate={{ rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: '94px 330px' }}>
          <ellipse cx="82" cy="335" rx="10" ry="14" fill="rgba(34,197,94,0.5)" transform="rotate(-20 82 335)" />
          <ellipse cx="96" cy="325" rx="9" ry="13" fill="rgba(34,197,94,0.45)" transform="rotate(10 96 325)" />
          <ellipse cx="108" cy="340" rx="8" ry="12" fill="rgba(34,197,94,0.4)" transform="rotate(-10 108 340)" />
          <ellipse cx="88" cy="350" rx="7" ry="10" fill="rgba(52,211,153,0.4)" transform="rotate(15 88 350)" />
        </motion.g>
        {/* inner glow */}
        <motion.ellipse cx="94" cy="310" rx="26" ry="30" fill="rgba(52,211,153,0.08)"
          animate={{ opacity: [0.05, 0.18, 0.05] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        {/* tank cap/top detail */}
        <rect x="78" y="218" width="32" height="10" rx="3" fill="rgba(6,78,59,0.8)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
        {/* glow on tank */}
        <motion.rect x="58" y="228" width="72" height="148" rx="6" fill="none"
          stroke="rgba(52,211,153,0.6)" strokeWidth="1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* ══════════════════════════════════════
            CENTRAL DIGESTER
        ══════════════════════════════════════ */}
        {/* main body */}
        <rect x="170" y="220" width="180" height="160" rx="12" fill="url(#digBody)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" />
        {/* dome */}
        <ellipse cx="260" cy="220" rx="90" ry="42" fill="url(#digDome)" stroke="rgba(52,211,153,0.6)" strokeWidth="1.5" />
        {/* dome highlight */}
        <ellipse cx="240" cy="205" rx="30" ry="12" fill="rgba(52,211,153,0.08)" />
        {/* dome top neck */}
        <rect x="252" y="174" width="16" height="28" rx="4" fill="rgba(13,148,136,0.6)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        {/* dome top cap */}
        <ellipse cx="260" cy="174" rx="12" ry="5" fill="rgba(16,185,129,0.4)" stroke="rgba(52,211,153,0.7)" strokeWidth="1" />

        {/* gas outlet pipe going up */}
        <rect x="257" y="120" width="6" height="55" rx="3" fill="rgba(13,148,136,0.7)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
        {/* outlet tip glow */}
        <motion.circle cx="260" cy="116" r="6" fill="#34d399" filter="url(#softGlow)"
          animate={{ r: [5, 8, 5], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />

        {/* liquid inside digester */}
        <clipPath id="digClip"><rect x="172" y="222" width="176" height="156" rx="10" /></clipPath>
        <g clipPath="url(#digClip)">
          <motion.rect x="172" y="310" width="176" height="68"
            fill="rgba(5,150,80,0.22)"
            animate={{ y: [310, 305, 310] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* liquid surface wave */}
          <motion.path
            d="M172 312 Q210 305 260 312 Q310 319 348 312"
            fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"
            animate={{ d: ['M172 312 Q210 305 260 312 Q310 319 348 312', 'M172 310 Q210 318 260 310 Q310 302 348 310', 'M172 312 Q210 305 260 312 Q310 319 348 312'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </g>

        {/* "BIOGAS" text label inside */}
        <text x="260" y="285" textAnchor="middle" fill="rgba(52,211,153,0.9)"
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 700, letterSpacing: '3px' }}>
          BIOGAS
        </text>
        <text x="260" y="302" textAnchor="middle" fill="rgba(52,211,153,0.55)"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 500, letterSpacing: '2.5px' }}>
          CLEAN ENERGY
        </text>

        {/* digester viewport window */}
        <ellipse cx="260" cy="260" rx="42" ry="18" fill="rgba(52,211,153,0.06)" stroke="rgba(52,211,153,0.25)" strokeWidth="1" />
        {/* window glow */}
        <motion.ellipse cx="260" cy="260" rx="42" ry="18" fill="none" stroke="rgba(52,211,153,0.35)" strokeWidth="1"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* glow on digester body */}
        <motion.rect x="170" y="220" width="180" height="160" rx="12" fill="none"
          stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* ══════════════════════════════════════
            RIGHT TANK — Fertilizer
        ══════════════════════════════════════ */}
        {/* tank body — slightly shorter */}
        <rect x="390" y="258" width="66" height="120" rx="6" fill="url(#glassGrad)" stroke="rgba(52,211,153,0.45)" strokeWidth="1.5" />
        {/* top ellipse */}
        <ellipse cx="423" cy="258" rx="33" ry="9" fill="rgba(13,148,136,0.28)" stroke="rgba(52,211,153,0.55)" strokeWidth="1.5" />
        {/* fertilizer content */}
        <rect x="392" y="315" width="62" height="61" rx="4" fill="url(#fertGrad)" />
        {/* plant stem */}
        <motion.g animate={{ rotate: [0, 2, 0, -2, 0] }} transition={{ duration: 3.5, repeat: Infinity }}
          style={{ transformOrigin: '423px 340px' }}>
          <line x1="423" y1="370" x2="423" y2="330" stroke="rgba(34,197,94,0.7)" strokeWidth="2" />
          {/* left leaf */}
          <ellipse cx="413" cy="342" rx="11" ry="7" fill="rgba(34,197,94,0.55)" transform="rotate(-30 413 342)" />
          {/* right leaf */}
          <ellipse cx="433" cy="336" rx="10" ry="7" fill="rgba(34,197,94,0.5)" transform="rotate(30 433 336)" />
          {/* top leaf */}
          <ellipse cx="423" cy="325" rx="8" ry="12" fill="rgba(52,211,153,0.55)" />
        </motion.g>
        {/* inner glow */}
        <motion.ellipse cx="423" cy="330" rx="24" ry="28" fill="rgba(52,211,153,0.07)"
          animate={{ opacity: [0.04, 0.15, 0.04] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
        {/* cap */}
        <rect x="409" y="249" width="28" height="9" rx="3" fill="rgba(6,78,59,0.8)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
        {/* glow */}
        <motion.rect x="390" y="258" width="66" height="120" rx="6" fill="none"
          stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"
          animate={{ opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.5 }}
        />

        {/* ══════════════════════════════════════
            PIPES — with animated flow dots
        ══════════════════════════════════════ */}
        {/* LEFT pipe: left-tank → digester */}
        <path d="M130 272 L152 272 L152 295 L170 295"
          stroke="rgba(52,211,153,0.45)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M130 272 L152 272 L152 295 L170 295"
          stroke="rgba(52,211,153,0.15)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* animated flow dot — left pipe */}
        <motion.circle r="4" fill="rgba(52,211,153,0.9)" filter="url(#glow)"
          animate={{ offsetDistance: ['0%', '100%'] }}
          style={{ offsetPath: "path('M130 272 L152 272 L152 295 L170 295')" } as any}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* RIGHT pipe: digester → right-tank */}
        <path d="M350 295 L368 295 L368 272 L390 272"
          stroke="rgba(52,211,153,0.45)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M350 295 L368 295 L368 272 L390 272"
          stroke="rgba(52,211,153,0.15)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* animated flow dot — right pipe */}
        <motion.circle r="4" fill="rgba(52,211,153,0.9)" filter="url(#glow)"
          animate={{ offsetDistance: ['0%', '100%'] }}
          style={{ offsetPath: "path('M350 295 L368 295 L368 272 L390 272')" } as any}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1.2 }}
        />

        {/* ══════════════════════════════════════
            GAS BUBBLES — rising from dome outlet
        ══════════════════════════════════════ */}
        {[
          { cx: 252, delay: 0, size: 7, dur: 2.8 },
          { cx: 266, delay: 0.7, size: 5, dur: 2.2 },
          { cx: 255, delay: 1.4, size: 9, dur: 3.2 },
          { cx: 263, delay: 2.1, size: 4, dur: 2.5 },
          { cx: 258, delay: 1.0, size: 6, dur: 2.9 },
        ].map(({ cx, delay, size, dur }, i) => (
          <motion.circle key={`bubble-${i}`} cx={cx} cy={115} r={size}
            fill="none" stroke="rgba(52,211,153,0.75)" strokeWidth="1.5"
            animate={{ cy: [115, 65, 40], opacity: [0, 0.9, 0], r: [size, size + 2, size + 4] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeOut' }}
          />
        ))}

        {/* ══════════════════════════════════════
            FLOATING UI LABELS (inline SVG foreignObject)
        ══════════════════════════════════════ */}
        {/* EcoPal Engineering — top center */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="185" y="46" width="150" height="30" rx="15"
            fill="rgba(5,150,80,0.2)" stroke="rgba(52,211,153,0.4)" />
          <circle cx="205" cy="61" r="7" fill="rgba(52,211,153,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
          <text x="217" y="65" fill="rgba(52,211,153,0.9)"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', fontWeight: 600 }}>
            EcoPal Engineering
          </text>
          <line x1="260" y1="76" x2="260" y2="116" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        </motion.g>

        {/* Organic Waste — left */}
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}>
          <rect x="18" y="172" width="110" height="30" rx="8"
            fill="rgba(5,150,80,0.18)" stroke="rgba(52,211,153,0.38)" />
          <circle cx="34" cy="187" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x="46" y="183" fill="rgba(52,211,153,0.85)"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 600 }}>
            Organic Waste
          </text>
          <circle cx="118" cy="187" r="3" fill="rgba(52,211,153,0.8)" />
          <line x1="128" y1="187" x2="90" y2="228" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        </motion.g>

        {/* Biogas Output — right */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 3.8, repeat: Infinity, delay: 1, ease: 'easeInOut' }}>
          <rect x="376" y="148" width="126" height="44" rx="8"
            fill="rgba(5,150,80,0.18)" stroke="rgba(52,211,153,0.38)" />
          <circle cx="392" cy="161" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x="405" y="158" fill="rgba(52,211,153,0.9)"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700 }}>
            Biogas Output
          </text>
          <circle cx="492" cy="161" r="3" fill="rgba(52,211,153,0.8)" />
          <text x="405" y="172" fill="rgba(52,211,153,0.5)"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px' }}>
            Renewable Energy
          </text>
          <line x1="376" y1="170" x2="348" y2="180" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        </motion.g>

        {/* Fertilizer — bottom right */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 4.2, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}>
          <rect x="390" y="398" width="110" height="44" rx="8"
            fill="rgba(5,150,80,0.18)" stroke="rgba(52,211,153,0.38)" />
          <circle cx="406" cy="411" r="6" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.4)" strokeWidth="1" />
          <text x="418" y="408" fill="rgba(52,211,153,0.9)"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 700 }}>
            Fertilizer
          </text>
          <text x="418" y="421" fill="rgba(52,211,153,0.5)"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '7.5px' }}>
            Organic &amp; Nutrient Rich
          </text>
          <line x1="390" y1="410" x2="440" y2="378" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="3 3" />
        </motion.g>

      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function LandingPage({ onEnter }: LandingPageProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
    setIsLoaded(true);
  }, []);

  if (showLoader) return <VideoLoader onComplete={handleLoaderComplete} />;

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto overflow-x-hidden"
      style={{ height: '100vh', fontFamily: 'Inter, sans-serif', background: '#040f0a' }}
    >
      {/* ══════════════════════════════════════════
          STICKY AURORA BACKGROUND
      ══════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* base deep dark */}
        <div className="absolute inset-0" style={{ background: '#040f0a' }} />

        {/* top radial glow */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(16,120,60,0.6) 0%, transparent 65%)' }} />

        {/* aurora blob 1 */}
        <motion.div className="absolute rounded-full"
          style={{ width: '80vw', height: '80vw', top: '-25%', left: '-25%', background: 'radial-gradient(circle, rgba(5,150,80,0.28) 0%, transparent 70%)', filter: 'blur(90px)' }}
          animate={{ x: [0, 100, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* aurora blob 2 */}
        <motion.div className="absolute rounded-full"
          style={{ width: '70vw', height: '70vw', bottom: '-20%', right: '-20%', background: 'radial-gradient(circle, rgba(13,148,136,0.22) 0%, transparent 70%)', filter: 'blur(90px)' }}
          animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
        {/* aurora blob 3 cyan */}
        <motion.div className="absolute rounded-full"
          style={{ width: '50vw', height: '50vw', top: '35%', left: '30%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', filter: 'blur(70px)' }}
          animate={{ x: [0, 50, -30, 0], y: [0, -50, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        />

        {/* grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(52,211,153,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 120% 120% at 50% 50%, transparent 35%, rgba(4,15,10,0.9) 100%)' }} />
      </div>

      {/* particles */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <ParticleField />
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2 — INTRODUCING BIOGAS
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center" style={{ zIndex: 10 }}>

        {/* ambient orb */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ width: 800, height: 800, background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 65%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          {/* label pill */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full border text-emerald-300 text-sm font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.28)', backdropFilter: 'blur(12px)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              New Technology
            </div>
          </motion.div>

          {/* split layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT — image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* glow behind image */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(52,211,153,0.14) 0%, transparent 70%)' }} />

              {/* floating badge */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ background: 'rgba(5,150,80,0.18)', backdropFilter: 'blur(16px)', borderColor: 'rgba(52,211,153,0.35)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-300 text-xs font-semibold tracking-widest uppercase">Biogas System Active</span>
              </motion.div>

              {/* biogas SVG illustration */}
              <div style={{ marginTop: 32, width: '100%', minHeight: 400, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <BiogasIllustration />
              </div>

              {/* floating stat badges */}
              <motion.div
                className="absolute top-4 right-0 lg:right-4 flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: 'rgba(5,150,80,0.18)', backdropFilter: 'blur(12px)', borderColor: 'rgba(52,211,153,0.35)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">CO₂ −42%</span>
              </motion.div>

              <motion.div
                className="absolute bottom-12 left-0 lg:-left-2 flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: 'rgba(13,148,136,0.18)', backdropFilter: 'blur(12px)', borderColor: 'rgba(45,212,191,0.35)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <Globe className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-semibold text-teal-300">Net Zero 2040</span>
              </motion.div>
            </motion.div>

            {/* RIGHT — text */}
            <motion.div
              className="flex flex-col lg:pl-16 xl:pl-20"
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h2
                className="font-black mb-6"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3.75rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="block text-white">Introducing</span>
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #2dd4bf 45%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>EcoPal BioGas</span>
              </h2>

              <p className="text-white/60 leading-[1.8] mb-8" style={{ fontSize: '1.0625rem', maxWidth: '34rem' }}>
                Our next-generation anaerobic digestion system converts organic waste into clean biogas energy and nutrient-rich fertilizer — a fully closed-loop solution designed for Sri Lanka's agricultural and municipal sectors.
              </p>

              {/* feature bullets */}
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: Zap, color: '#34d399', title: 'Clean Energy Output', desc: 'Converts organic waste to biogas, powering homes and industry with zero emissions.' },
                  { icon: Leaf, color: '#86efac', title: 'Organic Fertilizer', desc: 'Digestate by-product enriches farmland, replacing chemical fertilizers naturally.' },
                  { icon: Wind, color: '#2dd4bf', title: 'Smart Monitoring System', desc: 'Holographic UI with real-time sensors, remote control, and predictive maintenance.' },
                ].map(({ icon: Icon, color, title, desc }, i) => (
                  <motion.div
                    key={title}
                    className="flex gap-4 items-center p-4 rounded-2xl border"
                    style={{
                      background: 'rgba(52,211,153,0.04)',
                      borderColor: 'rgba(52,211,153,0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                    whileHover={{ borderColor: 'rgba(52,211,153,0.3)', background: 'rgba(52,211,153,0.08)' }}
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(52,211,153,0.1)`, border: `1px solid rgba(52,211,153,0.2)` }}
                    >
                      <Icon style={{ color, width: 18, height: 18 }} />
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-0.5" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9375rem' }}>{title}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="relative w-full flex justify-start pl-1">
                <motion.div
                  className="absolute -inset-2 rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.4), transparent 70%)' }}
                  animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                />
                <motion.button
                  onClick={onEnter}
                  className="group relative overflow-hidden rounded-full text-white font-bold"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    padding: '14px 36px',
                    background: 'linear-gradient(135deg, #059669 0%, #0d9488 55%, #0891b2 100%)',
                    boxShadow: '0 0 40px rgba(52,211,153,0.4), 0 8px 24px rgba(0,0,0,0.45)',
                    letterSpacing: '0.01em',
                  }}
                  whileHover={{
                    scale: 1.05, y: -2,
                    boxShadow: '0 0 70px rgba(52,211,153,0.6), 0 12px 36px rgba(0,0,0,0.45)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                  />
                  <span className="relative flex items-center gap-2.5">
                    Explore BioGas Solutions
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      
        {/* scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
          style={{ zIndex: 20 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/70 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.div>
      </section>

      

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO (SPLIT LAYOUT)
      ══════════════════════════════════════════ */}
      <section className="relative py-20" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── LEFT: TEXT ── */}
            <div className="flex flex-col items-start gap-3 mb-12">
              {/* eyebrow pill */}
              <motion.div
                className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)', backdropFilter: 'blur(12px)' }}
                initial={{ opacity: 0, y: -16 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-semibold tracking-widest uppercase">Sri Lanka's Green Future</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </motion.div>

              {/* main heading */}
              <motion.h1
                className="mb-6 font-black"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.6rem, 5vw, 4.5rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <span className="block text-white">Smart Cities</span>
                <span className="block" style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #2dd4bf 45%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Built on Green</span>
                <span className="block text-white">Innovation</span>
              </motion.h1>

              {/* subheading */}
              <motion.p
                className="mb-10 text-emerald-300 leading-[1.75]"
                style={{ fontSize: '1.0625rem', maxWidth: '32rem' }}
                initial={{ opacity: 0, y: 24 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                EcoPal Engineering pioneers sustainable technology — from renewable energy infrastructure to smart agriculture — building a cleaner, greener Sri Lanka for generations to come.
              </motion.p>

              {/* CTA row */}
              <motion.div
                className="flex flex-row items-center gap-4 mb-12"
                initial={{ opacity: 0, y: 24 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {/* primary glow button */}
                <div className="relative shrink-0 mt-6">
                  <motion.div
                    className="absolute -inset-2 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.45), transparent 70%)' }}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
                    transition={{ duration: 2.8, repeat: Infinity }}
                  />
                  <motion.button
                    onClick={onEnter}
                    className="group relative overflow-hidden rounded-full text-white font-bold"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1rem',
                      padding: '14px 32px',
                      background: 'linear-gradient(135deg, #059669 0%, #0d9488 55%, #0891b2 100%)',
                      boxShadow: '0 0 36px rgba(52,211,153,0.38), 0 6px 24px rgba(0,0,0,0.45)',
                      letterSpacing: '0.01em',
                    }}
                    whileHover={{
                      scale: 1.05, y: -2,
                      boxShadow: '0 0 64px rgba(52,211,153,0.6), 0 10px 36px rgba(0,0,0,0.45)',
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                    />
                    <span className="relative flex items-center gap-2.5">
                      Enter EcoPal Universe
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </div>

                {/* divider */}
                <div className="w-px h-8 shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />

                {/* secondary: explore */}
                <motion.button
                  className="inline-flex items-center gap-1.5 shrink-0"
                  style={{ color: 'rgba(52,211,153,0.75)', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.01em' }}
                  whileHover={{ color: 'rgba(52,211,153,1)', x: 3 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  Explore our work
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>

              {/* social proof strip */}
              <motion.div
                className="flex items-center gap-0 pt-8 border-t w-full"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 1.1 }}
              >
                {[
                  { n: '150+', l: 'Projects' },
                  { n: '98%', l: 'Satisfaction' },
                  { n: '12+', l: 'Years Experience' },
                ].map(({ n, l }, i) => (
                  <div key={l} className="flex items-center px-6">
                    <div className="flex flex-col gap-1" style={{ minWidth: 90 }}>
                      <span
                        className="font-black leading-none"
                        style={{
                          fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', textShadow: '0 0 10px rgba(52,211,153,0.4)',
                          background: 'linear-gradient(135deg, #34d399, #2dd4bf)',
                          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                        }}
                      >{n}</span>
                      <span className="text-white/70 font-medium" style={{ fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{l}</span>
                    </div>
                    {i < 2 && <div className="self-stretch w-px mx-8" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: CITY ILLUSTRATION ── */}
            <motion.div
              className="relative flex items-center justify-center"
              style={{ minHeight: 520 }}
              initial={{ opacity: 0, x: 48 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* logo badge — floats above illustration */}
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border"
                style={{ background: 'rgba(5,150,80,0.14)', backdropFilter: 'blur(16px)', borderColor: 'rgba(52,211,153,0.28)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div
                  className="overflow-hidden border bg-white/5 flex items-center justify-center p-1"
                  style={{ width: 28, height: 28, borderRadius: 8, borderColor: 'rgba(52,211,153,0.3)', aspectRatio: '1/1' }}
                >
                  <img src="/logo-white.png" alt="EcoPal" className="w-full h-full object-contain" style={{ aspectRatio: '1/1' }} />
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>EcoPal Engineering</span>
              </motion.div>

              <CityIllustration />
            </motion.div>
          </div>
        </div>

        
      </section>

      {/* ── Corner branding ── */}
      <motion.div
        className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full border"
        style={{ background: 'rgba(5,150,80,0.1)', backdropFilter: 'blur(16px)', borderColor: 'rgba(52,211,153,0.2)' }}
        initial={{ opacity: 0, x: 30 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="w-7 h-7 rounded-md overflow-hidden border border-emerald-400/30 bg-white/5 flex items-center justify-center p-0.5" style={{ aspectRatio: '1/1' }}>
          <img src="/logo-white.png" alt="EcoPal" className="w-full h-full object-contain" style={{ aspectRatio: '1/1' }} />
        </div>
        <span className="text-white/80 text-sm font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>EcoPal</span>
      </motion.div>

      {/* ── Corner tag ── */}
      <motion.div
        className="fixed top-5 left-5 z-50 text-emerald-500/50 text-xs tracking-widest uppercase font-medium"
        initial={{ opacity: 0, x: -20 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        Sri Lanka&apos;s Green Future
      </motion.div>
    </div>
  );
}