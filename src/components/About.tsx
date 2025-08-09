import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, Award, Building2, Clock, Star, TrendingUp, ExternalLink } from "lucide-react";
import Parallax from "./Parallax";

const About = () => {
  const { data: profile } = useProfile();

  // Debug logging
  console.log('About component - Profile data:', profile);

  // Safety check - if no profile data, show a fallback
  if (!profile) {
    console.log('About component - No profile data, showing fallback');
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-white/80 text-lg">
              Loading profile information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  const workExperience = profile?.work_experience || [];
  const currentPosition = workExperience.find(exp => exp.is_current);
  const bio = profile?.user?.bio || "With over 3+ years of hands-on experience as a Python Developer, I specialize in cloud technologies and have built a strong track record of designing, developing, and deploying scalable solutions that optimize system performance and deliver high-quality code for modern tech environments.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  } as const;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getDuration = (startDate: string, endDate: string | null) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    
    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''}${diffMonths > 0 ? ` ${diffMonths} month${diffMonths > 1 ? 's' : ''}` : ''}`;
    }
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  };

  try {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
        {/* Background decoration with parallax */}
        <Parallax speed={0.2} direction="up">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </Parallax>
        
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <Parallax speed={0.3} direction="left">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-1 rounded-full blur-3xl opacity-10"
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
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-3 rounded-full blur-3xl opacity-10"
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
        <motion.div 
          className="max-w-6xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 lg:mb-16 text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch mb-20">
            {/* Main Content with Journey */}
            <Parallax speed={0.4} direction="up">
              <motion.div variants={itemVariants} className="h-full">
                <Card className="p-6 lg:p-8 xl:p-10 border-0 shadow-xl glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 border border-white/20 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">My Journey</h3>
                </div>
                
                <p className="text-white/80 leading-relaxed mb-6 text-lg">
                  {bio}
                </p>
                
                {currentPosition && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-xl border border-purple-400/30 mb-8 flex-grow">
                    <p className="text-white/90 leading-relaxed text-lg">
                      Currently working as <span className="font-semibold text-purple-300">{currentPosition.position}</span> at <span className="font-semibold text-blue-300">{currentPosition.company}</span>, 
                      I'm passionate about leveraging cutting-edge technologies like AWS, Docker, 
                      and AI integration to solve complex business challenges.
                    </p>
                  </div>
                )}
                </Card>
              </motion.div>
            </Parallax>
            
            {/* Side Content */}
            <Parallax speed={0.3} direction="down">
              <motion.div className="h-full flex flex-col justify-between" variants={itemVariants}>
                {/* What I Do */}
                <Card className="p-6 lg:p-8 border-0 shadow-xl glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-1 border border-white/20 flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-white">What I Do</h4>
                </div>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    RESTful API development with Django & Flask
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Cloud architecture design & deployment
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    CI/CD pipeline implementation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    AI system integration & optimization
                  </li>
                </ul>
                </Card>
                
                {/* My Values */}
                <Card className="p-6 lg:p-8 border-0 shadow-xl glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-1 border border-white/20 flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-semibold text-white">My Values</h4>
                </div>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Scalable solution architecture
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Performance optimization focus
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    Continuous learning & innovation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    High-quality code standards
                  </li>
                </ul>
                </Card>
              </motion.div>
            </Parallax>
          </div>

          {/* Work Experience Section */}
          {workExperience.length > 0 && (
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-center mb-16 text-white drop-shadow-lg bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Work Experience
              </motion.h3>

              <motion.div 
                className="text-center mb-16"
                variants={itemVariants}
              >
                <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  A comprehensive overview of my professional roles, achievements, and the technologies 
                  I've worked with across different organizations and projects.
                </p>
              </motion.div>

              <motion.div 
                className="grid gap-8"
                variants={itemVariants}
              >
                {workExperience.map((experience, index) => (
                  <Parallax
                    key={experience.id}
                    speed={0.2}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <motion.div
                      variants={itemVariants}
                      className="group"
                    >
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <Card className="relative p-6 lg:p-8 border-0 shadow-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-white/20">
                        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                          {/* Left Side - Company Info */}
                          <div className="w-full lg:w-1/3">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <Building2 className="h-8 w-8 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-xl sm:text-2xl font-bold text-white mb-1 break-words">
                                  {experience.position}
                                </h4>
                                <div className="flex items-center gap-2 text-indigo-300 font-semibold">
                                  <Building2 className="h-4 w-4 flex-shrink-0" />
                                  <span className="break-words">{experience.company}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center gap-3 p-3 bg-indigo-500/20 rounded-lg border border-indigo-400/30">
                                <Clock className="h-5 w-5 text-indigo-300" />
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                                  </p>
                                  <p className="text-xs text-indigo-300 font-semibold">
                                    {getDuration(experience.start_date, experience.end_date)}
                                  </p>
                                </div>
                              </div>

                              {experience.is_current && (
                                <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                                  <Star className="h-5 w-5 text-green-300" />
                                  <div>
                                    <p className="text-sm font-medium text-white">Current Position</p>
                                    <p className="text-xs text-green-300 font-semibold">Active Role</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Side - Description & Technologies */}
                          <div className="w-full lg:w-2/3">
                            <div className="mb-6">
                              <h5 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-purple-300" />
                                Role & Achievements
                              </h5>
                              <div className="prose prose-gray max-w-none">
                                <p className="text-white/80 leading-relaxed text-lg">
                                  {experience.description}
                                </p>
                              </div>
                            </div>

                            {experience.technologies_used && experience.technologies_used.length > 0 && (
                              <div>
                                <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">T</span>
                                  </div>
                                  Technologies & Stack
                                </h5>
                                <div className="flex flex-wrap gap-2 lg:gap-3">
                                  {experience.technologies_used.map((tech, techIndex) => (
                                    <div 
                                      key={techIndex} 
                                      className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-semibold shadow-md backdrop-blur-sm antialiased cursor-pointer"
                                    >
                                      {tech}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-20"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-20"></div>
                      </Card>
                    </div>
                    </motion.div>
                  </Parallax>
                ))}
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
    );
  } catch (error) {
    console.error('About component error:', error);
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              About Me
            </h2>
            <p className="text-gray-600 text-lg">
              Something went wrong loading this section. Please refresh the page.
            </p>
          </div>
        </div>
      </section>
    );
  }
};

export default About;