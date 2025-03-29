import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { styles } from './styles/AppStyles';
import { Weather } from './types/weather';
import { WeatherCard } from './components/WeatherCard';
import { LocationPermissionResponse } from 'expo-location/src/Location.types';

export default function App() {
  const [city, setCity] = useState<any>('');
  const [days, setDays] = useState<Weather[]>([]);

  const getCityFromCurrentLocation = async () => {
    const permissionResponse: LocationPermissionResponse =
      await Location.requestForegroundPermissionsAsync();
    if (permissionResponse.status !== 'granted') {
      throw new Error('permission to access location was denied');
    }

    const locationObject: Location.LocationObject =
      await Location.getCurrentPositionAsync({
        accuracy: 5,
      });
    const geocodedAddresses: Location.LocationGeocodedAddress[] =
      await Location.reverseGeocodeAsync(locationObject.coords);

    return geocodedAddresses[0].city;
  };

  const fetchWeatherData = async (): Promise<Weather[]> => {
    return Array.from({ length: 3 }, (element, index) => ({
      temp: { day: 15 + index * 1.5 },
      weather: [{ main: ['Clear', 'Clouds', 'Rain'][index % 3] }],
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        const city = await getCityFromCurrentLocation();
        setCity(city);
        const days = await fetchWeatherData();
        setDays(days);
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <View style={[styles.day, { alignItems: 'center' }]}>
            <ActivityIndicator
              color="white"
              style={styles.activityIndicator}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => <WeatherCard key={index} day={day} />)
        )}
      </ScrollView>
    </View>
  );
}
