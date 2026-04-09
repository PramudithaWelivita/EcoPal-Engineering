import { ArrowLeft, Play, Users, Target, Zap, Leaf, Calendar, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WatchOurStoryProps {
  onBack: () => void;
  onNavigate?: (page: 'projects') => void;
}

export function WatchOurStory({ onBack, onNavigate }: WatchOurStoryProps) {
  const timelineEvents = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded with a vision to transform Sri Lanka's energy landscape through sustainable solutions.",
      icon: Target
    },
    {
      year: "2021", 
      title: "First Biogas Systems",
      description: "Successfully implemented our first biogas systems for rural communities, reducing waste and providing clean energy.",
      icon: Zap
    },
    {
      year: "2022",
      title: "Agricultural Revolution",
      description: "Expanded into sustainable agriculture solutions, helping farmers increase yields while protecting the environment.",
      icon: Leaf
    },
    {
      year: "2023",
      title: "Tech Innovation",
      description: "Launched cutting-edge monitoring systems and IoT solutions for smart energy management.",
      icon: TrendingUp
    },
    {
      year: "2024",
      title: "Community Impact",
      description: "Reached 500+ installations across Sri Lanka, impacting thousands of lives and reducing carbon footprint.",
      icon: Users
    }
  ];

  const impactStats = [
    { number: "500+", label: "Installations Completed", icon: Zap },
    { number: "50,000+", label: "Tons CO₂ Reduced", icon: Leaf },
    { number: "1,000+", label: "Families Impacted", icon: Users },
    { number: "5", label: "Years of Innovation", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-[#0B3D2E] text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Watch Our Story
          </h1>
          <p className="text-white/70 mt-2">The journey of sustainable innovation in Sri Lanka</p>
        </div>
      </div>

      {/* Hero Video Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Our Journey Begins
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              From a small startup to Sri Lanka's leading renewable energy company, 
              discover how we're building a sustainable future one innovation at a time.
            </p>
          </motion.div>

          {/* Main Story Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=675&fit=crop"
              alt="EcoPal Engineering Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <Play className="w-8 h-8 text-white ml-1" />
              </motion.button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">The EcoPal Story</h3>
              <p className="text-white/80">Watch how we're transforming communities through sustainable energy</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Our Impact</h2>
            <p className="text-xl text-white/70">Numbers that tell our story</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 text-center hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-400 mb-2">{stat.number}</h3>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Our Journey</h2>
            <p className="text-xl text-white/70">Milestones that shaped EcoPal Engineering</p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-600"></div>
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-start mb-12 pl-20"
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full border-4 border-[#0B3D2E]"></div>
                
                {/* Content */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex-1 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                      <event.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-emerald-400 font-bold text-lg">{event.year}</span>
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To provide innovative, sustainable energy and agricultural solutions that empower communities, 
                protect the environment, and contribute to Sri Lanka's transition towards a greener future. 
                We believe that every installation should not just provide energy, but create lasting positive impact.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To be Sri Lanka's leading catalyst for sustainable development, creating a future where 
                renewable energy and eco-friendly agriculture are accessible to all. We envision communities 
                that are energy-independent, environmentally conscious, and economically prosperous.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Stories</h2>
            <p className="text-xl text-white/70">Real projects, real impact</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Video 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=338&fit=crop"
                alt="Biogas Installation Project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-lg font-bold text-white">Rural Biogas Success</h4>
                <p className="text-white/80 text-sm">How we transformed waste into energy for rural communities</p>
              </div>
            </motion.div>

            {/* Project Video 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-video bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden group"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574263867128-21d12f5e6c6e?w=600&h=338&fit=crop"
                alt="Smart Agriculture Project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </motion.button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-lg font-bold text-white">Smart Agriculture Revolution</h4>
                <p className="text-white/80 text-sm">Innovative farming solutions increasing yields sustainably</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Be Part of Our Story
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Join us in building a sustainable future for Sri Lanka. Whether you're a homeowner, 
              farmer, or business owner, we have solutions that can transform your energy future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3"
              >
                Get Started Today
              </Button>
              <Button 
                onClick={() => onNavigate?.('projects')}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
              >
                View Our Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}