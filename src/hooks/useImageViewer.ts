// src/hooks/useImageViewer.ts
import { useState, useCallback } from 'react';

export const useImageViewer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const openImage = useCallback((url: string) => {
    console.log('Abrindo imagem:', url);
    setImageUrl(url);
    setIsVisible(true);
  }, []);

  const closeImage = useCallback(() => {
    console.log('Fechando modal de imagem');
    setIsVisible(false);
    setTimeout(() => {
      setImageUrl(null);
    }, 300);
  }, []);

  return { 
    isVisible, 
    imageUrl, 
    openImage, 
    closeImage 
  };
};