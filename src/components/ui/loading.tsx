import { Loader2, User, Code, Database, Cloud, Eye, Monitor, Zap, Globe, Server, Cpu, Wifi, Sparkles, Terminal, GitBranch, Database as DbIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LoadingProps {
  size?: number;
  className?: string;
}

export const Loading = ({ size = 24, className = "" }: LoadingProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="animate-spin" size={size} />
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Loading size={32} />
    </div>
  );
};

export const SuperCoolLoadingAnimation = ({ 
  message = "Loading...", 
  isFullScreen = false 
}: { 
  message?: string; 
  isFullScreen?: boolean; 
}) => {
  const containerClasses = isFullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
    : "relative flex items-center justify-center min-h-[200px] w-full";

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center gap-8">
        {/* Minimal central loader */}
        <div className="relative">
          {/* Simple pulsing circle */}
          <motion.div
            className="w-20 h-20 border-2 border-gray-300 dark:border-gray-600 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              borderColor: ["#d1d5db", "#3b82f6", "#d1d5db"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Inner spinning dot */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </motion.div>
        </div>

        {/* Simple text */}
        <div className="text-center">
          <motion.h3
            className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.h3>
          
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            Please wait...
          </motion.p>
        </div>

        {/* Minimal progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const LoadingTrigger = ({ 
  children, 
  message = "Loading...",
  duration = 3000 
}: { 
  children: React.ReactNode;
  message?: string;
  duration?: number;
}) => {
  const [showLoading, setShowLoading] = useState(false);

  const triggerLoading = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
    }, duration);
  };

  return (
    <>
      <div onClick={triggerLoading}>
        {children}
      </div>
      
      <AnimatePresence>
        {showLoading && (
          <SuperCoolLoadingAnimation message={message} isFullScreen={true} />
        )}
      </AnimatePresence>
    </>
  );
};

export const AdminLoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <motion.div
          className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export const ButtonLoadingAnimation = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export const CardLoadingAnimation = () => {
  return (
    <div className="p-6 space-y-4">
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
};

export const ProfileLoadingAnimation = () => {
  return <SuperCoolLoadingAnimation message="Loading your profile..." isFullScreen={true} />;
};

export const UnifiedLoadingAnimation = ({ 
  message = "Loading...", 
  isFullScreen = false 
}: { 
  message?: string; 
  isFullScreen?: boolean; 
}) => {
  return <SuperCoolLoadingAnimation message={message} isFullScreen={isFullScreen} />;
}; 