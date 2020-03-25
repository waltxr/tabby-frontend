const initialState = {
  list: [],
  gettingNotes: false,
  gettingNotesError: undefined
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
    case 'UPDATE_NOTE':
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
    default:
      return state
  }
}

export default notes
