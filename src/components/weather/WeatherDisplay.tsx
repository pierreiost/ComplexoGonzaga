import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useWeather } from '../../hooks/useWeather';
import TemperatureIndicator from './TemperatureIndicator';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

interface WeatherDisplayProps {
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ 
  position = 'bottom-right' 
}) => {
  const { weatherData, loading, error, refetch } = useWeather();

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return styles.topRight;
      case 'top-left':
        return styles.topLeft;
      case 'bottom-left':
        return styles.bottomLeft;
      default:
        return styles.bottomRight;
    }
  };

  return (
    <View style={[styles.container, getPositionStyles()]}>
      {loading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={refetch}
        />
      )}
      
      {weatherData && !loading && !error && (
        <TemperatureIndicator 
          temperature={weatherData.temperature}
          location={weatherData.location}
          condition={weatherData.condition}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topRight: {
    top: 20,
    right: 20,
  },
  topLeft: {
    top: 20,
    left: 20,
  },
  bottomRight: {
    bottom: 20,
    right: 20,
  },
  bottomLeft: {
    bottom: 20,
    left: 20,
  },
});

export default WeatherDisplay;