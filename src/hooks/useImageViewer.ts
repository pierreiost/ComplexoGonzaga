// src/hooks/useImageViewer.ts
import { useState } from 'react';

export const useImageViewer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(null); // Mudança: aceita qualquer tipo (string ou require())

  const openImage = (url: any) => { // Mudança: aceita qualquer tipo
    setImageUrl(url);
    setIsVisible(true);
  };

  const closeImage = () => {
    setIsVisible(false);
    setImageUrl(null);
  };

  return { isVisible, imageUrl, openImage, closeImage };
};