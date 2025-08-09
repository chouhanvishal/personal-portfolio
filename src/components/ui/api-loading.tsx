import { motion, AnimatePresence, Variants } from "framer-motion";
import { Loader2, Sparkles, Zap, Code, Cpu, Database, Server, Globe } from "lucide-react";
import { useEffect, useState } from "react";

interface ApiLoadingAnimationProps {
  message?: string;
  isFullScreen?: boolean;
}

export const ApiLoadingAnimation = ({
  message = "Loading data...",
  isFullScreen = false,
}: ApiLoadingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Initializing", "Connecting", "Processing", "Finalizing"];
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; speed: number }>>([]);

  // Generate random particles
  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: [
        "rgba(56, 189, 248, 0.7)", // sky
        "rgba(232, 121, 249, 0.7)", // fuchsia
        "rgba(74, 222, 128, 0.7)",  // green
        "rgba(250, 204, 21, 0.7)",  // yellow
      ][Math.floor(Math.random() * 4)],
      speed: Math.random() * 2 + 0.5,
    }));
    setParticles(newParticles);
  }, []);

  // Simulate progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 3;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Update step based on progress
  useEffect(() => {
    if (progress < 25) setCurrentStep(0);
    else if (progress < 50) setCurrentStep(1);
    else if (progress < 75) setCurrentStep(2);
    else setCurrentStep(3);
  }, [progress]);

  // Container classes based on fullscreen mode
  const containerClasses = isFullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white"
    : "relative flex items-center justify-center min-h-[300px] w-full";

  // Cube animation variants
  const cubeVariants: Variants = {
    initial: { 
      rotateX: 0, 
      rotateY: 0, 
      rotateZ: 0,
      scale: 0.8,
    },
    animate: { 
      rotateX: 360, 
      rotateY: 360, 
      rotateZ: 360,
      scale: 1,
      transition: { 
        rotateX: { duration: 20, repeat: Infinity, ease: "linear" },
        rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
        rotateZ: { duration: 30, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
      }
    }
  };

  // Floating icons variants
  const floatingIconVariants: Variants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: (i: number) => ({ 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    }),
    float: (i: number) => ({
      y: [0, -10, 0],
      rotate: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        y: { 
          duration: 3 + i * 0.5, 
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: { 
          duration: 4 + i * 0.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    })
  };

  // Progress ring calculation
  const size = 200;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const dash = (progress * circumference) / 100;

  return (
    <div className={containerClasses}>
      <div className="relative w-full max-w-md">
        {/* Particle background */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [
                  0,
                  Math.sin(particle.id) * 30,
                  Math.cos(particle.id) * 30,
                  0,
                ],
                y: [
                  0,
                  Math.cos(particle.id) * 30,
                  Math.sin(particle.id) * 30,
                  0,
                ],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: particle.speed * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main content container */}
        <div className="relative z-10 p-8 backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(120,120,255,0.15)]">
          {/* Header with step indicator */}
          <div className="flex items-center justify-between mb-8">
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                <Server className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">API Request</h3>
                <p className="text-xs text-slate-400">v2.0</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-4 w-4 text-blue-400" />
              </motion.div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium text-blue-400"
                >
                  {steps[currentStep]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Central 3D animation area */}
          <div className="relative h-64 mb-8 flex items-center justify-center">
            {/* Progress ring */}
            <motion.div
              className="absolute"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth={strokeWidth}
                />
                
                {/* Progress ring with gradient */}
                <motion.circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - dash}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - dash }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Percentage in the center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {Math.round(progress)}%
                </motion.div>
              </div>
            </motion.div>

            {/* 3D Cube */}
            <div className="absolute perspective-[800px]">
              <motion.div
                className="w-32 h-32 relative transform-style-3d"
                variants={cubeVariants}
                initial="initial"
                animate="animate"
              >
                {/* Front face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.5)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Database className="h-10 w-10 text-blue-400" />
                </motion.div>

                {/* Back face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "rotateY(180deg) translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                      "0 0 40px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(168, 85, 247, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Server className="h-10 w-10 text-purple-400" />
                </motion.div>

                {/* Right face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "rotateY(90deg) translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                      "0 0 40px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Globe className="h-10 w-10 text-cyan-400" />
                </motion.div>

                {/* Left face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-red-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "rotateY(-90deg) translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(236, 72, 153, 0.3)",
                      "0 0 40px rgba(236, 72, 153, 0.5)",
                      "0 0 20px rgba(236, 72, 153, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Cpu className="h-10 w-10 text-pink-400" />
                </motion.div>

                {/* Top face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-emerald-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "rotateX(90deg) translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                      "0 0 40px rgba(16, 185, 129, 0.5)",
                      "0 0 20px rgba(16, 185, 129, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code className="h-10 w-10 text-green-400" />
                </motion.div>

                {/* Bottom face */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-yellow-600/30 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center"
                  style={{
                    transform: "rotateX(-90deg) translateZ(64px)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(245, 158, 11, 0.3)",
                      "0 0 40px rgba(245, 158, 11, 0.5)",
                      "0 0 20px rgba(245, 158, 11, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="h-10 w-10 text-amber-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Floating icons around the cube */}
            <div className="absolute inset-0">
              {[
                { icon: Sparkles, position: "top-10 left-10", delay: 0 },
                { icon: Database, position: "top-10 right-10", delay: 1 },
                { icon: Cpu, position: "bottom-10 left-10", delay: 2 },
                { icon: Server, position: "bottom-10 right-10", delay: 3 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${item.position} w-8 h-8 flex items-center justify-center`}
                  custom={i}
                  variants={floatingIconVariants}
                  initial="initial"
                  animate={["animate", "float"]}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: item.delay * 0.2,
                      }}
                    />
                    <div className="relative z-10 bg-black/30 backdrop-blur-sm p-1.5 rounded-full border border-white/20">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Status message */}
          <div className="text-center mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-base font-medium text-white">{message}</p>
                <p className="text-sm text-slate-400 mt-1">{steps[currentStep]}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Data stream visualization */}
          <motion.div
            className="h-10 bg-black/40 rounded-lg overflow-hidden border border-white/10 relative"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Data packets */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                  style={{
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 30 + 10}px`,
                  }}
                  initial={{ left: "-10%" }}
                  animate={{ left: "110%" }}
                  transition={{
                    duration: Math.random() * 2 + 1,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Binary data overlay */}
            <div className="absolute inset-0 flex items-center overflow-hidden">
              <motion.div
                className="flex font-mono text-xs text-blue-400/70 whitespace-nowrap"
                animate={{ x: [0, -500] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <span key={i} className="mx-1">
                    {Math.round(Math.random()) === 1 ? "1" : "0"}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Smaller inline version for use within components
export const InlineApiLoading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-black/30 backdrop-blur-sm border border-white/10">
      <div className="relative w-10 h-10">
        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-blue-500/30 blur-md"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Spinning rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-purple-400 border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
        </motion.div>
      </div>
      
      <div className="flex-1">
        <motion.p
          className="text-sm font-medium text-white"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
        </motion.p>
        
        <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
            animate={{
              width: ["0%", "100%"],
              x: ["0%", "0%"],
            }}
            transition={{
              width: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: {
                duration: 0,
                repeat: Infinity,
                repeatDelay: 1.5,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};