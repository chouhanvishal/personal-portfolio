import { useProfile } from "@/hooks/use-profile";
import { ProfileLoadingAnimation } from "@/components/ui/loading";
import { ReactNode } from "react";

interface GlobalLoadingWrapperProps {
  children: ReactNode;
}

const GlobalLoadingWrapper = ({ children }: GlobalLoadingWrapperProps) => {
  const { isLoading, error } = useProfile();

  if (isLoading) {
    return <ProfileLoadingAnimation />;
  }

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

  return <>{children}</>;
};

export default GlobalLoadingWrapper; 