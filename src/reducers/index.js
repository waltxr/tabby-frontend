import { combineReducers } from 'redux'
import auth from './auth'
import notes from './notes'

const appReducer = combineReducers({
  auth,
  notes
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
