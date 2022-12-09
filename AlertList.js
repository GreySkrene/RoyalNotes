import React from 'react';
import { useState, useReducer } from 'react';

import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View, 
    SafeAreaView, 
    FlatList,
    Image, 
    TextInput,
    Button,
    Pressable,
    Alert,
    Platform,
    Dimensions
  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../config/colors'
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import IconView from '../components/IconView'
import { actionCreators, reducer, initialState } from '../components/todos'
import categoryColors from '../config/categoryColors';

function AlertList( props, items, onPressItem) {
    return (
        <View
            style={styles.alertList}
        >
            <Text style={styles.warningTitle}>
                Recent Notes:
            </Text>
            <FlatList
            data={items}
            style={styles.warningList}
            keyExtractor={(item) => item.id}
            />
        </View>
    );
}

// style={[styles.warningItem, { backgroundColor: item.color}]}
// onPress={(item) => navigateToDescription(item)}
// Implement if possible lol.

    // renderItem={({ item, index }) => (
    //     <TouchableOpacity>
            
    //     </TouchableOpacity>
    // )}

function navigateToDescription(item) {
    return (
        props.navigation.navigate('Details', { title: itemTitle, categoryID: id })
    );
}

    // <TouchableOpacity
    // style={[styles.item, { backgroundColor: categoryColors.arrayOfColors[index%8] }]}
    // onPress={() => onPressItem(item.title, item.id)}
    // >
    //     <Text style={styles.title}>{item.title}</Text>
    //     <TouchableOpacity 
    //         style={styles.removeCategoryButton} 
    //         onPress={() => onPressDelete(item.id)} 
    //         >
    //             <Text style={{ fontWeight: 'bold', color: colors.warningred }} >X</Text>
    //     </TouchableOpacity>
    // </TouchableOpacity>

export default AlertList;

const styles = StyleSheet.create({
    alertList: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        width: "90%",
        height: 150,
        marginTop: 5,
    },
    warningItem: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 75,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
    },
    warningList: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        width: "90%",
        height: 150,
        marginTop: 5,
        // Some way to have space between the two lists.
    },
    warningTitle: {
        color: colors.lightgrey,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 3,
    },
})
