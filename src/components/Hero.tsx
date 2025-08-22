import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import { useImageAccessibility } from "@/hooks/use-image-accessibility";
import profilePhoto from "@/assets/computer.jpg";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks";
import Parallax from "./Parallax";

const Hero = () => {
  const { data: profile } = useProfile();

  const remoteProfileImage = profile?.user?.profile_photo ? `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${profile.user.profile_photo}` : null;
  const { finalImage: profileImage, isLoading: imageLoading } = useImageAccessibility(remoteProfileImage, profilePhoto);
  const fullName = profile?.user ? `${profile.user.first_name} ${profile.user.last_name}`.trim() || profile.user.username : "Vishal Chouhan";
  const bio = profile?.user?.bio || "Experienced Python Developer specializing in cloud technologies with a 3+ year track record of delivering scalable solutions. Passionate about backend development, DevOps, and building robust APIs. Always eager to learn and adapt to new challenges in the tech landscape.";
  const email = profile?.user?.email || "chouhanvishal273@gmail.com";

  const getSocialLink = (platform: string) => {
    return profile?.social_links?.find(link => 
      link.platform.toLowerCase() === platform.toLowerCase() && link.is_active
    )?.url;
  };

  const resumeLink = getSocialLink('resume');

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden pb-8 lg:pb-16 py-8 lg:py-16">
      {/* Animated background with parallax */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating elements with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.3} direction="up">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-gradient-1 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
        
        <Parallax speed={0.5} direction="down">
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-2 rounded-full blur-3xl opacity-20"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
        
        <Parallax speed={0.2} direction="left">
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-3 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
        
        <Parallax speed={0.4} direction="right">
          <motion.div
            className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-4 rounded-full blur-3xl opacity-10"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </Parallax>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16 w-full">
          {/* Profile Image with parallax */}
          <Parallax speed={0.2} direction="right">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" as const }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative group max-w-full perspective-1000">
                <div className="absolute inset-0 bg-gradient-1 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 scale-90 animate-pulse-slow"></div>
                <motion.div
                  className="relative"
                  whileHover={{ rotateY: 10, rotateX: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {imageLoading ? (
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover border-4 border-white/20 shadow-neon group-hover:border-white/40 transition-all duration-500 max-w-full animate-morph"
                    />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </motion.div>
              </div>
            </motion.div>
          </Parallax>
          
          {/* Hero Content with parallax */}
          <Parallax speed={0.4} direction="left">
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight break-words"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 } as const}
            >
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent break-words">
                {fullName}
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 } as const}
            >
              {bio}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 } as const}
            >
              <a href={`mailto:${email}`}>
                <Button size="lg" className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <Mail className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Get In Touch
                </Button>
              </a>

              {resumeLink && (
                <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </Button>
                </a>
              )}
            </motion.div>
            
            {/* Social Links - Excluding Resume */}
            <motion.div 
              className="flex justify-center lg:justify-start mb-8 lg:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 } as const}
            >
              <SocialLinks 
                maxLinks={6}
                variant="default"
                iconSize="md"
                className="justify-center lg:justify-start"
                excludeResume={true}
              />
            </motion.div>
            </motion.div>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Hero;