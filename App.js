import * as React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TextScreen from './src/pages/TextScreen';

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Değişen kısım
    backgroundColor: '#a6cfe3',
    paddingHorizontal: 20,
  },
  homeLogo: {
    width:400,
    height: 400,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1579eb',
    paddingVertical: 10,
    paddingHorizontal: 30, 
    borderRadius: 48,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

function HomeScreen({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <Image
        style={styles.homeLogo}
        source={require('./assets/home.png')}
      />
      <Text style={styles.title}>Unleash Your Imagination</Text>
      <Text style={styles.description}>
        Create Images from Words
        With Image AI, you can easily bring your imagination to life.
        All you need to do is express the image in your mind with words.
        Our artificial intelligence will analyze your text and transform it into a unique picture.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Text')}>
        <Text style={{ color: 'white' }}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Image AI" component={HomeScreen} />
        <Stack.Screen name="Text" component={TextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
