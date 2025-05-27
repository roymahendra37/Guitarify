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
import firestore from '@react-native-firebase/firestore';

const AddGuitar = ({ navigation }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSave = async () => {
    if (!brand || !model || !description || !image) {
      Alert.alert('Error', 'Semua data harus diisi.');
      return;
    }

    try {
      await firestore().collection('guitars').add({
        brand,
        model,
        description,
        image,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Berhasil', 'Data gitar berhasil ditambahkan!', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Main', { screen: 'Profile' }),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data ke Firebase.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Data Gitar</Text>

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
        multiline
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
  uploadButton: {
    backgroundColor: colors.grey(0.4),
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  }
});

export default AddGuitar;