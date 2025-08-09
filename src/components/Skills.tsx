import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/hooks/use-profile";
import { motion } from "framer-motion";
import { Code, Cloud, Settings } from "lucide-react";
import Parallax from "./Parallax";

const Skills = () => {
  const { data: profile } = useProfile();

  const skills = profile?.skills || [];

  const getIconForCategory = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('backend') || name.includes('api')) return Code;
    if (name.includes('cloud') || name.includes('devops')) return Cloud;
    return Settings;
  };

  const getGradientForCategory = (index: number) => {
    const gradients = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-emerald-600", 
      "from-orange-500 to-red-600",
      "from-purple-500 to-pink-600",
      "from-indigo-500 to-blue-600",
      "from-teal-500 to-cyan-600"
    ];
    return gradients[index % gradients.length];
  };

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

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden">
      {/* Background decoration with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.2} direction="up">
          <div className="absolute inset-0 bg-mesh-1 opacity-30"></div>
        </Parallax>
        
        <Parallax speed={0.3} direction="down">
          <motion.div
            className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-2 rounded-full blur-3xl opacity-10"
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
        
        <Parallax speed={0.4} direction="left">
          <motion.div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-4 rounded-full blur-3xl opacity-10"
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
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
            variants={itemVariants}
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = getIconForCategory(skill.category.name);
              const gradient = getGradientForCategory(index);
              
              return (
                <Parallax
                  key={skill.id}
                  speed={0.3}
                  direction={index % 2 === 0 ? "up" : "down"}
                >
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 } as const
                    }}
                  >
                    <Card className="p-8 border-0 shadow-neon glass dark:glass-dark hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 h-full border border-white/20">
                    <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-6 text-white">
                      {skill.category.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      {skill.skills_list.map((skillName, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.3, delay: skillIndex * 0.05 } as const}
                          viewport={{ once: true }}
                        >
                          <div
                            className={`inline-flex items-center rounded-full bg-gradient-to-r ${gradient} text-white hover:opacity-80 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-semibold shadow-md backdrop-blur-sm antialiased transition-all duration-300 cursor-pointer`}
                          >
                            {skillName}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    </Card>
                  </motion.div>
                </Parallax>
              );
            })}
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default Skills;