import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import InfoSections from '../components/InfoSections';
import ImageViewerModal from '../components/ImageViewerModal';
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
      Alert.alert("Erro", `Não foi possível carregar a temperatura: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.navbarNav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>O Gonzaga</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Quadras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Fale Conosco</Text>
            
          </TouchableOpacity>
        </View>
        <View style={styles.navbarBottomLine}></View>
      </View>

      <InfoSections onQuadraImagePress={handleImagePress} />

      <View style={styles.mainContent}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Carregando temperatura...</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>Erro: {error}</Text>
        ) : temperatura !== null ? (
          <View style={styles.temperatureContainer}>
            <Text style={styles.temperatureText}>
             {temperatura.toFixed(1)}°C
            </Text>
            {condicaoClima && <Text style={styles.condicaoText}>{condicaoClima}</Text>}
          </View>
        ) : (
          <Text style={styles.noDataText}>
            Nenhuma informação de temperatura disponível.
          </Text>
        )}
      </View>

      <ImageViewerModal
        visible={isImageViewerVisible}
        imageUrl={currentImageUrl}
        onClose={handleCloseImageViewer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  navItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  navbarBottomLine: {
    height: 2,
    backgroundColor: '#FFFFFFFF',
    width: '100%',
  },
  mainContent: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    marginTop: 'auto',
  },
  loadingContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  temperatureContainer: {
    alignItems: 'flex-end',
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  dataHoraText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center'
  },
  climaIcone: {
     marginTop: 10,
  },
  condicaoText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center'
  }
});
