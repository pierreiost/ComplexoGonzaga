import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

interface WeatherDisplayProps {
  temperatura: number | null;
  condicaoClima: string | null;
  loading: boolean;
  error: string | null;
}

export default function WeatherDisplay({ 
  temperatura, 
  condicaoClima, 
  loading, 
  error 
}: WeatherDisplayProps) {
  if (loading) {
    return (
      <View style={styles.mainContent}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando temperatura...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.mainContent}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }

  if (temperatura !== null) {
    return (
      <View style={styles.mainContent}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureText}>
            {temperatura.toFixed(1)}°C
          </Text>
          {condicaoClima && (
            <Text style={styles.condicaoText}>{condicaoClima}</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContent}>
      <Text style={styles.noDataText}>
        Nenhuma informação de temperatura disponível.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center'
  },
  condicaoText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
    textAlign: 'center'
  }
});