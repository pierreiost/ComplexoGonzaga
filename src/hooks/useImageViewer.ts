// src/hooks/useImageViewer.ts
import { useState } from 'react';

export const useImageViewer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const openImage = (url: string) => {
    setImageUrl(url);
    setIsVisible(true);
  };

  const closeImage = () => {
    setIsVisible(false);
    setImageUrl(null);
  };

  return { isVisible, imageUrl, openImage, closeImage };
};