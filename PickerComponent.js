import { StyleSheet } from 'react-native'
import { ColorPicker } from 'react-native-color-picker'
import React from 'react'
const PickerComponent = (active) => {
    console.log(active);
    if (active) {
        return (
            <ColorPicker
            onColorSelected={color => alert(`Selected: ${color}`)}
            style={styles.colorContainer}
            />
        );
    }
    else {
        return (
            <View />
        );
    }

//    return (
//      <ColorPicker
//        onColorSelected={color => alert(`Selected: ${color}`)}
//        style={styles.colorContainer}
//     />
//   )
}
const styles = StyleSheet.create({
    colorContainer:{
      width:250,
      height: 400,
   }
})
export default PickerComponent