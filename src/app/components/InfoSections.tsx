import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import SocialButtons from './faleConosco';

interface InfoSectionsProps {
  onQuadraImagePress?: (imageUrl: string) => void;
}

const QUADRA_IMAGE_URLS = [
  'https://placehold.co/300x200/FF0000/FFFFFF?text=Quadra+1',
  'https://placehold.co/300x200/00FF00/000000?text=Quadra+2',
  'https://placehold.co/300x200/0000FF/FFFFFF?text=Quadra+3',
  'https://placehold.co/300x200/FFFF00/000000?text=Quadra+4',
];

const QUADRA_SUBTITLES = [
    'Quadra Principal',
    'Quadra de Areia',
    'Quadra Coberta',
    'Quadra de Treino',
];


export default function InfoSections({ onQuadraImagePress }: InfoSectionsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>O Gonzaga</Text>
        <View style={styles.infoPlaceholder}>
          <Text style={styles.placeholderText}>Pré-informações sobre O Gonzaga</Text>
        </View>
      </View>

      <View style={styles.section}>
         {/* Título da seção Quadras - Ajustado marginBottom */}
         <Text style={styles.sectionTitleQuadras}>Quadras</Text>
        <View style={styles.quadrasImagesContainer}>
            {QUADRA_IMAGE_URLS.map((url, index) => (
                <View key={index} style={styles.quadraItemContainer}>
                    <TouchableOpacity
                        style={styles.quadraImageArea}
                        onPress={() => onQuadraImagePress && onQuadraImagePress(url)}
                    >
                        <Text style={styles.quadraImagePlaceholderText}>Ver Foto {index + 1}</Text>
                    </TouchableOpacity>
                    <Text style={styles.quadraSubtitle}>{QUADRA_SUBTITLES[index] || `Quadra ${index + 1}`}</Text>
                </View>
            ))}
        </View>
      </View>

      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Fale Conosco</Text>
        <View style={styles.infoPlaceholder}>
           <SocialButtons />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  section: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#ff0000',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
   sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5, // Margem original para outros títulos
    color: '#333',
   },
   // Novo estilo específico para o título da seção Quadras
   sectionTitleQuadras: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15, // Aumenta a margem inferior para separar do conteúdo
    color: '#333',
   },
  infoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  quadrasImagesContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: 5,
  },
  quadraItemContainer: {
      width: '48%',
      marginBottom: 10,
      alignItems: 'center',
  },
  quadraImageArea: {
      width: '100%',
      aspectRatio: 4/3,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
      borderRadius: 5,
  },
  quadraImagePlaceholderText: {
      fontSize: 12,
      color: '#555',
  },
  quadraSubtitle: {
      fontSize: 12,
      color: '#333',
      textAlign: 'center',
  }
});
