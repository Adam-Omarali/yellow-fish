import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Home() {
  const [translation, setTranslation] = useState('');
  const [text, setText] = useState(''); // Input text
  const [lang, setLang] = useState('es'); // Language selection, default to Spanish

  const translateText = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate_translation', { text, lang });
      const translation = response.data.translation;
      setTranslation(translation); // Update the translation state with the result
      console.log('HELLO');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter text"
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
      <Picker
        selectedValue={lang}
        onValueChange={(newLang) => setLang(newLang)}
      >
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Hindi" value="hi" />
        {/* Add more language options */}
      </Picker>
      <TouchableOpacity onPress={translateText}>
        <Text>Translate</Text>
      </TouchableOpacity>
        <Text>
          Translation: {translation}
        </Text>
    </View>
  );
}
