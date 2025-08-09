import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building2, ExternalLink, Clock, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/use-profile";
import Parallax from "./Parallax";

const Experience = () => {
  const { data: profileData } = useProfile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  } as const;

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

  if (!profileData?.work_experience || profileData.work_experience.length === 0) {
    return null;
  }

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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-slate-900 dark:to-gray-900 relative overflow-hidden">
      {/* Background decoration with parallax */}
      <Parallax speed={0.2} direction="up">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236B7280%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%200h80v80H0V0zm1%201v78h78V1H1zM40%2040a4%204%200%201%200%200%208%204%204%200%200%200%200-8z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 dark:opacity-20"></div>
      </Parallax>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.3} direction="left">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-1 rounded-full blur-3xl opacity-5 dark:opacity-10"
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
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-3 rounded-full blur-3xl opacity-5 dark:opacity-10"
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
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900"
            variants={itemVariants}
          >
            Work Experience
          </motion.h2>

          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my professional roles, achievements, and the technologies 
              I've worked with across different organizations and projects.
            </p>
          </motion.div>

          <motion.div 
            className="grid gap-8"
            variants={itemVariants}
          >
            {profileData.work_experience.map((experience, index) => (
              <Parallax
                key={experience.id}
                speed={0.3}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <motion.div
                  variants={itemVariants}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <Card className="relative p-8 border-0 shadow-3d bg-white dark:glass-dark hover:shadow-neon transition-all duration-500 transform hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Left Side - Company Info */}
                      <div className="lg:w-1/3">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Building2 className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">
                              {experience.position}
                            </h3>
                            <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                              <Building2 className="h-4 w-4" />
                              {experience.company}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                            <Clock className="h-5 w-5 text-indigo-600" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {formatDate(experience.start_date)} - {experience.end_date ? formatDate(experience.end_date) : 'Present'}
                              </p>
                              <p className="text-xs text-indigo-600 font-semibold">
                                {getDuration(experience.start_date, experience.end_date)}
                              </p>
                            </div>
                          </div>

                          {experience.is_current && (
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <Star className="h-5 w-5 text-green-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">Current Position</p>
                                <p className="text-xs text-green-600 font-semibold">Active Role</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Description & Technologies */}
                      <div className="lg:w-2/3">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                            Role & Achievements
                          </h4>
                          <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {experience.description}
                            </p>
                          </div>
                        </div>

                        {experience.technologies_used && experience.technologies_used.length > 0 && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-white text-xs font-bold">T</span>
                              </div>
                              <span className="text-gray-900 font-bold">Technologies & Stack</span>
                            </h4>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                              {experience.technologies_used.map((tech, techIndex) => (
                                <div 
                                  key={techIndex} 
                                  className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold shadow-md backdrop-blur-sm antialiased cursor-pointer"
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

          <Parallax speed={0.2} direction="up">
            <motion.div
              className="text-center mt-16"
              variants={itemVariants}
            >
              <div className="inline-flex items-center gap-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer group bg-white dark:glass-dark px-6 py-3 rounded-full shadow-lg hover:shadow-neon">
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-semibold">Download Full Resume</span>
              </div>
            </motion.div>
          </Parallax>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 