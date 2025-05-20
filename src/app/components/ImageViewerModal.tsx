import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Ícone para fechar

interface ImageViewerModalProps {
  visible: boolean;
  imageUrl: string | null;
  onClose: () => void;
}

export default function ImageViewerModal({ visible, imageUrl, onClose }: ImageViewerModalProps) {
  if (!visible || !imageUrl) {
    return null; // Não renderiza se não estiver visível ou sem URL
  }

  return (
    <Modal
      visible={visible}
      transparent={true} // Torna o fundo transparente para o overlay
      animationType="fade" // Animação suave ao abrir/fechar
      onRequestClose={onClose} // Permite fechar com o botão voltar do Android
    >
      <View style={styles.modalContainer}>
        {/* Botão de Fechar */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        {/* Imagem */}
        {/* Use o componente Image do React Native. Certifique-se de que a URL é válida. */}
        {/* Em um app real, você pode querer adicionar um ActivityIndicator enquanto a imagem carrega */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.fullImage}
          resizeMode="contain" // Garante que a imagem inteira seja visível
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fundo semi-transparente escuro
    justifyContent: 'center', // Centraliza a imagem verticalmente
    alignItems: 'center', // Centraliza a imagem horizontalmente
  },
  closeButton: {
    position: 'absolute', // Posiciona o botão sobre a imagem
    top: 40, // Distância do topo (ajuste conforme necessário)
    right: 20, // Distância da direita (ajuste conforme necessário)
    zIndex: 1, // Garante que o botão fique acima da imagem
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para o botão
    borderRadius: 20, // Cantos arredondados
    padding: 5,
  },
  fullImage: {
    width: '100%', // Ocupa toda a largura do container
    height: '80%', // Ocupa a maior parte da altura (deixando espaço para o botão de fechar)
    // Remova flex: 1 aqui para que a altura seja controlada pelo height
  },
});
