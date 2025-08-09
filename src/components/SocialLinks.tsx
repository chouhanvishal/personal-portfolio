import { 
  Github, 
  Linkedin, 
  Mail, 
  Instagram,
  ExternalLink,
  MessageCircle,
  Phone,
  Globe,
  Twitter,
  Facebook,
  Youtube
} from "lucide-react";
import { useProfile } from "@/hooks/use-profile";

// Custom icons for platforms not available in lucide-react
const TelegramIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2-.06-.06-.14-.04-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.14 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

interface SocialLinksProps {
  maxLinks?: number;
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "outlined";
  showLabels?: boolean;
  excludeResume?: boolean;
}

const SocialLinks = ({ 
  maxLinks = 6, 
  className = "", 
  iconSize = "md",
  variant = "default",
  showLabels = false,
  excludeResume = true
}: SocialLinksProps) => {
  const { data: profile } = useProfile();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'instagram':
        return Instagram;
      case 'twitter':
        return Twitter;
      case 'facebook':
        return Facebook;
      case 'youtube':
        return Youtube;
      case 'whatsapp':
        return WhatsAppIcon;
      case 'telegram':
        return TelegramIcon;
      case 'email':
        return Mail;
      case 'phone':
        return Phone;
      case 'website':
      case 'portfolio':
        return Globe;
      default:
        return ExternalLink;
    }
  };

  const getIconSize = () => {
    switch (iconSize) {
      case "sm":
        return "h-4 w-4";
      case "lg":
        return "h-8 w-8";
      default:
        return "h-6 w-6";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "minimal":
        return "text-gray-600 hover:text-gray-800 transition-colors";
      case "outlined":
        return "p-2 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all";
      default:
        return "p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transform hover:-translate-y-1";
    }
  };

  // Get all active social links from API
  let socialLinks = profile?.social_links?.filter(link => link.is_active) || [];

  // Exclude resume links if excludeResume is true
  if (excludeResume) {
    socialLinks = socialLinks.filter(link => 
      link.platform.toLowerCase() !== 'resume' && 
      link.platform.toLowerCase() !== 'naukri'
    );
  }

  // Priority order for social links display (excluding resume/naukri)
  const priorityPlatforms = ['github', 'linkedin', 'instagram', 'whatsapp', 'telegram', 'twitter', 'facebook', 'youtube', 'email', 'phone', 'website', 'portfolio'];
  
  const sortedSocialLinks = socialLinks
    .sort((a, b) => {
      const aIndex = priorityPlatforms.indexOf(a.platform.toLowerCase());
      const bIndex = priorityPlatforms.indexOf(b.platform.toLowerCase());
      return aIndex - bIndex;
    })
    .slice(0, maxLinks);

  if (sortedSocialLinks.length === 0) {
    return null;
  }

  return (
    <div className={`flex gap-4 flex-wrap justify-center ${className}`}>
      {sortedSocialLinks.map((social) => {
        const IconComponent = getSocialIcon(social.platform);
        const platformName = social.platform.charAt(0).toUpperCase() + social.platform.slice(1);
        const iconSizeClass = getIconSize();
        
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${getVariantClasses()} group`}
            title={platformName}
          >
            <div className="flex items-center gap-2">
              <div className={iconSizeClass}>
                <IconComponent className="w-full h-full group-hover:scale-110 transition-transform" />
              </div>
              {showLabels && (
                <span className="text-sm font-medium hidden sm:inline">
                  {platformName}
                </span>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks; 