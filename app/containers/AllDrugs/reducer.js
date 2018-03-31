/*
 *
 * AllDrugs reducer
 *
 */

import { fromJS } from 'immutable'
import {
  SET_NAVIGATION,
} from './constants'

const initialState = fromJS({
  navigation: {
    orderBy: 'name_ASC',
    limit: 20,
    page: 0,
    filter: {},
  },
})

function allDrugsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAVIGATION:
      return state.mergeDeep(state.navigation, action.navigation)
    default:
      return state
  }
}

export default allDrugsReducer
