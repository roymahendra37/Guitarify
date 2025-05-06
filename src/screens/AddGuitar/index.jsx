import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';

const AddGuitar = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah Data Gitar</Text>

      {/* Input untuk Nama Gitar */}
      <TextInput
        placeholder="Nama Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Input untuk Merek Gitar */}
      <TextInput
        placeholder="Merek Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={brand}
        onChangeText={setBrand}
        style={styles.input}
      />

      {/* Input untuk Model Gitar */}
      <TextInput
        placeholder="Model Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={model}
        onChangeText={setModel}
        style={styles.input}
      />

      {/* Input untuk Deskripsi Gitar */}
      <TextInput
        placeholder="Deskripsi Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {/* Input untuk URL Gambar Gitar */}
      <TextInput
        placeholder="URL Gambar Gitar"
        placeholderTextColor={colors.grey(0.6)}
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      {/* Tampilkan Gambar Gitar jika URL diisi */}
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      ) : null}

      <TouchableOpacity style={styles.button}>
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
