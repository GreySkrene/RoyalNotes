import React, { Children } from 'react';
import { useState, useReducer, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    Button,
    TextInput,
    FlatList,
    Alert,
    Platform,
    Dimensions,
  } from 'react-native';
import { actionCreators, reducer, initialState } from '../components/todos'
import IconView from '../components/IconView';
import colors from '../config/colors';
import AlertList from '../components/AlertList';
import SearchBar from '../components/SearchBar';
import categoryColors from '../config/categoryColors';

function DescriptionScreen(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    //console.log(props.route.params.category);
    let category = props.route.params.category;

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
        }
    }, [props.navigation, props.route, isFocused]);


    // console.log(category);

    // change the header.
    // props.navigation..setOptions({ title: props.title })

    // Get search bar after Title
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondary }}>
        <IconView />
        <Title 
            updateColor={(newCategory) => dispatch(actionCreators.updateCategory(newCategory))} 
            category={category}
        />
        <TouchableOpacity 
        style={styles.addNoteButton}
        onPress={() => props.navigation.navigate('Notes', { note: { id: Math.random().toString(), noteDescription: '' }, category: category, isNew: true })}
        >
            <Text style={{fontSize: 15}}>
                Create a new note
            </Text>
        </TouchableOpacity>
        <SearchBar 
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
        />
        <List
            searchPhrase={searchPhrase}
            category={category}
            items={category.categoryNotes}
            onPressItem={(item) => props.navigation.navigate('Notes', { note: item, category: category, isNew: false })}
            onPressDelete={(categoryid, noteid) => Alert.alert("Are you sure you want to delete this note?", "All information associated with this note will be deleted.", [
                {text: "Yes", onPress: () => dispatch(actionCreators.removeNote(categoryid, noteid))},
                {text: "No", onPress: () => console.log("No") },
            ])}
        />  
      </View>
    );
}

//        <AlertList />


    // <View style={styles.searchBar}>
    // <Text>
    //     Will be a search bar.
    // </Text>
    // </View>

//                 onPressItem={(id) => dispatch(actionCreators.remove(id))}


    // <Input
    // placeholder={'Type a todo, then hit enter!'}
    // onSubmitEditing={(title) => dispatch(actionCreators.add(title))}
    // />

