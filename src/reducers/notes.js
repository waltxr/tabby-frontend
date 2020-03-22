const initialState = {
  notes: undefined,
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
        notes: action.notes
      }
    case 'NOTE_ERRORS':
      return {
        ...state,
        gettingNotesError: action.error
      }
    default:
      return state
  }
}
