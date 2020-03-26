
// authentication

const API_URL = process.env.REACT_APP_API_URL
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'

const authRequest = () => ({
    type: LOGIN
})

const authSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  user,
  token
})


const authFail = error => ({
  type: LOGIN_FAIL,
  error
})

const authLogout = () => ({
  type: LOGOUT
})

export const authenticate = credentials => {
  return dispatch => {
    dispatch(authRequest())
    setTimeout(() => {
      return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      })
      .then(response => {
        if (response.ok) {
          response.json()
          .then(jsonRes => {
            dispatch(authSuccess(jsonRes.user, jsonRes.token))
          })
        } else if (!response.ok) {
          dispatch(authFail(response.statusText))
        }
      })
    }, 1500)
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch(authRequest())
    setTimeout(() => {
      dispatch(authLogout())
      localStorage.clear()
    }, 1000)
  }
}

// notes

const GET_NOTES = 'GET_NOTES'
const GOT_NOTES = 'GOT_NOTES'
const NOTE_ERRORS = 'NOTE_ERRORS'
const ADD_NOTE = 'ADD_NOTE'
const UPDATE_NOTE = 'UPDATE_NOTE'
const ADD_TO_UPDATED_NOTES = 'ADD_TO_UPDATED_NOTES'
const CLEAR_UPDATED_NOTES = 'CLEAR_UPDATED_NOTES'

const getNotes = () => ({
  type: GET_NOTES
})

const gotNotes = notes => ({
  type: GOT_NOTES,
  notes
})

const noteErrors = error => ({
  type: NOTE_ERRORS,
  error
})

const postNote = note => ({
  type: ADD_NOTE,
  note
})

const updateNotes = note => ({
  type: UPDATE_NOTE,
  note: note
})

const addToUpdatedNotes = noteId => ({
  type: ADD_TO_UPDATED_NOTES,
  noteId: noteId
})

const clearUdpatedNotes = () => ({
  type: CLEAR_UPDATED_NOTES
})

export const fetchNotes = token => {
  return dispatch => {
    dispatch(getNotes())
    return fetch(`${API_URL}/notes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        response.json()
        .then(jsonRes => {
          if (jsonRes.error) {
            dispatch(noteErrors(jsonRes.error))
          } else {
            dispatch(gotNotes(jsonRes))
          }
        })
      } else if (!response.ok) {
        dispatch(noteErrors(response.statusText))
      }
    })
  }
}

export const addNote = (note, token) => {
  return dispatch => {
    return fetch(`${API_URL}/notes/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      return response.json()
    })
    .then(json => {
      dispatch(postNote(json))
    })
  }
}

export const updateNote = note => {
  return dispatch => {
    dispatch(updateNotes(note))
  }
}

export const updateUpdatedNotes = noteId => {
  return dispatch => {
    dispatch(addToUpdatedNotes(noteId))
  }
}

export const batchUpdateNotes = (notes, token) => {
  return dispatch => {
    notes.forEach( note => {
      fetch(`${API_URL}/notes/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
      })
    })
    dispatch(clearUdpatedNotes())
  }
}
