import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';

const App = () => {
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

  const styles = {
    container: {
      flex: 1,
      padding: 50,
      top:100,
      backgroundColor: '#f5f5f5',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#000',
      color: '#fff',
      borderRadius: 5,
      padding: 10,
      marginTop: 10,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 20,
      marginTop: 10,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Metni giriniz:</Text>
      <TextInput
        value={userInput}
        onChangeText={handleInputChange}
        style={styles.input}
      />
      <Button title="Görsel Oluştur" onPress={generateImage} style={styles.button} />
      {imageUrl && (
        <View>
          <Text style={styles.heading}>Oluşturulan Görsel:</Text>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

export default App;