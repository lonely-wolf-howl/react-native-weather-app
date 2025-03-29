import React from 'react';
import { View, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Weather } from '../types/weather';
import { icons, WeatherMain } from '../constants/weatherIcons';
import { styles } from '../styles/AppStyles';

type Props = {
  day: Weather;
};

export const WeatherCard = ({ day }: Props) => {
  return (
    <View style={styles.day}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.temp}>{day.temp.day.toFixed(1)}</Text>
        <Fontisto
          name={icons[day.weather[0].main as WeatherMain]}
          size={80}
          color="white"
        />
      </View>
      <Text style={styles.description}>{day.weather[0].main}</Text>
    </View>
  );
};
