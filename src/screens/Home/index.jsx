import React, { useState } from 'react';
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, ScrollView } from 'react-native';
import { colors, fontType } from '../../theme';
import { ListHorizontal } from '../../components';
import guitars from '../../data';
import { SearchNormal, Heart } from 'iconsax-react-native';

const Home = () => {
    const [selectedGuitar, setSelectedGuitar] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    const openModal = (guitar) => {
        setSelectedGuitar(guitar);
        setModalVisible(true);
    };

    const toggleWishlist = (id) => {
        if (wishlist.includes(id)) {
          setWishlist(wishlist.filter(item => item !== id));
        } else {
          setWishlist([...wishlist, id]);
        }
      };      

    const brands = [...new Set(guitars.map(guitar => guitar.brand))];

    const filteredGuitars = guitars.filter(guitar => 
        (selectedBrand ? guitar.brand === selectedBrand : true) &&
        (guitar.brand.toLowerCase().includes(search.toLowerCase()) ||
        guitar.model.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <View style={styles.container}>
    <View style={styles.header}>
        <Text style={styles.title}>Guitarify</Text>
    </View>

    <ListHorizontal guitars={guitars} onSelect={openModal} />

    {/* Search Bar */}
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

    {/* Filter Buttons */}
    <View style={styles.filterContainer}>
        <FlatList
            horizontal
            data={['All', ...brands]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.filterButton, selectedBrand === item ? styles.selectedFilter : {}]}
                    onPress={() => setSelectedBrand(item === 'All' ? null : item)}
                >
                    <Text style={styles.filterText}>{item}</Text>
                </TouchableOpacity>
            )}
        />
    </View>

    {/* Guitar List */}
    <FlatList
        data={filteredGuitars}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Tidak ada gitar ditemukan.</Text>
            </View>
        }
        // renderItem={({ item }) => (
        //     <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
        //         <Image source={item.image} style={styles.image} />
        //         <View style={styles.cardTextContainer}>
        //             <Text style={styles.cardTitle}>{item.brand} - {item.model}</Text>
        //             <Text style={styles.cardDescription}>{item.description}</Text>
        //         </View>
        //     </TouchableOpacity>
        // )}
        renderItem={({ item }) => (
            <View style={styles.card}>
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
            </View>
          )}          
        keyboardShouldPersistTaps="handled"
    />
</View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white(), padding: 10 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.grey(), borderRadius: 10, marginBottom: 10 },
    title: { fontSize: 24, fontFamily: fontType['Pjs-Bold'], color: colors.white(), textAlign: 'center' },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.grey(0.2), padding: 10, borderRadius: 8, marginBottom: 10 },
    searchInput: { flex: 1, fontSize: 16, fontFamily: fontType['Pjs-Regular'], color: colors.black(), marginLeft: 8 },
    
    filterContainer: { flexDirection: 'row', marginBottom: 10 },
    filterButton: { backgroundColor: colors.grey(0.3), paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginRight: 10 },
    activeFilter: { backgroundColor: colors.grey(0.6) },
    filterText: { fontSize: 14, fontFamily: fontType['Pjs-Medium'], color: colors.black() },
    
    listContainer: { paddingBottom: 20 },
    card: { flexDirection: 'row', backgroundColor: colors.grey(0.3), marginVertical: 8, padding: 15, borderRadius: 12, alignItems: 'center', justifyContent: 'space-between' },
    image: { width: 80, height: 80, borderRadius: 5, marginRight: 15 },
    cardTextContainer: { flex: 1 },
    cardTitle: { fontSize: 16, fontFamily: fontType['Pjs-Medium'], color: colors.black() },
    cardDescription: { fontSize: 14, fontFamily: fontType['Pjs-Regular'], color: colors.grey(0.7) },
});

export default Home;
