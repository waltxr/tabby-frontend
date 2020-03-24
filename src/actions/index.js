
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
        console.log(response);
        response.json()
        .then(jsonRes => {
          if (jsonRes.error) {
            console.log(jsonRes);
            dispatch(noteErrors(jsonRes.error))
          } else {
            console.log(jsonRes);
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
    return fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(note)
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(json => {
      console.log(json)
      dispatch(postNote(json))
    })
  }
}
