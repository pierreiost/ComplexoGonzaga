import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

interface ImageViewerModalProps {
  visible: boolean;
  imageUrl: any; 
  onClose: () => void;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  visible,
  imageUrl,
  onClose,
}) => {
  // Função para impedir a propagação do evento
  const handleImageAreaPress = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          {/* Usar View com onStartShouldSetResponder para bloquear eventos */}
          <View
            style={styles.imageWrapper}
            onStartShouldSetResponder={() => true}
            onResponderGrant={handleImageAreaPress}
          >
            {/* Header com botão de fechar */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* ScrollView com zoom */}
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              maximumZoomScale={3}
              minimumZoomScale={1}
              bouncesZoom={true}
              // Impedir que o ScrollView propague eventos para o pai
              onStartShouldSetResponder={() => true}
            >
              {imageUrl && (
                <View style={styles.imageContainer}>
                  <Image
                    source={imageUrl} 
                    style={styles.image}
                    resizeMode="contain"
                    onError={(error) => {
                      console.log('Erro ao carregar imagem:', error);
                    }}
                  />
                </View>
              )}
            </ScrollView>

            {/* Footer com dicas */}
            <View style={styles.footer}>
              <Text style={styles.hintText}>
                Toque fora da imagem para fechar • Zoom disponível
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: SCREEN_WIDTH - 20, 
    maxHeight: SCREEN_HEIGHT - 60, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10, 
    paddingBottom: 5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: SCREEN_HEIGHT * 0.7, 
  },
  imageContainer: {
    width: SCREEN_WIDTH - 30, 
    height: SCREEN_HEIGHT * 0.75, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 10, 
    paddingTop: 5,
    alignItems: 'center',
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ImageViewerModal;