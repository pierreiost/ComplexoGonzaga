import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LandingPage from './src/screens/LandingPage';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <LandingPage />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;