import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from '@env';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState('loading');
  const [city, setCity] = useState(null);
  const [days, setDays] = useState([]);
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

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`,
      );
      const json = await response.json();

      setDays(json.daily);
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled={true} horizontal={true} showsHorizontalScrollIndicator={false}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
            </View>
          ))
        )}
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
  temp: {
    marginTop: 50,
    fontSize: 175,
    fontWeight: '400',
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
