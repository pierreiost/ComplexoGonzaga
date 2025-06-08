import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <View style={styles.navbarNav}>
        <TouchableOpacity 
          style={styles.navItem}
          activeOpacity={0.8}
        >
          <Text style={styles.navText}>O Gonzaga</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          activeOpacity={0.8}
        >
          <Text style={styles.navText}>Quadras</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          activeOpacity={0.8}
        >
          <Text style={styles.navText}>Fale Conosco</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  navbarNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  navItem: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#FF4444',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1 }],
  },
  navText: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: SCREEN_WIDTH < 380 ? 11 : 13,
    letterSpacing: 0.5,
  },
});