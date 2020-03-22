const API_URL = process.env.REACT_APP_API_URL
const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGOUT = 'LOGOUT'

const authRequest = () => (
  {
    type: LOGIN
  }
)

const authSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

const authFail = error => (
  {
    type: LOGIN_FAIL,
    error
  }
)

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
            dispatch(authSuccess(jsonRes.user))
            localStorage.setItem('token', jsonRes.token)
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
