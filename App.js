import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
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
    fontSize: 60,
    fontWeight: '500',
  },
  day: {
    width: screenWidth,
    alignItems: 'center',
  },
  temperature: {
    marginTop: 50,
    fontSize: 175,
    fontWeight: '500',
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});

