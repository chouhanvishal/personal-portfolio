import { Mail, Heart } from "lucide-react";
import { useProfile } from "@/hooks/use-profile";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const { data: profile } = useProfile();

  const fullName = profile?.user ? `${profile.user.first_name} ${profile.user.last_name}`.trim() || profile.user.username : "Vishal Chouhan";
  const email = profile?.user?.email || "chouhanvishal273@gmail.com";

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">{fullName}</h3>
            <p className="text-primary-foreground/80">
              Python Developer & Cloud Specialist
            </p>
          </div>
          
          <SocialLinks 
            maxLinks={8}
            variant="default"
            iconSize="md"
            className="justify-center"
            excludeResume={true}
          />
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 flex items-center justify-center gap-2">
            Made by {fullName}
          </p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;