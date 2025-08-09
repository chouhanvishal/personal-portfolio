import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Calendar, Code, ChevronLeft, ChevronRight, MessageCircle, Mail, Phone } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Projects = () => {
  const { data: profile } = useProfile();
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = profile?.projects?.filter(project => project.is_active) || [];
  
  // Responsive project display logic
  const getProjectsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile: 1 project
      if (window.innerWidth < 1024) return 2; // Tablet: 2 projects
      return 3; // Desktop: 3 projects
    }
    return 3; // Default for SSR
  };
  
  const [projectsPerSlide, setProjectsPerSlide] = useState(getProjectsPerSlide());
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newProjectsPerSlide = getProjectsPerSlide();
      if (newProjectsPerSlide !== projectsPerSlide) {
        setProjectsPerSlide(newProjectsPerSlide);
        setCurrentIndex(0); // Reset to first slide when changing layout
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projectsPerSlide]);

  // Auto-advance carousel
  useEffect(() => {
    if (totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentProjects = () => {
    const startIndex = currentIndex * projectsPerSlide;
    return projects.slice(startIndex, startIndex + projectsPerSlide);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  } as const;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          {/* Carousel Container */}
          <div className="relative">
            {/* Projects Grid */}
            <div className={`grid gap-8 px-4 md:px-16 ${
              projectsPerSlide === 1 ? 'grid-cols-1' : 
              projectsPerSlide === 2 ? 'md:grid-cols-2' : 
              'md:grid-cols-3'
            }`}>
              <AnimatePresence mode="wait">
                {getCurrentProjects().map((project, index) => (
                  <motion.div
                    key={`${currentIndex}-${project.id}`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.25, delay: index * 0.05 } as const}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.15 } as const
                    }}
                  >
                    <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 transform h-full overflow-hidden group flex flex-col">
                      <div className="p-8 flex flex-col h-full">
                        {/* Project Header */}
                        <motion.div 
                          className="mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-sm flex items-center">
                            <Code className="w-4 h-4 mr-2" />
                            {project.role}
                          </p>
                        </motion.div>
                        
                        {/* Project Description */}
                        <motion.p 
                          className="text-gray-300 mb-6 leading-relaxed text-lg flex-grow"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {project.description}
                        </motion.p>
                        
                        {/* Technologies */}
                        <motion.div 
                          className="flex flex-wrap gap-2 mb-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          {project.technologies.map((tech, techIndex) => (
                            <motion.div
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: 0.3 + techIndex * 0.05 } as const}
                              viewport={{ once: true }}
                            >
                              <Badge
                                variant="outline"
                                className="text-xs px-3 py-1 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-150"
                              >
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Project Links */}
                        <motion.div 
                          className="flex gap-3 mt-auto"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          viewport={{ once: true }}
                        >
                          {project.github_url && (
                            <motion.a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.4 }}
                              viewport={{ once: true }}
                            >
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-150 group"
                              >
                                <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                                Code
                              </Button>
                            </motion.a>
                          )}
                          {project.project_url && (
                            <motion.a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 }}
                              viewport={{ once: true }}
                            >
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 transition-all duration-150 group"
                              >
                                <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-150" />
                                Live Demo
                              </Button>
                            </motion.a>
                          )}
                        </motion.div>


                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <motion.div 
                className="flex justify-center mt-8 space-x-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {Array.from({ length: totalSlides }, (_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-150 ${
                      index === currentIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </motion.div>
            )}
            
            {/* Mobile Pagination Info */}
            {totalSlides > 1 && projectsPerSlide === 1 && (
              <motion.div 
                className="text-center mt-4 text-white/70 text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {currentIndex + 1} of {totalSlides} projects
              </motion.div>
            )}
          </div>

          {/* Call to action */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border border-white/20 group">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full opacity-30">
                <div className="w-full h-full" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 lg:p-12 overflow-hidden">
                <div className="max-w-4xl mx-auto w-full">
                  {/* Icon and Title */}
                  <motion.div 
                    className="flex flex-col items-center mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-150">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent break-words">
                      Ready to Build Something Amazing?
                    </h3>
                  </motion.div>

                  {/* Content Grid */}
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center w-full">
                    {/* Left Column - Description */}
                    <motion.div 
                      className="text-left"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <p className="text-white/90 text-lg leading-relaxed mb-6">
                        I specialize in Python development with expertise in AI/ML applications and DevOps practices. 
                        From intelligent web applications to automated deployment pipelines, I bring your ideas to life with cutting-edge technology.
                      </p>
                      
                      {/* Feature highlights */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white/80">Python AI/ML development</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-white/80">DevOps & CI/CD pipelines</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-white/80">Intelligent web applications</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <span className="text-white/80">Cloud deployment & automation</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Column - CTA */}
                    <motion.div 
                      className="text-center w-full"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 w-full overflow-hidden">
                        <h4 className="text-2xl font-bold text-white mb-4">
                          Let's Discuss
                        </h4>
                        <p className="text-white/80 mb-6">
                          Whether you have a specific idea or just want to explore possibilities, 
                          I'm here to help bring your vision to reality.
                        </p>
                        
                        {/* Contact buttons */}
                        <div className="space-y-4">
                          <a href="mailto:chouhanvishal273@gmail.com" className="block">
                            <Button 
                              size="lg"
                                                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-1 font-semibold group"
                            >
                              <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-150" />
                              Send Email
                            </Button>
                          </a>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <a href="tel:+917693813997" className="flex-1 min-w-0">
                              <Button 
                                variant="outline" 
                                size="lg"
                                className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-150 text-sm sm:text-base"
                              >
                                <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">Call</span>
                              </Button>
                            </a>
                            <a href="https://wa.me/7693813997" target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0">
                              <Button 
                                variant="outline" 
                                size="lg"
                                className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-150 text-sm sm:text-base"
                              >
                                <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                                <span className="truncate">WhatsApp</span>
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;