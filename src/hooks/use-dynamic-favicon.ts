import { useEffect } from 'react';
import { useProfile } from './use-profile';

export const useDynamicFavicon = () => {
  const { data: profile } = useProfile();

  useEffect(() => {
    if (profile?.user?.profile_photo) {
      const imageUrl = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}${profile.user.profile_photo}`;
      
      // Create a canvas to draw the rounded favicon
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 32;
      canvas.height = 32;
      
      if (ctx) {
        // Create circular clipping path
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        
        // Create clipping path
        ctx.clip();
        
        // Load and draw the image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          // Calculate dimensions to maintain aspect ratio
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
          const x = (canvas.width - img.width * scale) / 2;
          const y = (canvas.height - img.height * scale) / 2;
          
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
          
          // Convert canvas to data URL
          const faviconUrl = canvas.toDataURL('image/png');
          
          // Update the favicon link
          let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
          if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
          }
          faviconLink.href = faviconUrl;
          
          // Update the shortcut icon link
          let shortcutLink = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;
          if (!shortcutLink) {
            shortcutLink = document.createElement('link');
            shortcutLink.rel = 'shortcut icon';
            document.head.appendChild(shortcutLink);
          }
          shortcutLink.href = faviconUrl;
        };
        
        img.onerror = () => {
          // Fallback to original image if canvas creation fails
          let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
          if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.head.appendChild(faviconLink);
          }
          faviconLink.href = imageUrl;
          
          let shortcutLink = document.querySelector('link[rel="shortcut icon"]') as HTMLLinkElement;
          if (!shortcutLink) {
            shortcutLink = document.createElement('link');
            shortcutLink.rel = 'shortcut icon';
            document.head.appendChild(shortcutLink);
          }
          shortcutLink.href = imageUrl;
        };
        
        img.src = imageUrl;
      }
    }
  }, [profile?.user?.profile_photo]);
};
