import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions,
  ScrollView,
  Linking 
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InfoSectionsProps {
  onQuadraImagePress: (imageUrl: string) => void;
}

export default function InfoSections({ onQuadraImagePress }: InfoSectionsProps) {
  const handleInstagram = () => {
    Linking.openURL('https://instagram.com');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me');
  };

  const quadras = [
    { id: 1, name: 'Quadra Principal', image: 'https://via.placeholder.com/300x200/e0e0e0/666?text=Foto+1' },
    { id: 2, name: 'Quadra de Areia', image: 'https://via.placeholder.com/300x200/e0e0e0/666?text=Foto+2' },
    { id: 3, name: 'Quadra Coberta', image: 'https://via.placeholder.com/300x200/e0e0e0/666?text=Foto+3' },
    { id: 4, name: 'Quadra de Treino', image: 'https://via.placeholder.com/300x200/e0e0e0/666?text=Foto+4' },
  ];

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Seção O Gonzaga */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>O Gonzaga</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.gonzagaCard}>
          <Text style={styles.gonzagaText}>
            Pré-informações sobre O Gonzaga
          </Text>
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
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quadras</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.quadrasGrid}>
          {quadras.map((quadra) => (
            <TouchableOpacity
              key={quadra.id}
              style={styles.quadraCard}
              onPress={() => onQuadraImagePress(quadra.image)}
              activeOpacity={0.8}
            >
              <View style={styles.quadraImagePlaceholder}>
                <Text style={styles.quadraImageText}>Ver Foto {quadra.id}</Text>
              </View>
              <Text style={styles.quadraName}>{quadra.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Seção Fale Conosco */}
      <View style={[styles.section, { marginBottom: 20 }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Fale Conosco</Text>
          <View style={styles.titleUnderline} />
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactSubtitle}>
            Entre em contato conosco através das redes sociais:
          </Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={[styles.socialButton, styles.instagramButton]}
              onPress={handleInstagram}
              activeOpacity={0.8}
            >
              <Text style={styles.socialIcon}>📸</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, styles.whatsappButton]}
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
    marginHorizontal: 16,
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
  gonzagaText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
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

  // Quadras Section
  quadrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  quadraCard: {
    width: (SCREEN_WIDTH - 44) / 2, // 44 = margins + gap
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  quadraImagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  quadraImageText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  quadraName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
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
    flexDirection: SCREEN_WIDTH < 400 ? 'column' : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    minWidth: SCREEN_WIDTH < 400 ? '80%' : 140,
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