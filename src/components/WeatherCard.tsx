import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

interface WeatherCardProps {
  temperatura: number | null;
  condicaoClima: string | null;
  loading: boolean;
  error: string | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getWeatherIcon = (condicao: string | null): string => {
  if (!condicao) return '❓';
  
  const condicaoLower = condicao.toLowerCase();
  
  if (condicaoLower.includes('limpo') || condicaoLower.includes('claro')) return '☀️';
  if (condicaoLower.includes('nublado') || condicaoLower.includes('nuvens')) return '☁️';
  if (condicaoLower.includes('chuva')) return '🌧️';
  if (condicaoLower.includes('trovoada')) return '⛈️';
  if (condicaoLower.includes('neve')) return '❄️';
  if (condicaoLower.includes('nevoeiro')) return '🌫️';
  if (condicaoLower.includes('parcialmente')) return '⛅';
  
  return '🌤️';
};

const getTemperatureColor = (temp: number | null): string => {
  if (!temp) return '#666';
  
  if (temp <= 10) return '#4A90E2';
  if (temp <= 20) return '#50C878';
  if (temp <= 30) return '#FFB84D';
  return '#FF6B6B';
};

export default function WeatherCard({ 
  temperatura, 
  condicaoClima, 
  loading, 
  error 
}: WeatherCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    if (!loading && !error) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.weatherCard}>
        <ActivityIndicator size="small" color="#FF4444" />
        <Text style={styles.loadingText}>Clima</Text>
      </View>
    );
  }

  if (error) {
    return (
      <TouchableOpacity style={[styles.weatherCard, styles.errorCard]} onPress={openModal}>
        <Text style={styles.weatherIcon}>❌</Text>
        <Text style={styles.errorText}>Erro</Text>
      </TouchableOpacity>
    );
  }

  if (temperatura !== null) {
    const temperatureColor = getTemperatureColor(temperatura);
    const weatherIcon = getWeatherIcon(condicaoClima);

    return (
      <>
        <TouchableOpacity 
          style={[styles.weatherCard, styles.activeCard]} 
          onPress={openModal}
          activeOpacity={0.8}
        >
          <View style={styles.cardContent}>
            <Text style={styles.weatherIcon}>{weatherIcon}</Text>
            <Text style={[styles.temperatureText, { color: temperatureColor }]}>
              {temperatura.toFixed(0)}°
            </Text>
            <Text style={styles.locationText}>Pelotas</Text>
          </View>
          <View style={styles.pulseIndicator} />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Clima em Pelotas</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.weatherDetails}>
                    <View style={styles.mainWeatherInfo}>
                      <Text style={styles.modalWeatherIcon}>{weatherIcon}</Text>
                      <Text style={[styles.modalTemperature, { color: temperatureColor }]}>
                        {temperatura.toFixed(1)}°C
                      </Text>
                    </View>
                    
                    <View style={styles.weatherDescription}>
                      <Text style={styles.conditionText}>{condicaoClima}</Text>
                      <Text style={styles.updateText}>Dados atualizados em tempo real</Text>
                    </View>

                    <View style={styles.temperatureScale}>
                      <View style={styles.scaleItem}>
                        <Text style={styles.scaleIcon}>🥶</Text>
                        <Text style={styles.scaleText}>Frio</Text>
                        <Text style={styles.scaleTemp}>≤10°</Text>
                      </View>
                      <View style={styles.scaleItem}>
                        <Text style={styles.scaleIcon}>😊</Text>
                        <Text style={styles.scaleText}>Agradável</Text>
                        <Text style={styles.scaleTemp}>11-20°</Text>
                      </View>
                      <View style={styles.scaleItem}>
                        <Text style={styles.scaleIcon}>☀️</Text>
                        <Text style={styles.scaleText}>Quente</Text>
                        <Text style={styles.scaleTemp}>21-30°</Text>
                      </View>
                      <View style={styles.scaleItem}>
                        <Text style={styles.scaleIcon}>🔥</Text>
                        <Text style={styles.scaleText}>Muito Quente</Text>
                        <Text style={styles.scaleTemp}>≥31°</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  }

  return (
    <View style={styles.weatherCard}>
      <Text style={styles.weatherIcon}>❓</Text>
      <Text style={styles.noDataText}>--°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#F0F0F0',
    minWidth: 80,
    alignItems: 'center',
  },
  activeCard: {
    borderColor: '#FF4444',
    transform: [{ scale: 1 }],
  },
  errorCard: {
    borderColor: '#FF6B6B',
  },
  cardContent: {
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  temperatureText: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loadingText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 10,
    color: '#FF6B6B',
    marginTop: 4,
    fontWeight: '600',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
    fontWeight: '600',
  },
  pulseIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: SCREEN_WIDTH - 40,
    maxWidth: 400,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  weatherDetails: {
    padding: 20,
  },
  mainWeatherInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalWeatherIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  modalTemperature: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 5,
  },
  weatherDescription: {
    alignItems: 'center',
    marginBottom: 25,
  },
  conditionText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  updateText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  temperatureScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  scaleItem: {
    alignItems: 'center',
    flex: 1,
  },
  scaleIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  scaleText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  scaleTemp: {
    fontSize: 8,
    color: '#999',
    textAlign: 'center',
  },
});