const initialState = {
  list: [],
  gettingNotes: false,
  gettingNotesError: undefined,
  updatedNotes: []
}

const notes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return {
        ...state,
        gettingNotes: true
      }
    case 'GOT_NOTES':
      return {
        ...state,
        gettingNotes: false,
        list: action.notes
      }
    case 'NOTE_ERRORS':
      return {
        ...state,
        gettingNotes: false,
        gettingNotesError: action.error
      }
    case 'ADD_NOTE':
      return {
        ...state,
        list: [
          ...state.list,
          action.note
        ]
      }
    case 'UPDATE_NOTES':
      return {
        ...state,
        list: state.list.map( note => {
          if (note.id === action.note.id) {
            return {
              ...note,
              body: action.note.body
            }
          }
          return note
        })
      }
    case 'ADD_TO_UPDATED_NOTES':
      return {
        ...state,
        updatedNotes: [
          ...state.updatedNotes,
          action.noteId
        ]
      }
    case 'CLEAR_UPDATED_NOTES':
      return {
        ...state,
        updatedNotes: []
      }
    case 'DELETE_NOTE':
      return {
        ...state,
        list: state.list.filter(note => note.id !== action.note.id)
      }
    default:
      return state
  }
}

export default notes
