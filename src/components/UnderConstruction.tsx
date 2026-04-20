import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Facebook, Instagram, Linkedin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { BuildingConstructionAnim } from './BuildingConstructionAnim';
import { Button } from './ui/button';

function ParticleField() {
  const particles = useRef(
    [...Array(60)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
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
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(52,211,153,${p.opacity})`,
          }}
          animate={{ opacity: [0, p.opacity, 0], y: [-10, -120], scale: [0, 1, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export function UnderConstruction() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50" },
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-500/20 hover:text-blue-500 hover:border-blue-500/50" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-pink-500/20 hover:text-pink-500 hover:border-pink-500/50" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-600/20 hover:text-blue-600 hover:border-blue-600/50" },
    { icon: MessageCircle, href: "https://wa.me/94718001885", label: "WhatsApp", color: "hover:bg-green-500/20 hover:text-green-500 hover:border-green-500/50" }
  ];

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;
      if (web3formsKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: 'New Notification Signup - EcoPal Engineering',
            from_name: 'EcoPal Website (Under Construction)',
            email: email,
            message: `${email} has requested to be notified when the site goes live!`
          })
        });
        const result = await response.json();

        if (result.success) {
          setSubmitStatus('success');
          setStatusMessage("You're on the list! We'll notify you soon.");
          setEmail('');
        } else {
          setSubmitStatus('error');
          setStatusMessage("Something went wrong. Try again.");
        }
      } else {
        // Fallback simulate delay if no key is present
        await new Promise(r => setTimeout(r, 1000));
        setSubmitStatus('success');
        setStatusMessage("Simulation mode: Thanks for subscribing!");
        setEmail('');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans"
      animate={{ backgroundColor: ["#f8fafc", "#ecfdf5", "#f0fdf4", "#f8fafc"] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Glow Top Left */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: '100vw', height: '100vw', top: '-40%', left: '-30%', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 60%)', filter: 'blur(100px)' }}
          animate={{ x: [0, 150, -50, 0], y: [0, 100, -100, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Glow Bottom Right */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: '90vw', height: '90vw', bottom: '-40%', right: '-30%', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 60%)', filter: 'blur(100px)' }}
          animate={{ x: [0, -150, 50, 0], y: [0, -100, 100, 0], scale: [1, 1.3, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Math Grid overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(52,211,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <ParticleField />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
        {/* Logo Reveal */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: -20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="mb-8 p-4 rounded-full bg-white/60 border border-emerald-100 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-shadow"
         >
           <img src="/logo-color.png" alt="EcoPal Engineering Logo" className="h-20 w-auto object-contain" />
         </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight"
        >
          EcoPal Engineering is Rebuilding for a <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700">
            Greener Future
          </span>
        </motion.h1>

        {/* Standalone Creative Illustration */}
        <BuildingConstructionAnim />

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-slate-600 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          Our digital experience is currently undergoing improvements to bring you seamless sustainable solutions. Connect with us on social media while we construct something amazing!
        </motion.p>

        {/* Social Icons Sidebar */}
        <motion.div
          className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 md:gap-4 z-50"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.2 } }
          }}
        >
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.5 } }
                }}
                whileHover={{ scale: 1.15, x: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 md:w-14 md:h-14 bg-white/80 border border-slate-200 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-500 transition-all duration-300 ${social.color} shadow-lg hover:shadow-xl`}
                title={social.label}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Status / Notify Me */}
        <motion.div
           className="w-full max-w-md bg-white border border-slate-100 backdrop-blur-lg rounded-2xl p-6 shadow-2xl relative overflow-hidden"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 1.6 }}
         >
           {/* subtle loading glow inside card */}
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50 animate-[translate_3s_linear_Infinity]" style={{ backgroundSize: '200% 100%' }}></div>

           <h3 className="text-slate-900 font-bold mb-2">Want to be notified?</h3>
           <p className="text-slate-500 text-sm mb-4">Leave your email and we'll buzz you when we're live.</p>

           <form onSubmit={handleNotifySubmit} className="flex relative">
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter your email"
               required
               disabled={isSubmitting}
               className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-14 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors disabled:opacity-50"
             />
             <Button
               type="submit"
               disabled={isSubmitting || !email.trim()}
               className="absolute right-1 top-1 bottom-1 h-auto text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 disabled:opacity-50 rounded-lg shadow-sm"
               variant="ghost"
             >
               {isSubmitting ? '...' : <Send className="w-4 h-4" />}
             </Button>
           </form>

           {/* Form Status Messages */}
           {submitStatus !== 'idle' && (
             <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`mt-4 flex items-center justify-center p-2 rounded-lg text-sm ${submitStatus === 'success'
                   ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                   : 'bg-red-50 text-red-600 border border-red-100'
                 }`}
             >
              {submitStatus === 'success' ? <CheckCircle className="w-4 h-4 mr-2" /> : <AlertCircle className="w-4 h-4 mr-2" />}
              {statusMessage}
            </motion.div>
          )}

        </motion.div>
      </div>
    </motion.div>
  );
}
