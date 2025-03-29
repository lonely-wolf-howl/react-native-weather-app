import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 45,
    fontWeight: '600',
    color: 'white',
  },
  day: {
    width: screenWidth,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  temp: {
    marginTop: 50,
    fontSize: 100,
    fontWeight: '400',
    color: 'white',
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    fontWeight: '500',
    color: 'white',
  },
  activityIndicator: {
    marginTop: 10,
  },
});
