import React, { useState, useEffect } from 'react';

// Interface para definir os tipos das props
interface ImageViewerModalProps {
  visible: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  imageUrl,
  onClose,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!visible) return null;

  // Estilos EXATAMENTE iguais ao seu StyleSheet original
  const styles = {
    modalContainer: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 1000,
    },
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      padding: '20px',
    },
    imageWrapper: {
      width: '100%',
      maxWidth: screenWidth - 40,
      maxHeight: screenHeight - 100,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '15px',
      paddingBottom: '10px',
    },
    closeButton: {
      width: '40px',
      height: '40px',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
    },
    closeButtonText: {
      color: '#FFFFFF',
      fontSize: '20px',
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    scrollContainer: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: screenHeight * 0.4,
      overflow: 'auto',
    },
    imageContainer: {
      width: screenWidth - 60,
      maxHeight: screenHeight * 0.7,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      minHeight: '200px',
      maxHeight: screenHeight * 0.6,
      objectFit: 'contain' as const,
    },
    footer: {
      padding: '15px',
      paddingTop: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    hintText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '12px',
      textAlign: 'center' as const,
    },
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.overlay} onClick={onClose}>
        <div style={styles.imageWrapper} onClick={(e) => e.stopPropagation()}>
          {/* Header com botão de fechar */}
          <div style={styles.header}>
            <div style={styles.closeButton} onClick={onClose}>
              <span style={styles.closeButtonText}>✕</span>
            </div>
          </div>

          {/* Container scrollável da imagem */}
          <div style={styles.scrollContainer}>
            {imageUrl && (
              <div style={styles.imageContainer}>
                <img
                  src={imageUrl}
                  style={styles.image}
                  onError={(error) => {
                    console.log('Erro ao carregar imagem:', error);
                  }}
                  alt="Imagem"
                />
              </div>
            )}
          </div>

          {/* Indicador de ação */}
          <div style={styles.footer}>
            <span style={styles.hintText}>
              Toque fora da imagem para fechar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;