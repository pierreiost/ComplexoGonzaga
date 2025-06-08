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

const PELOTAS_LAT = -31.77;
const PELOTAS_LON = -52.34;

const METEOBLUE_API_KEY = 'W1HFf0IOLYdtAJlG.'; // retirar ponto do final para funcionar
const METEOBLUE_API_URL = `https://my.meteoblue.com/packages/current?lat=${PELOTAS_LAT}&lon=${PELOTAS_LON}&apikey=${METEOBLUE_API_KEY}&format=json`;


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
    backgroundColor: '#FFFFFFFF',
    paddingTop: 20,
  },
  navbar: {
    width: '100%',
  },
  navbarNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
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