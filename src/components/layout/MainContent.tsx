// src/components/layout/MainLayout.tsx
import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { useWeatherData } from '../../hooks/useWeatherData';
import { useImageViewer } from '../../hooks/useImageViewer';
import Navbar from '../Navbar';
import InfoSections from '../InfoSections';
import WeatherDisplay from '../WeatherDisplay';
import ImageViewerModal from '../ImageViewerModal';

const MainLayout: React.FC = () => {
  const { temperatura, condicaoClima, loading, error } = useWeatherData();
  const { isVisible, imageUrl, openImage, closeImage } = useImageViewer();

  return (
    <>
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
          <InfoSections onQuadraImagePress={openImage} />
        </View>

        <View style={styles.weatherContainer}>
          <WeatherDisplay 
            temperatura={temperatura}
            condicaoClima={condicaoClima}
            loading={loading}
            error={error}
          />
        </View>

        <ImageViewerModal
          visible={isVisible}
          imageUrl={imageUrl}
          onClose={closeImage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    width: '100%',
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

export default MainLayout;