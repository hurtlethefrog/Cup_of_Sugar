// Initial state
const initialState = {
  user: null
}

// Actions (this modifies)
const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER, user
})

// Reducers
export default (state = initialState, {type, user}) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: {...state.user, user} }
    default:
      return state
  }
}