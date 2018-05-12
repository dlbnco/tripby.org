const initialState = {
  id: null,
}

function auth0Reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { id: action.id }
    default:
      return state
  }
}

export default auth0Reducer
