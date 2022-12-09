import React from 'react';
import { useState, useReducer, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
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
    Dimensions,
  } from 'react-native';

import colors from '../config/colors'
import IconView from '../components/IconView'
import { actionCreators, reducer, initialState } from '../components/todos'
import categoryColors from '../config/categoryColors';
import AlertList from '../components/AlertList';

// <PickerComponent />
// <PickerComponent active={colorButton} />

function CategoryScreen(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [newBackgroundColor, changeNewBackgroundColor] = useState(categoryColors.arrayOfColors[7])
    const [counter, updateCounter] = useState(0)
    // console.log(newBackgroundColor)
    // console.log(state);

    // const [colorButton, setColorButton] = useState(false);
    // console.log(colorButton);

    // const toggleColorButton = () => {
    //   // 👇️ passed function to setState
    //   setColorButton(current => !current);
    //   console.log(colorButton);
    // };

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
        }
    }, [props.navigation, props.route, isFocused]);

    return (
        <View style={styles.container}>
            <IconView />
            <TouchableOpacity 
                style={[styles.addCategoryButton, { backgroundColor: newBackgroundColor }]} 
                onPress={() => {
                    updateCounter((counter + 1) % 8)
                    changeNewBackgroundColor(categoryColors.arrayOfColors[counter]);}}
            >
                <Text style={styles.newCategoryButtonText}>New Category</Text>
                <Image  
                    resizeMode="contain"
                    style={styles.newCategoryColorIcon} 
                    source={require('../assets/coloricon.png')} 
                />
                <Input
                    backgroundColor={newBackgroundColor}
                    placeholder={'Type a Category name, then hit enter!'}
                    onSubmitEditing={(title, newBackgroundColor) => dispatch(actionCreators.addCategory(title, newBackgroundColor))}
                />
            </TouchableOpacity>
            <List
                items={state.items}
                onPressItem={(item) => props.navigation.navigate('Descriptions', { category: item })}
                onPressDelete={(id) => Alert.alert("Are you sure you want to delete this category?", "All Notes in this category will also be deleted.", [
                    {text: "Yes", onPress: () => dispatch(actionCreators.remove(id))},
                    {text: "No", onPress: () => console.log("No") },
            ])}/>
        </View>
    );
}

//            <AlertList />


function List({ items, onPressItem, onPressDelete }) {
    // const renderItem = ({ item }) => {
    //     // when no input, show all
    //     if (searchPhrase === "") {
    //         //return <Item categoryName={item.name} details={item.details} />;
    //         return (
    //             <TouchableOpacity
    //             style={[styles.item, { backgroundColor:  item.categoryColor }]}
    //             onPress={() => onPressItem(item)}
    //             >
    //                 <Text style={styles.title}>{item.categoryName}</Text>
    //                 <TouchableOpacity 
    //                     style={styles.removeCategoryButton} 
    //                     onPress={() => onPressDelete(item.id)} 
    //                     >
    //                         <Text style={{ fontWeight: 'bold', color: colors.black }} >
    //                             <Image  
    //                                 resizeMode="contain"
    //                                 style={styles.icon} 
    //                                 source={require('../assets/deleteicon.png')} 
    //                             /> 
    //                         </Text>
    //                 </TouchableOpacity>
    //             </TouchableOpacity>
    //         );
    //     }
    //     // filter of the name
    //     if (item.categoryName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    //         //return <Item name={item.name} details={item.details} />;
    //         return (
    //             <TouchableOpacity
    //             style={[styles.item, { backgroundColor:  item.categoryColor }]}
    //             onPress={() => onPressItem(item)}
    //             >
    //                 <Text style={styles.title}>{item.categoryName}</Text>
    //                 <TouchableOpacity 
    //                     style={styles.removeCategoryButton} 
    //                     onPress={() => onPressDelete(item.id)} 
    //                     >
    //                         <Text style={{ fontWeight: 'bold', color: colors.black }} >
    //                             <Image  
    //                                 resizeMode="contain"
    //                                 style={styles.icon} 
    //                                 source={require('../assets/deleteicon.png')} 
    //                             /> 
    //                         </Text>
    //                 </TouchableOpacity>
    //             </TouchableOpacity>
    //         );
    //     }
    //     // filter of the description
    //     if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
    //         //return <Item name={item.name} details={item.details} />;
    //         return (
    //             <TouchableOpacity
    //             style={[styles.item, { backgroundColor:  item.categoryColor }]}
    //             onPress={() => onPressItem(item)}
    //             >
    //                 <Text style={styles.title}>{item.categoryName}</Text>
    //                 <TouchableOpacity 
    //                     style={styles.removeCategoryButton} 
    //                     onPress={() => onPressDelete(item.id)} 
    //                     >
    //                         <Text style={{ fontWeight: 'bold', color: colors.black }} >
    //                             <Image  
    //                                 resizeMode="contain"
    //                                 style={styles.icon} 
    //                                 source={require('../assets/deleteicon.png')} 
    //                             /> 
    //                         </Text>
    //                 </TouchableOpacity>
    //             </TouchableOpacity>
    //         );
    //     }
    // };


    return (
        <FlatList
        data={items}
        style={styles.categoriesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
            <TouchableOpacity
            style={[styles.item, { backgroundColor:  item.categoryColor }]}
            onPress={() => onPressItem(item)}
            >
                <Text style={styles.title}>{item.categoryName}</Text>
                <TouchableOpacity 
                    style={styles.removeCategoryButton} 
                    onPress={() => onPressDelete(item.id)} 
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
        )}
        />
    )
}
//categoryColors.arrayOfColors[index%8]

// dispatch(actionCreators.remove(item.id))

function itemColor(index) {
    return `rgba(59, 108, 212, ${Math.max(1 - index / 10, 0.4)})`
}

// put some way to get a color.
function Input({ placeholder, onSubmitEditing, backgroundColor }) {
    const [text, setText] = useState('')
  
    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        onChangeText={(value) => setText(value)}
        onSubmitEditing={() => {
          if (!text) return // Don't submit if empty
  
          onSubmitEditing(text, backgroundColor)
          setText('')
        }}
      />
    )
  }

function Title({ children }) {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{children}</Text>
      </View>
    )
  }

  const generateColor = () => {
    // return categoryColors[Math.floor(Math.random()*7)];
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

    // <Button
    // title="Go to a Category"
    // onPress={() => props.navigation.navigate('Descriptions')}
    // />



export default CategoryScreen;

const styles = StyleSheet.create({
    addCategoryButton: {
        backgroundColor: colors.primary,
        position: 'relative',
        height: '10%',
        width: '90%',
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    categoriesList: {
        backgroundColor: colors.primary,
        width: '90%',
        borderRadius: 10,
    },
    chooseColorButton: {
        position: 'relative',
        height: '100%',
        width: 20,
        backgroundcolor: 'grey',
        alignSelf: 'flex-end',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    header: {
        backgroundColor: 'rgb(59, 108, 212)',
        padding: 15,
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
    newCategoryButtonText: {
        marginTop: 2,
        fontWeight: 'bold',
        fontFamily: "Georgia",
    },
    newCategoryColorIcon: {
        marginTop: 2,
        position: 'absolute',
        top: 8,
        left: 8,
        height: 20,
        width: 20,
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
    title: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
})


// Add category button above the list of categories.
// List of categories. 3 loaded up right now.
// alertlist of items to see warnings for.


// navigation.setOptions({ title: 'Updated!' }) // to change the navigation options.