import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const TextScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (text) => {
    setUserInput(text);
  };

  const generateImage = async () => {
    const data = { inputs: userInput };
    const response = await fetch(
      "https://api-inference.huggingface.co/models/SG161222/Realistic_Vision_V1.4",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } else {
      console.error('Görsel oluşturma başarısız:', response.statusText);
      // Hata mesajı gösterin
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#a6cfe3',
      alignItems: 'center',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor:'white',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
      width: '100%',
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#1579eb',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom:20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 20,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter the Text</Text>
      <TextInput
        value={userInput}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={generateImage} style={styles.button}>
          <Text style={styles.buttonText}>Create Image:</Text>
        </TouchableOpacity>
      </View>
      {imageUrl && (
        <View>
          <Text style={styles.heading}>Created Image:</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

export default TextScreen;
