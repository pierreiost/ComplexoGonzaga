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
  onQuadraImagePress: (imageUrl: any) => void;
}

const quadraImages = {
  quadra1: require('../../assets/images/quadra1.jpeg'),
  quadra2: require('../../assets/images/quadra2.jpeg'),
  quadra3: require('../../assets/images/quadra3.jpeg'),
  quadra4: require('../../assets/images/quadra4.jpeg'),
};

export default function InfoSections({ onQuadraImagePress }: InfoSectionsProps) {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  const getColumnsCount = () => {
    if (screenData.width < 400) return 2;
    return 2;
  };

  const getCardWidth = () => {
    const columns = getColumnsCount();
    const horizontalMargin = 32;
    const gap = 8;
    const totalGaps = (columns - 1) * gap;
    return (screenData.width - horizontalMargin - totalGaps) / columns;
  };

  const getImageHeight = () => {
    const cardWidth = getCardWidth();
    const cardPadding = 16;
    const imageWidth = cardWidth - cardPadding;
    return (imageWidth * 9) / 16;
  };

  const getResponsiveSpacing = () => {
    if (screenData.width < 350) return { gap: 6, padding: 6, cardPadding: 8 };
    if (screenData.width < 600) return { gap: 8, padding: 8, cardPadding: 10 };
    return { gap: 10, padding: 12, cardPadding: 12 };
  };

  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/profile.php?id=61577099866861');
  };

  const handleInstagram = () => {
    Linking.openURL('https://instagram.com/complexogonzaga');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/53991343579');
  };

  const quadras = [
    { 
      id: 1, 
      name: 'Quadra Principal', 
      image: quadraImages.quadra1
    },
    { 
      id: 2, 
      name: 'Quadra de Areia', 
      image: quadraImages.quadra2
    },
    { 
      id: 3, 
      name: 'Quadra Coberta', 
      image: quadraImages.quadra3
    },
    { 
      id: 4, 
      name: 'Quadra de Treino', 
      image: quadraImages.quadra4
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

      <View style={[styles.section, { marginHorizontal: spacing.padding, marginBottom: 16 }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quadras</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={[styles.quadrasGrid, { gap: spacing.gap }]}>
          {quadras.map((quadra, index) => (
            <TouchableOpacity
              key={quadra.id}
              style={[
                styles.quadraCard, 
                { 
                  width: cardWidth,
                  padding: spacing.cardPadding,
                  marginBottom: index < 2 ? spacing.gap : 0,
                }
              ]}
              onPress={() => onQuadraImagePress(quadra.image)}
              activeOpacity={0.8}
            >
              <View style={[styles.quadraImageContainer, { height: imageHeight }]}>
                <Image
                  source={quadra.image}
                  style={styles.quadraImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageOverlayText}>Ver Foto</Text>
                </View>
              </View>
              <Text style={[
                styles.quadraName,
                { fontSize: screenData.width < 350 ? 11 : 12 }
              ]}>
                {quadra.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

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
              flexDirection: screenData.width < 600 ? 'column' : 'row',
              gap: spacing.gap 
            }
          ]}>
            <TouchableOpacity
              style={[
                styles.socialButton, 
                styles.instagramButton,
                { minWidth: screenData.width < 600 ? '80%' : 120 }
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
                styles.facebookButton,
                { minWidth: screenData.width < 600 ? '80%' : 120 }
              ]}
              onPress={handleFacebook}
              activeOpacity={0.8}
            >
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.socialButton, 
                styles.whatsappButton,
                { minWidth: screenData.width < 600 ? '80%' : 120 }
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
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 16,
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
  quadrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quadraCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  quadraImageContainer: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
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
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  imageOverlayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  quadraName: {
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 16,
  },
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
  facebookButton: {
    backgroundColor: '#1877F2',
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