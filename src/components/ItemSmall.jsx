import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { fontType, colors } from '../theme';

const ItemSmall = ({ guitar, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={guitar.image} style={styles.image} />
            <Text style={styles.text}>{guitar.brand} - {guitar.model}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginRight: 15 },
    image: { width: 120, height: 120, borderRadius: 10 },
    text: { fontSize: 14, fontFamily: fontType['Pjs-Medium'], color: colors.black(), marginTop: 5 },
});

export default ItemSmall;
