import { motion } from 'framer-motion';
import { Play, Youtube, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function PodcastSection() {
  const episodes = [
    {
      title: "Future of Renewable Energy in Sri Lanka",
      description: "Exploring the latest trends and opportunities in renewable energy sector",
      duration: "45:30",
      views: "12.5K"
    },
    {
      title: "Sustainable Agriculture Revolution",
      description: "How bio-fertilizers are changing farming practices across the island",
      duration: "38:15",
      views: "8.7K"
    },
    {
      title: "Smart Greenhouse Technologies",
      description: "IoT solutions that are revolutionizing modern agriculture",
      duration: "52:20",
      views: "15.2K"
    }
  ];

  return (
    <section id="podcast" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
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
            className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 border border-red-200 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Youtube className="w-4 h-4 text-red-600 mr-2" />
            <span className="text-red-700 text-sm">EcoPal Podcast</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0B3D2E] mb-6">
            Learn with Our
            <span className="bg-gradient-to-r from-red-600 to-emerald-600 bg-clip-text text-transparent"> Podcast</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us as we explore the latest innovations in renewable energy and sustainable agriculture. 
            Expert insights, industry trends, and practical solutions for a greener future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main Podcast Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="relative bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden">
              {/* Video Thumbnail */}
              <div className="relative h-64 bg-gradient-to-br from-[#0B3D2E] to-emerald-600 flex items-center justify-center">
                <motion.a
                  href="https://youtube.com/@ecopalengineering?si=LxkWNGhYINrc9MU0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                </motion.a>
                
                {/* Live Indicator */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-white text-sm">45:30</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0B3D2E] mb-2">
                  Latest Episode: Future of Renewable Energy
                </h3>
                <p className="text-gray-600 mb-4">
                  In this episode, we discuss the future of renewable energy in Sri Lanka 
                  and how EcoPal Engineering is leading the sustainable revolution.
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>12.5K views</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Youtube className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-gray-600">YouTube</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-700 hover:to-emerald-700 text-white border-none">
                  <a href="https://youtube.com/@ecopalengineering?si=LxkWNGhYINrc9MU0" target="_blank" rel="noopener noreferrer">
                    Watch on YouTube
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Episode List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-[#0B3D2E] mb-6">Recent Episodes</h3>
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <motion.div
                  key={index}
                  className="group p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Play Button */}
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#0B3D2E] group-hover:text-emerald-600 transition-colors mb-1">
                        {episode.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {episode.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{episode.duration}</span>
                        <span>•</span>
                        <span>{episode.views} views</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subscribe Button */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button 
                asChild
                variant="outline" 
                className="w-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <a href="https://youtube.com/@ecopalengineering?si=LxkWNGhYINrc9MU0" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 w-5 h-5" />
                  Subscribe to Our Channel
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Podcast Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">50+</div>
            <div className="text-gray-600">Episodes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600">25K+</div>
            <div className="text-gray-600">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-teal-600">100K+</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600">4.9</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}