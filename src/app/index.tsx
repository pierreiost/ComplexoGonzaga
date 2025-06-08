import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  StatusBar, 
  Dimensions,
  SafeAreaView 
} from "react-native";
import InfoSections from '../components/InfoSections';
import ImageViewerModal from '../components/ImageViewerModal';
import Navbar from '../components/Navbar';
import WeatherDisplay from '../components/WeatherDisplay';
import { fetchWeatherData } from '../services/wheaterService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Page() {
  const [temperatura, setTemperatura] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataHora, setDataHora] = useState<string | null>(null);
  const [condicaoClima, setCondicaoClima] = useState<string | null>(null);

  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const handleImagePress = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setIsImageViewerVisible(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerVisible(false);
    setCurrentImageUrl(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { temperatura, condicaoClima, dataHora } = await fetchWeatherData();
        setTemperatura(temperatura);
        setCondicaoClima(condicaoClima);
        setDataHora(dataHora);
      } catch (err: any) {
        console.error("Erro:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Navbar />
        </View>
        
        <View style={styles.content}>
          <InfoSections onQuadraImagePress={handleImagePress} />
        </View>

        <View style={styles.weatherContainer}>
          <WeatherDisplay 
            temperatura={temperatura}
            condicaoClima={condicaoClima}
            loading={loading}
            error={error}
          />
        </View>

        {/* Modal de Visualização de Imagem */}
        <ImageViewerModal
          visible={isImageViewerVisible}
          imageUrl={currentImageUrl}
          onClose={handleCloseImageViewer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  weatherContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 5,
  },
});