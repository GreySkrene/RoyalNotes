import React from 'react';
import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    Button,
    Pressable,
    Alert,
    Platform,
    Dimensions
  } from 'react-native';

function IconView() {
    return (
    <View style={styles.icons}>
        <Image  
            resizeMode="contain"
            style={styles.icon} 
            source={require('../assets/crownicon.png')} 
        /> 
        <Image  
            resizeMode="contain"
            style={styles.icon} 
            source={require('../assets/crownicon.png')} 
        /> 
        <Text style={styles.appName} >
            Royal Notes
        </Text>
        <Image  
            resizeMode="contain"
            style={styles.icon} 
            source={require('../assets/crownicon.png')} 
        /> 
        <Image  
            resizeMode="contain"
            style={styles.icon} 
            source={require('../assets/crownicon.png')} 
        /> 
    </View>
    );
}

export default IconView;

const styles = StyleSheet.create({
    appName: {
        position: "relative",
        fontSize: 17,
        top: 16,
        marginleft: 5,
        marginRight: 5,
        fontFamily: "Georgia",
    },
    icons: {
        flexDirection: "row",
        position: "relative",
        justifyContent: "space-between"
    },
    icon: {
        height: 30,
        width: 30,
        marginleft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    }
})