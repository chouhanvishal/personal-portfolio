import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Wifi, Globe, Cpu, Cloud, ArrowRight, ArrowDown, Loader2 } from "lucide-react";
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
  const steps = ["Connecting", "Fetching", "Processing", "Finalizing"];

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
    : "relative flex items-center justify-center min-h-[200px] w-full";

  return (
    <div className={containerClasses}>
      <div className="w-full max-w-md p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-slate-700">
        {/* Header with pulsing effect */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg text-primary">API Request</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{steps[currentStep]}</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main animation area */}
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg bg-black/50 border border-slate-700">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23333%22%20fill-opacity%3D%220.2%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%200h40v40H0V0zm1%201h38v38H1V1z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

          {/* Server and client */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            {/* Server side */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg mb-2"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(37, 99, 235, 0)",
                    "0 0 20px rgba(37, 99, 235, 0.7)",
                    "0 0 0 rgba(37, 99, 235, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Server className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-xs text-slate-300">Server</span>
              
              {/* Server processing indicators */}
              <motion.div
                className="absolute -right-2 top-2 w-4 h-4 bg-green-500/80 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </motion.div>

            {/* Client side */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center shadow-lg mb-2"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(147, 51, 234, 0)",
                    "0 0 20px rgba(147, 51, 234, 0.7)",
                    "0 0 0 rgba(147, 51, 234, 0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Globe className="h-8 w-8 text-white" />
              </motion.div>
              <span className="text-xs text-slate-300">Client</span>
              
              {/* Client processing indicators */}
              <motion.div
                className="absolute -left-2 top-2 w-4 h-4 bg-purple-500/80 rounded-full"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </motion.div>

            {/* Data packets traveling between server and client */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-slate-700/50">
              {/* Request packets (client to server) */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`req-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500"
                  initial={{ left: "100%" }}
                  animate={{ left: "0%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Response packets (server to client) */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`res-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5 + 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating data elements */}
          <div className="absolute inset-0">
            {[
              { icon: Database, color: "bg-blue-500", delay: 0 },
              { icon: Cpu, color: "bg-green-500", delay: 0.5 },
              { icon: Cloud, color: "bg-indigo-500", delay: 1 },
              { icon: Wifi, color: "bg-amber-500", delay: 1.5 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.color} p-1 rounded-md shadow-lg`}
                initial={{
                  opacity: 0,
                  x: Math.random() * 100 - 50 + 100,
                  y: Math.random() * 100 - 50 + 100,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: Math.random() * 200 - 100 + 100,
                  y: Math.random() * 200 - 100 + 100,
                  rotate: [0, 10, -10, 0],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut",
                }}
              >
                <item.icon className="h-4 w-4 text-white" />
              </motion.div>
            ))}
          </div>

          {/* Data processing visualization */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400">Processing</span>
              <span className="text-xs text-slate-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>

        {/* Status messages */}
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="h-6"
            >
              <p className="text-sm text-slate-300">{message}</p>
              <p className="text-xs text-slate-400 mt-1">{steps[currentStep]} data...</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Binary data stream effect */}
        <div className="mt-4 overflow-hidden h-6 rounded bg-black/30">
          <div className="flex font-mono text-xs text-green-500/70 whitespace-nowrap">
            <motion.div
              animate={{ x: [0, -500] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="flex"
            >
              {Array.from({ length: 50 }).map((_, i) => (
                <span key={i} className="mx-1">
                  {Math.round(Math.random()) === 1 ? "1" : "0"}
                </span>
              ))}
            </motion.div>
            <motion.div
              animate={{ x: [0, -500] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 2.5 }}
              className="flex"
            >
              {Array.from({ length: 50 }).map((_, i) => (
                <span key={i} className="mx-1">
                  {Math.round(Math.random()) === 1 ? "1" : "0"}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Smaller inline version for use within components
export const InlineApiLoading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
      <div className="relative w-8 h-8">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border-2 border-primary/50 border-b-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">{message}</p>
        <motion.div 
          className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1"
        >
          <motion.div 
            className="h-full bg-primary"
            animate={{ 
              width: ["0%", "100%", "0%"],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};