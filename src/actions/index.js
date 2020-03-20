export const API_URL = process.env.REACT_APP_API_URL
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'

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
          .then(res => {
            dispatch(authSuccess(res.user))
            localStorage.setItem('token', res.token)            
          })
        } else if (!response.ok) {
          dispatch(authFail(response.statusText))
        }
      })
    }, 2000);
  }
}
