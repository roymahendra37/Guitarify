import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../../theme';
import { useNavigation } from '@react-navigation/native'; // << Tambahan

const Profile = () => {
  const navigation = useNavigation(); // << Tambahan

  const user = {
    name: 'HendraChrist',
    email: 'hendrachrist@gmail.com',
    avatar: require('../../assets/img/profile.png'),
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guitarify</Text>
      </View>

      <Text style={styles.title2}>My Profile</Text>

      <View style={styles.profileContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profil</Text>
      </TouchableOpacity>

      {/* Tombol Tambah Gitar */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.grey() }]}
        onPress={() => navigation.navigate('AddGuitar')} // << Navigate ke AddGuitar
      >
        <Text style={styles.buttonText}>Tambah Gitar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white(), padding: 10 },
  title2: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
    marginBottom: 20,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.grey(), borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 24, fontFamily: fontType['Pjs-Bold'], color: colors.white(), textAlign: 'center' },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  email: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
  button: {
    backgroundColor: colors.black(),
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.white(),
  },
});

export default Profile;
