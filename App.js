import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState('loading');
  const [city, setCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('permission to access location was denied');
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({ accuracy: 5 });
      const location = await Location.reverseGeocodeAsync(coords);

      setLocation(location[0]);
      setCity(location[0].city);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.day}>
          <Text style={styles.temperature}>29</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>29</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4b407',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 45,
    fontWeight: '600',
  },
  day: {
    width: screenWidth,
    alignItems: 'center',
  },
  temperature: {
    marginTop: 50,
    fontSize: 175,
    fontWeight: '400',
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});

