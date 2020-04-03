
// authentication

const API_URL = process.env.REACT_APP_API_URL
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'
const SIGNUP = 'SIGNUP'
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_FAIL = 'SIGNUP_FAIL'

const authRequest = () => ({
    type: LOGIN
})

const authSuccess = (user, token, tokenExpiresAt) => ({
  type: LOGIN_SUCCESS,
  user,
  token,
  tokenExpiresAt
})

const authFail = error => ({
  type: LOGIN_FAIL,
  error
})

const authLogout = () => ({
  type: LOGOUT
})

const signupRequest = () => ({
  type: SIGNUP
})

const signupSuccess = (user, token) => ({
  type: SIGNUP_SUCCESS,
  user,
  token
})

const signupFail = error => ({
  type: SIGNUP_FAIL,
  error
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
            dispatch(authSuccess(jsonRes.user, jsonRes.token, jsonRes.exp))
          })
        } else if (!response.ok) {
          response.json()
          .then(jsonRes => {
            dispatch(authFail(jsonRes))
          })
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

export const signup = user => {
  return dispatch => {
    dispatch(signupRequest())
    setTimeout(() => {
      return fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(response => {
        if (response.ok) {
          response.json()
          .then(jsonRes => {
            dispatch(signupSuccess(jsonRes.user, jsonRes.token))
          })
        } else if (!response.ok) {
          response.json()
          .then(jsonRes => {
            dispatch(signupFail(jsonRes.errors))
          })
        }
      })
    }, 1000)
  }
}

// notes

const GET_NOTES = 'GET_NOTES'
const GOT_NOTES = 'GOT_NOTES'
const NOTE_ERRORS = 'NOTE_ERRORS'
const ADD_NOTE = 'ADD_NOTE'
const UPDATE_NOTES = 'UPDATE_NOTES'
const ADD_TO_UPDATED_NOTES = 'ADD_TO_UPDATED_NOTES'
const CLEAR_UPDATED_NOTES = 'CLEAR_UPDATED_NOTES'
const DELETE_NOTE = 'DELETE_NOTE'

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
  type: UPDATE_NOTES,
  note: note
})

const addToUpdatedNotes = noteId => ({
  type: ADD_TO_UPDATED_NOTES,
  noteId: noteId
})

const clearUdpatedNotes = () => ({
  type: CLEAR_UPDATED_NOTES
})

const deleteNote = note => ({
  type: DELETE_NOTE,
  note
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
        dispatch(authLogout())
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
      if (response.ok) {
        response.json()
        .then(json => {
          dispatch(postNote(json))
        })
      } else if (!response.ok) {
        dispatch(authLogout())
      }
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

export const batchUpdateNotes = (notes, token, tokenExpiresAt) => {
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

export const destroyNote = (note, token) => {
  return dispatch => {
    return fetch(`${API_URL}/notes/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (response.ok) {
        dispatch(deleteNote(note))
      } else if (!response.ok) {
        dispatch(authLogout())
      }
    })
  }
}

export const toggleActiveNote = (note, token) => {
  note.active = !note.active
  return dispatch => {
    return fetch(`${API_URL}/notes/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (response.ok) {
        dispatch(fetchNotes(token))
      } else if (!response.ok) {
        dispatch(authLogout())
      }
    })
  }
}

export const updateSingleNote = (note, token) => {
  return dispatch => {
    return fetch(`${API_URL}/notes/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      if (response.ok) {
        dispatch(fetchNotes(token))
      } else if (!response.ok) {
        dispatch(authLogout())
      }
    })
  }
}
