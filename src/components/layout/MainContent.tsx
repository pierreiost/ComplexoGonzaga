import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainContent: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.hero}>
      <Text style={styles.title}>Complexo Esportivo Gonzaga</Text>
      <Text style={styles.subtitle}>
        O melhor espaço para suas atividades esportivas
      </Text>
    </View>
    
    <View style={styles.content}>
      <Text style={styles.description}>
        Bem-vindo ao Complexo Esportivo Gonzaga! Oferecemos as melhores 
        instalações para a prática de diversos esportes em um ambiente 
        moderno e acolhedor.
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    marginTop: 30,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    textAlign: 'center',
  },
});

export default MainContent;