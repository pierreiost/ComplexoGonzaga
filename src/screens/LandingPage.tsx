import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Navbar from '../components/navigation/Navbar';
import WeatherDisplay from '../components/weather/WeatherDisplay';
import MainContent from '../components/layout/MainContent';

const LandingPage: React.FC = () => {
  const navItems = [
    {
      id: 'home',
      title: 'Home',
      onPress: () => console.log('Home pressed'),
    },
    {
      id: 'about',
      title: 'Sobre',
      onPress: () => console.log('About pressed'),
    },
    {
      id: 'services',
      title: 'Serviços',
      onPress: () => console.log('Services pressed'),
    },
    {
      id: 'contact',
      title: 'Contato',
      onPress: () => console.log('Contact pressed'),
    },
  ];

  return (
    <View style={styles.container}>
      <Navbar items={navItems} />
      
      <ScrollView style={styles.content}>
        <MainContent />
      </ScrollView>
      
      <WeatherDisplay position="bottom-right" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});

export default LandingPage;