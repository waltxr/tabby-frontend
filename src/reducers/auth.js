const auth = (state = false, action) => {
  debugger
  switch (action.type) {
    case 'LOGIN':
      return {authenticated: true}
    default:
      return state
  }
}

export default auth
