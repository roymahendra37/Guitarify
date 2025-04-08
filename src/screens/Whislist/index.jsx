import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { colors, fontType } from '../../theme';
import guitars from '../../data';

const Wishlist = () => {
  const wishlistIds = ['1', '2'];

  const wishlist = guitars.filter(guitar => wishlistIds.includes(guitar.id));

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Guitarify</Text>
        </View>
      <Text style={styles.title2}>Wishlist</Text>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardText}>
              <Text style={styles.name}>{item.brand} - {item.model}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Belum ada gitar favorit.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white(), padding: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.grey(), borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 24, fontFamily: fontType['Pjs-Bold'], color: colors.white(), textAlign: 'center' },
  title2: {
    fontSize: 24,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.grey(0.2),
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  description: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
});

export default Wishlist;
