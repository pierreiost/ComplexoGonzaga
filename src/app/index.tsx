import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { pictocodeToString } from './components/apiWheater';
import InfoSections from './components/InfoSections';
import ImageViewerModal from './components/ImageViewerModal';

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
    const fetchWeather = async () => {
      console.log("Iniciando fetchWeather...");
      try {
        setLoading(true);
        setError(null);
        console.log("Chamando API:", METEOBLUE_API_URL);
        const response = await fetch(METEOBLUE_API_URL);
        console.log("Resposta da API recebida:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erro HTTP: ${response.status} - ${errorText || response.statusText}`);
        }

        const data = await response.json();
        console.log("Dados da API:", data);

        let temp: number | null = null;
        let timeString: string | null = null;
        let conditionString: string | null = null;
        let pictocode: number | null = null;


        if (data && data.data_current) {
          console.log("Extraindo dados de data.data_current");
          if (data.data_current.temperature !== undefined && data.data_current.temperature !== null) {
             temp = data.data_current.temperature;
          }

          if (data.data_current.time) {
            timeString = data.data_current.time;
          }

          if (data.data_current.pictocode !== undefined && data.data_current.pictocode !== null) {
              pictocode = data.data_current.pictocode;
          }

           if (pictocode !== null) {
               conditionString = pictocodeToString[pictocode] || 'Condição Desconhecida';
               console.log(`Pictocode ${pictocode} mapeado para string: ${conditionString}`);
           } else {
               conditionString = 'Condição Desconhecida';
           }

        }


        if (temp !== null) {
          setTemperatura(temp);

          let dataHoraLocal = new Date();
           if (timeString) {
             try {
               dataHoraLocal = parseISO(timeString);
               dataHoraLocal = new Date(dataHoraLocal.getTime() - (3 * 60 * 60 * 1000));

             } catch (e) {
               console.error("Erro ao parsear string de data ou ajustar fuso horário:", timeString, e);
             }
           }

          const dataHoraFormatada = format(dataHoraLocal, "dd 'de' MMMM 'de' HH:mm", { locale: ptBR });
          setDataHora(dataHoraFormatada);

          setCondicaoClima(conditionString);

        } else {
          throw new Error('Temperatura não encontrada nos dados da API.');
        }
      } catch (e: any) {
        console.error("Erro ao buscar dados da MeteoBlue:", e);
        setError(`Não foi possível carregar a temperatura: ${e.message}`);
        Alert.alert("Erro", `Não foi possível carregar a temperatura: ${e.message}`);
      } finally {
        setLoading(false);
        console.log("fetchWeather finalizado.");
      }
    };

    fetchWeather();
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
