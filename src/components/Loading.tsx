import { Loader2, User, Code, Database, Cloud, Eye, Monitor, Zap } from "lucide-react";
import { motion } from "framer-motion";

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

export const ProfileLoadingAnimation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"
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
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
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
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Main Scene - Avatar Watching Code */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar */}
            <motion.div
              className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl mb-8"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  "0 25px 50px -12px rgba(147, 51, 234, 0.5)",
                  "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
                  "0 25px 50px -12px rgba(147, 51, 234, 0.5)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <User className="w-16 h-16 text-white" />
              
              {/* Watching Eyes */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                animate={{
                  x: [0, 2, 0, -2, 0],
                  y: [0, -1, 0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Eye className="w-4 h-4 text-purple-600" />
              </motion.div>
            </motion.div>

            {/* Code Screen */}
            <motion.div
              className="relative w-80 h-48 bg-gray-800 rounded-lg shadow-2xl border border-gray-600"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Screen Header */}
              <div className="flex items-center gap-2 p-3 border-b border-gray-600">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-400 ml-2">portfolio.py</span>
              </div>
              
              {/* Code Content */}
              <div className="p-4 font-mono text-sm">
                <motion.div
                  className="text-green-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="text-purple-400">def</span> create_portfolio():
                </motion.div>
                <motion.div
                  className="text-blue-400 ml-4"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                >
                  <span className="text-purple-400">return</span> <span className="text-yellow-400">"Amazing Portfolio"</span>
                </motion.div>
                <motion.div
                  className="text-green-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
                >
                  <span className="text-purple-400">def</span> load_skills():
                </motion.div>
                <motion.div
                  className="text-blue-400 ml-4"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
                >
                  <span className="text-purple-400">return</span> [<span className="text-yellow-400">"Python"</span>, <span className="text-yellow-400">"AI/ML"</span>, <span className="text-yellow-400">"DevOps"</span>]
                </motion.div>
              </div>

              {/* Cursor */}
              <motion.div
                className="absolute bottom-4 left-4 w-2 h-5 bg-green-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Floating Tech Icons around the screen */}
            {[
              { icon: Code, color: "from-green-400 to-emerald-500", position: "top-4 -right-4" },
              { icon: Database, color: "from-blue-400 to-cyan-500", position: "-top-4 right-8" },
              { icon: Cloud, color: "from-purple-400 to-pink-500", position: "top-8 -left-4" },
              { icon: Zap, color: "from-yellow-400 to-orange-500", position: "-bottom-4 left-8" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`absolute ${item.position} w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-lg`}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                <item.icon className="w-4 h-4 text-white" />
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.path
                d="M 160 160 Q 200 120 240 160"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.h2
              className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Profile is Loading...
            </motion.h2>
            <motion.p
              className="text-white/70 text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Thank you for your patience! We're almost there...
            </motion.p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-64 h-2 bg-white/20 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
