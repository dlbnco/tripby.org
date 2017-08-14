
import { fromJS } from 'immutable'
import drugPageReducer from '../reducer'

describe('drugPageReducer', () => {
  it('returns the initial state', () => {
    expect(drugPageReducer(undefined, {})).toEqual(fromJS({}))
  })
})
