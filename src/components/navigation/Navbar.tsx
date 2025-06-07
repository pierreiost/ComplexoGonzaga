import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface NavItem {
  id: string;
  title: string;
  onPress: () => void;
}

interface NavbarProps {
  items: NavItem[];
  backgroundColor?: string;
  textColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
  items, 
  backgroundColor = '#007bff', 
  textColor = '#fff' 
}) => {
  const screenWidth = Dimensions.get('window').width;
  const isSmallScreen = screenWidth < 768;

  return (
    <View style={[styles.navbar, { backgroundColor }]}>
      <Text style={[styles.logo, { color: textColor }]}>
        Complexo Gonzaga
      </Text>
      
      <View style={[styles.navItems, isSmallScreen && styles.navItemsSmall]}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.navItem}
            onPress={item.onPress}
          >
            <Text style={[styles.navText, { color: textColor }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItemsSmall: {
    flexDirection: 'column',
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  navItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Navbar;