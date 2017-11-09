
import { fromJS } from 'immutable'
import allDrugsReducer from '../reducer'

describe('allDrugsReducer', () => {
  it('returns the initial state', () => {
    expect(allDrugsReducer(undefined, {})).toEqual(fromJS({}))
  })
})
