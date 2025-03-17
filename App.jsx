import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, Modal, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors, fontType } from './src/theme';
import { SearchNormal, CloseCircle } from 'iconsax-react-native';

const { width } = Dimensions.get('window');

const guitars = [
    { id: '1', brand: 'Fender', model: 'Stratocaster', description: 'Gitar klasik dengan suara khas.', image: require('./src/assets/img/guitar1.jpg') },
    { id: '2', brand: 'Gibson', model: 'Les Paul', description: 'Gitar dengan sustain yang luar biasa.', image: require('./src/assets/img/guitar2.jpg') },
    { id: '3', brand: 'Ibanez', model: 'RG Series', description: 'Gitar dengan neck yang cepat.', image: require('./src/assets/img/guitar3.png') },
    { id: '4', brand: 'PRS', model: 'Custom 24', description: 'Gitar dengan tone yang seimbang.', image: require('./src/assets/img/guitar4.jpg') },
];

const App = () => {
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedGuitar, setSelectedGuitar] = useState(null);

    const openModal = (guitar) => {
        setSelectedGuitar(guitar);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Guitarify</Text>
            </View>

            {/* Guitar List in Horizontal ScrollView */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {guitars.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.guitarCard} onPress={() => openModal(item)}>
                        <Image source={item.image} style={styles.guitarImage} />
                        <Text style={styles.guitarText}>{item.brand} - {item.model}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

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

            {/* Guitar List */}
            <FlatList
                data={guitars.filter(guitar =>
                    guitar.brand.toLowerCase().includes(search.toLowerCase()) ||
                    guitar.model.toLowerCase().includes(search.toLowerCase())
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.cardTitle}>{item.brand} - {item.model}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal */}
            {selectedGuitar && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={selectedGuitar.image} style={styles.modalImage} />
                            <Text style={styles.modalText}>{selectedGuitar.brand} - {selectedGuitar.model}</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <CloseCircle size="24" color={colors.white()} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white(), padding: 10 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: colors.grey(), borderRadius: 10, marginBottom: 10 },
    title: { fontSize: 24, fontFamily: fontType['Pjs-Bold'], color: colors.white(), marginLeft: 10 },
    
    scrollContainer: { paddingVertical: 10 },
    guitarCard: { alignItems: 'center', marginRight: 15 },
    guitarImage: { width: 120, height: 120, borderRadius: 10 },
    guitarText: { fontSize: 14, fontFamily: fontType['Pjs-Medium'], color: colors.black(), marginTop: 5 },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.grey(0.2), padding: 10, borderRadius: 8, marginBottom: 10 },
    searchInput: { flex: 1, fontSize: 16, fontFamily: fontType['Pjs-Regular'], color: colors.black(), marginLeft: 8 },

    listContainer: { paddingBottom: 20 },
    card: { flexDirection: 'row', backgroundColor: colors.grey(0.3), marginVertical: 8, padding: 15, borderRadius: 12, alignItems: 'center' },
    image: { width: 80, height: 80, borderRadius: 5, marginRight: 15 },
    cardTextContainer: { flex: 1 },
    cardTitle: { fontSize: 16, fontFamily: fontType['Pjs-Medium'], color: colors.black() },
    cardDescription: { fontSize: 14, fontFamily: fontType['Pjs-Regular'], color: colors.grey(0.7) },

    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
    modalContent: { backgroundColor: colors.white(), padding: 20, borderRadius: 10, alignItems: 'center', width: '80%' },
    modalImage: { width: 150, height: 300, borderRadius: 10, marginBottom: 10 },
    modalText: { fontSize: 18, fontFamily: fontType['Pjs-Bold'], color: colors.black(), marginBottom: 10 },
    modalButton: { marginTop: 10, backgroundColor: colors.grey(), padding: 10, borderRadius: 50, alignItems: 'center' },
});

export default App;