const initialState = {
  authenticating: false,
  authenticated: false,
  authenticationError: undefined,
  currentUser: undefined,
  token: undefined
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticating: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        currentUser: action.user,
        token: action.token
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        authenticating: false,
        authenticationError: action.error
      }
    default:
      return state
  }
}

export default auth
