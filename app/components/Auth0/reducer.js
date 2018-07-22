const initialState = {
  id: null,
  role: null,
}

function auth0Reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.payload }
    default:
      return state
  }
}

export default auth0Reducer
