const initialState = {
  authenticating: false,
  authenticated: false,
  authenticationError: undefined,
  currentUser: undefined,
  token: undefined
}

// for development
// const initialState = {
//   authenticating: false,
//   authenticated: true,
//   authenticationError: undefined,
//   currentUser: {
//     id: 1,
//     name: "Adam",
//     username: "waltxr",
//     email: "adam@adam.com",
//     password_digest: "$2a$12$p46gZtSeDTC4Mf9Bcz3eguHyLk/HD6w5.VXp0WC0Nppa/BG6P6dRq",
//     created_at: "2020-03-17T19:00:02.156Z",
//     updated_at: "2020-03-17T19:00:02.156Z",
//     avatar: {url: null}
//   }
// }

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticating: true
      }
    case 'LOGIN_SUCCESS':
    console.log(action);
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
