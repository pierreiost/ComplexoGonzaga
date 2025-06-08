import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TemperatureIndicatorProps {
  temperature: number;
  location: string;
  condition: string;
}

const TemperatureIndicator: React.FC<TemperatureIndicatorProps> = ({
  temperature,
  location,
  condition
}) => (
  <View style={styles.container}>
    <Text style={styles.temperature}>{temperature}°C</Text>
    <Text style={styles.location}>{location}</Text>
    <Text style={styles.condition}>{condition}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  condition: {
    fontSize: 8,
    color: '#888',
    marginTop: 1,
  },
});

export default TemperatureIndicator;