import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { colors, fontType } from '../../theme';

const AddGuitar = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const API_URL = 'https://682c10a3d29df7a95be557a4.mockapi.io/api/guitars';

  const handleSave = async () => {
    if (!name || !brand || !model || !description || !image) {
      Alert.alert('Error', 'Semua data harus diisi.');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          brand,
          model,
          description,
          image,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Berhasil', 'Data gitar berhasil ditambahkan!');
        // Reset form
        setName('');
        setBrand('');
        setModel('');
        setDescription('');
        setImage('');
      } else {
        Alert.alert('Gagal', 'Terjadi kesalahan saat menyimpan data.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal terhubung ke server.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Data Gitar</Text>

      <TextInput
        placeholder="Nama Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Merek Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
      />

      <TextInput
        placeholder="Model Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={model}
        onChangeText={setModel}
        style={styles.input}
      />

      <TextInput
        placeholder="Deskripsi Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <TextInput
        placeholder="URL Gambar Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white(),
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey(),
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.black(),
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white(),
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default AddGuitar;