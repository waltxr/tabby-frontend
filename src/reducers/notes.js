const initialState = {
  list: undefined,
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
    console.log(action.note);
      return {
        list: [
          ...state.list,
          action.note
        ]
      }
    default:
      return state
  }
}

export default notes
