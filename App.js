import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from '@env';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  const [location, setLocation] = useState('loading');
  const [city, setCity] = useState(null);
  const [days, setDays] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('permission to access location was denied');
    }

    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const geocoded = await Location.reverseGeocodeAsync(coords);

    return { coords, location: geocoded[0], city: geocoded[0].city };
  };

  const fetchWeatherData = async (coords) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=alerts,minutely,hourly&units=metric&appid=${API_KEY}`
    );
    const { daily } = await response.json();

    return daily;
  };

  useEffect(() => {
    async function initializeWeather() {
      try {
        const { coords, location, city } = await getCurrentLocation();

        setLocation(location);
        setCity(city);

        const daily = await fetchWeatherData(coords);

        setDays(daily);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    initializeWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={styles.activityIndicator}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
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
  activityIndicator: {
    marginTop: 10,
  },
});
