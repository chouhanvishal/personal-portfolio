import { useState, useEffect } from 'react';

export const useImageAccessibility = (imageUrl: string | null, fallbackImage: string) => {
  const [isAccessible, setIsAccessible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!imageUrl) {
      setIsAccessible(false);
      setIsLoading(false);
      return;
    }

    const checkImageAccessibility = () => {
      const img = new Image();
      
      img.onload = () => {
        setIsAccessible(true);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        setIsAccessible(false);
        setIsLoading(false);
      };
      
      img.src = imageUrl;
    };

    checkImageAccessibility();
  }, [imageUrl]);

  const finalImage = isAccessible && imageUrl ? imageUrl : fallbackImage;

  return {
    finalImage,
    isAccessible,
    isLoading
  };
};
