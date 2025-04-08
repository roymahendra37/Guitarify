import React from 'react';
import { ScrollView, View } from 'react-native';
import ItemSmall from './ItemSmall';

const ListHorizontal = ({ guitars, onSelect }) => {
    if (guitars.length === 0) return null;

    return (
        <View style={{ marginTop: 10 }}> 
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
            >
                {guitars.map((item) => (
                    <ItemSmall key={item.id} guitar={item} onPress={() => onSelect(item)} />
                ))}
            </ScrollView>
        </View>
    );
};

export default ListHorizontal;
