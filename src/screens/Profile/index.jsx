import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { colors, fontType } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const navigation = useNavigation();

  const user = {
    name: 'HendraChrist',
    email: 'hendrachrist@gmail.com',
    avatar: require('../../assets/img/profile.png'),
  };

  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('guitars')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuitars(list);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.grey() }]}
        onPress={() => navigation.navigate('AddGuitar')}
      >
        <Text style={styles.buttonText}>Tambah Gitar</Text>
      </TouchableOpacity>

      <Text style={[styles.title2, { marginTop: 30 }]}>Daftar Gitar Saya</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : guitars.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Belum ada data gitar.
        </Text>
      ) : (
        guitars.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.guitarImage} />
            <View style={styles.guitarInfo}>
              <Text style={styles.guitarBrand}>{item.brand}</Text>
              <Text style={styles.guitarModel}>{item.model}</Text>
              <Text style={styles.guitarDesc}>{item.description}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: colors.white() },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.grey(),
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.white(),
    textAlign: 'center',
  },
  title2: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
    marginBottom: 20,
  },
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
  card: {
    flexDirection: 'row',
    backgroundColor: colors.grey(0.1),
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  guitarImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  guitarInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  guitarBrand: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
  },
  guitarModel: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(0.8),
  },
  guitarDesc: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
    marginTop: 4,
  },
});

export default Profile;