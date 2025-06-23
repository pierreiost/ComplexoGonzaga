import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions,
  ScrollView,
  Linking,
  Image
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InfoSectionsProps {
  onQuadraImagePress: (imageUrl: string) => void;
}

export default function InfoSections({ onQuadraImagePress }: InfoSectionsProps) {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  // Função para calcular número de colunas baseado na largura da tela
  const getColumnsCount = () => {
    if (screenData.width < 350) return 1;
    if (screenData.width < 600) return 2;
    return 3;
  };

  // Função para calcular largura dos cards
  const getCardWidth = () => {
    const columns = getColumnsCount();
    const horizontalMargin = 32; // 16 * 2
    const gap = 12;
    const totalGaps = (columns - 1) * gap;
    return (screenData.width - horizontalMargin - totalGaps) / columns;
  };

  // Função para calcular altura da imagem baseada na largura (aspect ratio 4:3)
  const getImageHeight = () => {
    const cardWidth = getCardWidth();
    const cardPadding = 24; // 12 * 2
    const imageWidth = cardWidth - cardPadding;
    return (imageWidth * 3) / 4; // Aspect ratio 4:3
  };

  // Função para calcular espaçamentos responsivos
  const getResponsiveSpacing = () => {
    if (screenData.width < 350) return { gap: 8, padding: 8 };
    if (screenData.width < 600) return { gap: 12, padding: 12 };
    return { gap: 16, padding: 16 };
  };

  const handleInstagram = () => {
    Linking.openURL('https://instagram.com/complexogonzaga');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me');
  };

  const quadras = [
    { 
      id: 1, 
      name: 'Quadra Principal', 
      image: 'https://github.com/pierreiost/ComplexoGonzaga/blob/main/assets/images/IMG_1558.JPG',
      fallbackImage: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+Principal'
    },
    { 
      id: 2, 
      name: 'Quadra de Areia', 
      image: 'https://github.com/pierreiost/ComplexoGonzaga/blob/main/assets/images/IMG_1560.JPG',
      fallbackImage: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+de+Areia'
    },
    { 
      id: 3, 
      name: 'Quadra Coberta', 
      image: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+Coberta',
      fallbackImage: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+Coberta'
    },
    { 
      id: 4, 
      name: 'Quadra de Treino', 
      image: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+de+Treino',
      fallbackImage: 'https://via.placeholder.com/300x225/e0e0e0/666?text=Quadra+de+Treino'
    },
  ];

  const spacing = getResponsiveSpacing();
  const cardWidth = getCardWidth();
  const imageHeight = getImageHeight();

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Seção O Gonzaga */}
      <View style={[styles.section, { marginHorizontal: spacing.padding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>O Gonzaga</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.gonzagaCard}>
          <View style={styles.gonzagaContent}>
            <Text style={styles.gonzagaDescription}>
              Bem-vindo ao Gonzaga! Aqui você encontra as melhores quadras esportivas 
              da região de Pelotas. Venha praticar seu esporte favorito em um ambiente 
              seguro e bem estruturado.
            </Text>
          </View>
        </View>
      </View>

      {/* Seção Quadras */}
      <View style={[styles.section, { marginHorizontal: spacing.padding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quadras</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={[styles.quadrasGrid, { gap: spacing.gap }]}>
          {quadras.map((quadra) => (
            <TouchableOpacity
              key={quadra.id}
              style={[
                styles.quadraCard, 
                { 
                  width: cardWidth,
                  padding: spacing.padding 
                }
              ]}
              onPress={() => onQuadraImagePress(quadra.image)}
              activeOpacity={0.8}
            >
              <View style={[styles.quadraImageContainer, { height: imageHeight }]}>
                <Image
                  source={{ uri: quadra.image }}
                  style={styles.quadraImage}
                  resizeMode="cover"
                  onError={() => {
                    // Fallback para imagem placeholder se a original falhar
                    console.log(`Erro ao carregar imagem: ${quadra.image}`);
                  }}
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>Ver Foto</Text>
                </View>
              </View>
              <Text style={[
                styles.quadraName,
                { fontSize: screenData.width < 350 ? 12 : 14 }
              ]}>
                {quadra.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Seção Fale Conosco */}
      <View style={[styles.section, { marginHorizontal: spacing.padding, marginBottom: 20 }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fale Conosco</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactSubtitle}>
            Entre em contato conosco através das redes sociais:
          </Text>
          <View style={[
            styles.socialButtons,
            { 
              flexDirection: screenData.width < 400 ? 'column' : 'row',
              gap: spacing.gap 
            }
          ]}>
            <TouchableOpacity
              style={[
                styles.socialButton, 
                styles.instagramButton,
                { minWidth: screenData.width < 400 ? '80%' : 140 }
              ]}
              onPress={handleInstagram}
              activeOpacity={0.8}
            >
              <Text style={styles.socialIcon}>📸</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialButton, 
                styles.whatsappButton,
                { minWidth: screenData.width < 400 ? '80%' : 140 }
              ]}
              onPress={handleWhatsApp}
              activeOpacity={0.8}
            >
              <Text style={styles.socialIcon}>💬</Text>
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para o weather card
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleUnderline: {
    width: 60,
    height: 3,
    backgroundColor: '#FF4444',
    borderRadius: 2,
    marginTop: 8,
  },
  
  // Gonzaga Section
  gonzagaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gonzagaContent: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  gonzagaDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    textAlign: 'center',
  },

  // Quadras Section - Responsivo
  quadrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quadraCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 16,
  },
  quadraImageContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  quadraImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  quadraName: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },

  // Contact Section
  contactContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF4444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  socialButtons: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  instagramButton: {
    backgroundColor: '#E4405F',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
  },
  socialIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  socialText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

