import React from 'react';
import { useState, useReducer } from 'react';

import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    TextInput,
    View, 
    KeyboardAvoidingView,
    SafeAreaView, 
    ScrollView,
    Image, 
    Button,
    Alert,
    Platform,
    Dimensions,
    Keyboard,
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { actionCreators, reducer, initialState } from '../components/todos'
import IconView from '../components/IconView';
import colors from '../config/colors';
import AlertList from '../components/AlertList';
import categoryColors from '../config/categoryColors';

function NotesScreen(props) {
    const [state, dispatch] = useReducer(reducer, initialState)


    let note = props.route.params.note;
    let category = props.route.params.category;
    let isNew = props.route.params.isNew;
    //console.log(note)
    //console.log(props)
    //console.log(isNew)

    if (isNew) {
        category.categoryNotes.push(note);
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary}}>
        <IconView />
        <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.noteView}
        >
            <ScrollView
            style={{height: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}
            >
                <CategorySection category={category} />
                <DescriptionSection note={note} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <DetailsSection note={note} />
                </KeyboardAvoidingView>
            </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
}
//                <TimeSection note={note} />
//        <AlertList />


// keyboardavoiding view, scrollview

    // import {Keyboard} from 'react-native'

    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    //     <View style={{flex: 1}}>
    //         <TextInput keyboardType='numeric'/>
    //     </View>
    // </TouchableWithoutFeedback>

   // <Text>{note.noteDescription}</Text>

    // <Button
    // title="Go back to the chosen category"
    // onPress={() => props.navigation.goBack()}
    // />




function CategorySection(props) {
    //console.log(props)
    //console.log(props.category.categoryName)

    return (
        <View style={[styles.categorySection, {backgroundColor: props.category.categoryColor}]}>
            <Text style={{fontSize: 20, fontStyle: 'bold', color: 'white'}}>{props.category.categoryName}</Text>
        </View>
    );
}

function DescriptionSection(props) {
    //console.log(props)
    //console.log(props.note.noteDescription)

    return (
        <View style={styles.descriptionSection}>
            <Text style={{fontSize: 16, fontStyle: 'bold', color: colors.darkgrey, margin: 5, top: -3 }}>Description: </Text>
            <Input
                placeholder={'Type your note description here.'}
                note={props.note}
                updateDescription={(text) => {props.note.Description = text}}
            />
        </View>
    );
}

// onSubmitEditing={(title, color) => dispatch(actionCreators.addCategory(title, color))}

// Fixme - find some way to update the text based on what they type in.
function Input({ placeholder, note, updateDescription }) {
    //console.log(note)
    const [text, onChangeText] = useState(note.noteDescription);

    const updateNoteDescription=(text) => {note.noteDescription = text}

    return (
      <TextInput
        multiline={true}
        maxHeight={40}
        numberOfLines={2}
        maxLength={120}
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={(text) => {onChangeText(text); updateNoteDescription(text)}}
      />
    )
  }

function TimeSection(props) {
    return (
        <View style={styles.timeSection}>
            <Text style={{fontSize: 20, fontStyle: 'bold', color: colors.darkgrey}}>Time Section</Text>
        </View>
    );
}

function DetailsSection(props) {
    let note = props.note;
    // console.log(note)
    const [text, onChangeText] = React.useState(note.noteDetails);

    const updateNoteDetails=(text) => {note.noteDetails = text}

    return (
        <TextInput
        style={styles.detailsSection} 
        value={text}
        placeholder={'Type details for your note.'}
        editable
        multiline={true}
        onChangeText={(text) => {onChangeText(text); updateNoteDetails(text)}}
      />
    );
}

    // <UselessTextInput
    // multiline
    // numberOfLines={4}
    // onChangeText={text => onChangeText(text)}
    // value={value}
    // style={{padding: 10}}
//     // />
//     // maxLength={400}


export default NotesScreen;

const styles = StyleSheet.create({
    noteView: {
        backgroundColor: colors.primary,
        width: '95%',
        height: '93%',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    categorySection: {
        height: 75,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionSection: {
        width: '100%',
        height: 95,
        backgroundColor: colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkgrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsSection: {
        width: '99.8%',
        height: 590,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 5,
    },
    input: {
        padding: 15,
        height: 50,
    },
    timeSection: {
        width: '100%',
        height: 100,
        backgroundColor: colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkgrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

// 5 crown icons bellow the header
// notesView:
//   category area: color of the category
//     - says the category name
// DescriptionView:
//    description, followed by an inputview
// time setting area.
// type your details.
// 
// alarmslist


    // borderBottomLeftRadius: number
    // - borderBottomRightRadius: number
    // - borderTopLeftRadius: number
    // - borderTopRightRadius: number