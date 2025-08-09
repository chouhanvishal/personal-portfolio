import { useProfile } from "@/hooks/use-profile";
import { useApiLoading } from "@/hooks/use-api-loading";
import { ProfileLoadingAnimation } from "@/components/Loading";
import { ReactNode, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

const GlobalLoadingWrapper = ({ children }: GlobalLoadingWrapperProps) => {
  const { isLoading: isProfileLoading, error } = useProfile();
  const { isLoading: isApiLoading, activeEndpoints } = useApiLoading();
  const [showApiLoading, setShowApiLoading] = useState(false);
  
  // Delay showing the API loading animation to prevent flicker for quick requests
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isApiLoading) {
      timer = setTimeout(() => {
        setShowApiLoading(true);
      }, 300); // Show loading animation after 300ms of loading
    } else {
      setShowApiLoading(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isApiLoading]);

  // Generate a loading message based on active endpoints
  const getLoadingMessage = (): string => {
    if (activeEndpoints.length === 0) return "Loading data...";
    
    const endpoint = activeEndpoints[0];
    if (endpoint.includes("profile")) return "Loading profile data...";
    if (endpoint.includes("projects")) return "Loading projects...";
    if (endpoint.includes("skills")) return "Loading skills...";
    if (endpoint.includes("experience")) return "Loading experience...";
    
    return `Loading ${activeEndpoints.length} request${activeEndpoints.length > 1 ? 's' : ''}...`;
  };

  // Initial profile loading - full screen
  if (isProfileLoading) {
    return <ProfileLoadingAnimation />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading profile</h1>
          <p className="text-white/70">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      
      {/* API Loading Overlay */}
      <AnimatePresence>
        {showApiLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <ProfileLoadingAnimation />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalLoadingWrapper;