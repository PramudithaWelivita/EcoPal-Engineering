import { ArrowLeft, Filter, MapPin, Calendar, Users, Zap, TrendingUp, Leaf, Award, Eye, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface ViewOurProjectsProps {
  onBack: () => void;
}

export function ViewOurProjects({ onBack }: ViewOurProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectCategories = [
    { id: 'all', name: 'All Projects', count: 24 },
    { id: 'biogas', name: 'Biogas Systems', count: 8 },
    { id: 'agriculture', name: 'Agriculture Solutions', count: 7 },
    { id: 'solar', name: 'Solar Energy', count: 6 },
    { id: 'tech', name: 'Tech Solutions', count: 3 }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Rural Community Biogas Plant",
      category: "biogas",
      location: "Kandy District",
      date: "2024",
      client: "Kandy Rural Development Society",
      image: "https://images.unsplash.com/photo-1662094248953-0507066d675d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9nYXMlMjBwbGFudCUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3NTcyNTAzODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Large-scale biogas installation serving 200+ households with clean cooking fuel and organic fertilizer production.",
      impact: {
        energyGenerated: "2,500 kWh/month",
        co2Reduced: "18 tons/year",
        beneficiaries: "200+ families"
      },
      tags: ["Biogas", "Community", "Waste Management"],
      featured: true
    },
    {
      id: 2,
      title: "Smart Greenhouse Automation",
      category: "agriculture",
      location: "Nuwara Eliya",
      date: "2024",
      client: "Highland Organic Farms",
      image: "https://images.unsplash.com/photo-1727099079513-952d40de9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGFncmljdWx0dXJlJTIwZ3JlZW5ob3VzZXxlbnwxfHx8fDE3NTcyNTAzODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "IoT-enabled greenhouse with automated climate control, nutrient delivery, and crop monitoring systems.",
      impact: {
        yieldIncrease: "40%",
        waterSaved: "30%",
        laborReduced: "50%"
      },
      tags: ["IoT", "Smart Agriculture", "Automation"],
      featured: true
    },
    {
      id: 3,
      title: "Solar Power Installation",
      category: "solar",
      location: "Colombo Suburb",
      date: "2024",
      client: "Green Manufacturing Ltd",
      image: "https://images.unsplash.com/photo-1652039796905-5579dcfa14d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGVuZXJneSUyMGZhcm18ZW58MXx8fHwxNzU3MjUwMzg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "500kW rooftop solar installation for manufacturing facility with grid-tie and battery backup systems.",
      impact: {
        energyGenerated: "650 MWh/year",
        costSavings: "$45,000/year",
        co2Reduced: "325 tons/year"
      },
      tags: ["Solar", "Commercial", "Grid-Tie"],
      featured: true
    }
  ];

  const allProjects = [
    ...featuredProjects,
    {
      id: 4,
      title: "Organic Farm Bio-fertilizer Unit",
      category: "agriculture",
      location: "Matale",
      date: "2024",
      client: "Eco Valley Farms",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZyUyMHN1c3RhaW5hYmxlfGVufDF8fHx8MTc1NzI1MDM5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Complete organic waste processing system producing high-quality bio-fertilizer for sustainable farming.",
      impact: {
        wasteProcessed: "500kg/day",
        fertilizerProduced: "100kg/day",
        farmYield: "+25%"
      },
      tags: ["Organic", "Bio-fertilizer", "Composting"],
      featured: false
    },
    {
      id: 5,
      title: "Residential Solar System",
      category: "solar",
      location: "Galle",
      date: "2024",
      client: "Green Home Initiative",
      image: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5ld2FibGUlMjBlbmVyZ3klMjBpbnN0YWxsYXRpb258ZW58MXx8fHwxNzU3MjUwMzk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "5kW residential solar installation with smart monitoring and battery storage for complete energy independence.",
      impact: {
        energyGenerated: "7,300 kWh/year",
        billReduction: "95%",
        paybackPeriod: "6 years"
      },
      tags: ["Residential", "Battery Storage", "Monitoring"],
      featured: false
    },
    {
      id: 6,
      title: "Wind-Solar Hybrid System",
      category: "tech",
      location: "Mannar",
      date: "2023",
      client: "Coastal Energy Cooperative",
      image: "https://images.unsplash.com/photo-1629707921873-e926840b5417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZSUyMGVuZXJneXxlbnwxfHx8fDE3NTcyNTA0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Innovative hybrid renewable energy system combining wind and solar power for coastal community electrification.",
      impact: {
        energyGenerated: "1,200 MWh/year",
        householdsServed: "350",
        reliability: "99.5%"
      },
      tags: ["Wind", "Solar", "Hybrid", "Community"],
      featured: false
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeFilter);

  const stats = [
    { label: "Projects Completed", value: "500+", icon: Award },
    { label: "Energy Generated", value: "50 GWh", icon: Zap },
    { label: "CO₂ Reduced", value: "25,000T", icon: Leaf },
    { label: "Satisfied Clients", value: "350+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-[#0B3D2E] text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Our Projects
              </h1>
              <p className="text-white/70 mt-2">Transforming communities through sustainable energy solutions</p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Stats */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Mobile Stats */}
          <div className="md:hidden grid grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-white/60 text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Sustainable Solutions in Action
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Explore our portfolio of renewable energy and sustainable agriculture projects 
              across Sri Lanka, each contributing to a greener, more sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Filters */}
      <section className="py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                variant={activeFilter === category.id ? "default" : "outline"}
                className={`${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                    : "border-white/20 text-white hover:bg-white/10"
                } transition-all duration-300`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.name}
                <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Featured Projects</h2>
            <p className="text-xl text-white/70">Showcase of our most impactful sustainable energy solutions</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald-500/90 text-white">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="bg-emerald-900/30 text-emerald-300 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <h4 className="text-sm font-semibold text-emerald-400 mb-2">Project Impact</h4>
                    <div className="space-y-1">
                      {Object.entries(project.impact).map(([key, value], impactIndex) => (
                        <div key={impactIndex} className="flex justify-between text-xs">
                          <span className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-16 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-white">All Projects</h2>
              <p className="text-white/70 mt-2">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-emerald-500/90 text-white text-xs">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="bg-emerald-900/20 text-emerald-300 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.date}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">{project.client}</span>
                    <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300 p-0">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-white/60">Try selecting a different category filter</p>
            </motion.div>
          )}
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
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Let's discuss how we can help you achieve your sustainability goals with our 
              proven renewable energy and agriculture solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3"
              >
                Get Free Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
              >
                Download Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}