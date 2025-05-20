import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  Easing
} from 'react-native';
import { colors, fontType } from '../../theme';
import { ListHorizontal } from '../../components';
import guitars from '../../data';
import { SearchNormal, Heart } from 'iconsax-react-native';

const GuitarCard = ({ item, openModal, toggleWishlist, wishlist }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{item.brand} - {item.model}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleWishlist(item.id)}>
        <Heart
          size="24"
          variant={wishlist.includes(item.id) ? 'Bold' : 'Linear'}
          color={wishlist.includes(item.id) ? 'red' : colors.black()}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const Home = () => {
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const openModal = (guitar) => {
    setSelectedGuitar(guitar);
    setModalVisible(true);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const brands = [...new Set(guitars.map((guitar) => guitar.brand))];

  const filteredGuitars = guitars.filter(
    (guitar) =>
      (selectedBrand ? guitar.brand === selectedBrand : true) &&
      (guitar.brand.toLowerCase().includes(search.toLowerCase()) ||
        guitar.model.toLowerCase().includes(search.toLowerCase()))
  );

  const renderItem = ({ item }) => (
    <GuitarCard
      item={item}
      openModal={openModal}
      toggleWishlist={toggleWishlist}
      wishlist={wishlist}
    />
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Guitarify</Text>
      </Animated.View>

      <ListHorizontal guitars={guitars} onSelect={openModal} />

      <View style={styles.searchContainer}>
        <SearchNormal size="20" color={colors.grey(0.7)} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari gitar..."
          placeholderTextColor={colors.grey(0.6)}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={['All', ...brands]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedBrand === item ? styles.selectedFilter : {}
              ]}
              onPress={() => setSelectedBrand(item === 'All' ? null : item)}
            >
              <Text style={styles.filterText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredGuitars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Tidak ada gitar ditemukan.
            </Text>
          </View>
        }
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white(), padding: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey(0.2),
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.black(),
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: colors.grey(0.3),
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedFilter: {
    backgroundColor: colors.grey(0.6),
  },
  filterText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.grey(0.3),
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.black(),
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.grey(0.7),
  },
});

export default Home;