function List({ category, items, onPressItem, onPressDelete, searchPhrase }) {
    const renderItem = ({ item, index }) => {
        //console.log(item)
        //console.log(item.id)
        // when no input, show all
        if (searchPhrase === "") {
            //return <Item name={item.name} details={item.details} />;
            return (
                <TouchableOpacity
                style={[styles.item, { backgroundColor: itemColor(category.categoryColor, index) }]}
                onPress={() => onPressItem(item)}
                >
                    <Text style={styles.title}>{item.noteDescription}</Text>
                    <TouchableOpacity 
                        style={styles.removeCategoryButton} 
                        onPress={() => onPressDelete(category.id, item.id)} 
                        >
                        <Text style={{ fontWeight: 'bold', color: colors.black }} >
                            <Image  
                                resizeMode="contain"
                                style={styles.icon} 
                                source={require('../assets/deleteicon.png')} 
                            />
                        </Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            );
        }
        if (item.noteDescription != undefined) {
            // filter of the name
            if (item.noteDescription.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                //return <Item name={item.name} details={item.details} />;
                return (
                    <TouchableOpacity
                    style={[styles.item, { backgroundColor: itemColor(category.categoryColor, index) }]}
                    onPress={() => onPressItem(item)}
                    >
                        <Text style={styles.title}>{item.noteDescription}</Text>
                        <TouchableOpacity 
                            style={styles.removeCategoryButton} 
                            onPress={() => onPressDelete(category.id, item.id)} 
                            >
                            <Text style={{ fontWeight: 'bold', color: colors.black }} >
                                <Image  
                                    resizeMode="contain"
                                    style={styles.icon} 
                                    source={require('../assets/deleteicon.png')} 
                                />
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                );
            }
        }
        if (item.noteDetails != undefined) {
            // filter of the description
            if (item.noteDetails.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
                //return <Item name={item.name} details={item.details} />;
                return (
                    <TouchableOpacity
                    style={[styles.item, { backgroundColor: itemColor(category.categoryColor, index) }]}
                    onPress={() => onPressItem(item)}
                    >
                        <Text style={styles.title}>{item.noteDescription}</Text>
                        <TouchableOpacity 
                            style={styles.removeCategoryButton} 
                            onPress={() => onPressDelete(category.id, item.id)} 
                            >
                            <Text style={{ fontWeight: 'bold', color: colors.black }} >
                                <Image  
                                    resizeMode="contain"
                                    style={styles.icon} 
                                    source={require('../assets/deleteicon.png')} 
                                />
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                );
            }
        }
      };

    return (
        <FlatList
        data={items}
        style={styles.notesList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        />
    )
}

// renderItem={({ item, index }) => (
//     <TouchableOpacity
//     style={[styles.item, { backgroundColor: itemColor(category.categoryColor, index) }]}
//     onPress={() => onPressItem(item)}
//     >
//         <Text style={styles.title}>{item.noteDescription}</Text>
//         <TouchableOpacity 
//             style={styles.removeCategoryButton} 
//             onPress={() => onPressDelete(item.id)} 
//             >
//             <Text style={{ fontWeight: 'bold', color: colors.black }} >
//                 <Image  
//                     resizeMode="contain"
//                     style={styles.icon} 
//                     source={require('../assets/deleteicon.png')} 
//                 />
//             </Text>
//         </TouchableOpacity>
//     </TouchableOpacity>
// )}

function itemColor(color, index) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${Math.max(1 - index / 15, 0.4)})`
}

//59, 108, 212
//${r}, ${g}, ${b}

function Input({ placeholder, onSubmitEditing }) {
    const [text, setText] = useState('')
  
    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={(value) => setText(value)}
        onSubmitEditing={() => {
          if (!text) return // Don't submit if empty
  
          onSubmitEditing(text)
          setText('')
        }}
      />
    )
  }

function Title({ updateColor, category }) {
    const [counter, updateCounter] = useState(categoryColors.arrayOfColors.indexOf(category.categoryColor) + 1)
    return (
      <TouchableOpacity 
        onPress={() => {
            let newCategory = category
            updateCounter( (counter + 1) % 8 )
            newCategory.categoryColor = categoryColors.arrayOfColors[counter]
            updateColor(newCategory) 
        }}
        style={[styles.header, {backgroundColor: category.categoryColor}]}>
        <Text style={styles.categoryTitle}>{category.categoryName}</Text>
        <Image  
            resizeMode="contain"
            style={styles.newCategoryColorIcon} 
            source={require('../assets/coloricon.png')} 
        />
      </TouchableOpacity>
    )
  }

export default DescriptionScreen;

const styles = StyleSheet.create({
    addNoteButton: {
        height: '8%',
        width: '90%',
        backgroundColor: colors.lightyellow,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: colors.darkyellow,
        marginBottom: 5,
    },
    newCategoryColorIcon: {
        marginTop: 2,
        position: 'absolute',
        top: 8,
        left: 8,
        height: 20,
        width: 20,
    },
    categoryTitle: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    notesList: {
        backgroundColor: colors.lightyellow,
        width: '90%',
        height: '60%',
        borderRadius: 10,
    },
    header: {
        // have the background color be the color of the category.
        padding: 15,
        width: '90%',
        height: '10%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 5,
    },
    icon: {
        height: 25,
        width: 25,
        marginleft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        padding: 15,
        height: 50,
    },
    item: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        height: 75,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
    },
    removeCategoryButton: {
        position: 'absolute',
        marginTop: 3,
        height: '55%',
        width: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        left: 15,
    },
    searchBar: {
        backgroundColor: colors.white,
        padding: 15,
        width: '90%',
        height: '6%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 45,
        marginBottom: 5,
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
})


// five crown icons below the header
// category header in specified color.
// search input view below the header
// list of all the notes you made (2 per category)
// alertlist.