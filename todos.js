import categoryColors from "../config/categoryColors"

const randomId = () => Math.random().toString()

const createCategory = (categoryName, categoryColor, categoryNotes = []) => ({ id: randomId(), categoryName, categoryColor, categoryNotes })
const createNote = (noteDescription = '', noteDetails = '', category) => {
  let note = { id: randomId(), noteDescription, noteDetails }
  addNoteToCategory(note, category)
  return category}

const addNoteToCategory = (note, category) => {
  // console.log('adding note')
  // console.log(note)
  // console.log(category)
  category.categoryNotes.push(note);
}

const types = {
  ADDCATEGORY: 'ADDCATEGORY',
  ADDNOTE: 'ADDNOTE',
  UPDATECATEGORY: 'UPDATECATEGORY',
  REMOVE: 'REMOVE',
  REMOVENOTE: 'REMOVENOTE',
}

export const actionCreators = {
  addCategory: (categoryName, categoryColor) => ({ type: types.ADDCATEGORY, payload: createCategory(categoryName, categoryColor) }),
  addNote: (note, category) => ({ type: types.ADDNOTE, payload: addNoteToCategory(note, category) }),
  remove: (id) => ({ type: types.REMOVE, payload: id }),
  removeNote: (categoryID, noteID) => ({type: types.REMOVENOTE, payload: {categoryID, noteID}}),
  updateCategory: (category) => ({type: types.UPDATECATEGORY, payload: category}),
}

export const initialState = {
  items: [
    createCategory('Goals', categoryColors.testblue, [{id: randomId(), noteDescription: 'Get Fit', noteDetails: 'Do 20 push-ups and 40 sit ups daily.'}, {id: randomId(), noteDescription: 'Get Smart', noteDetails: 'Read 1 book each week and play the piano 30 minutes each day.'}]),
    createCategory('Todo', categoryColors.testgreen, [{id: randomId(), noteDescription: 'Go Shopping', noteDetails: '2 galons of milk\n2 cartons of eggs\n1 loaf of bread\n6 bottles of gatorade'}, {id: randomId(), noteDescription: 'Do Chores', noteDetails: 'Clear off the kitchen table and vacuum the kids room.'}]),
    createCategory('Ideas', categoryColors.testorange, [{id: randomId(), noteDescription: 'Flying Donkey', noteDetails: 'There was a flying donkey that tried to escape the leaping aligator as it sped accross the prairy. His mane was purple and wings were orange. The aligator could breathe fire.'}, {id: randomId(), noteDescription: 'Middle-Easter Mayhem', noteDetails: 'There were earth, fire, water, and air elemental powers. A group of 4 traveled around with a flying bison to master those 4 elements.'}]),
  ],
}

export function reducer(state, action) {
  switch (action.type) {
    case types.ADDCATEGORY:
      return { ...state, items: [...state.items, action.payload] }
    case types.ADDNOTE:
      return { ...state, items: [...state.items, action.payload] }
    case types.REMOVE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case types.REMOVENOTE:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.categoryID) {
            return item;
          }
          else {
            let newNotes = item.categoryNotes.filter((note) => note.id !== action.payload.noteID)
            item.categoryNotes =  newNotes
            return item;
          }
        })
      }
    case types.UPDATECATEGORY:
      console.log(action.payload)
      console.log(state.items)
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.categoryID) {
            return item;
          }
          else {
            return action.payload
          }
        }),

      }
  }
}