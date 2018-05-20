
import { fromJS } from 'immutable'
import experiencePageReducer from '../reducer'

describe('experiencePageReducer', () => {
  it('returns the initial state', () => {
    expect(experiencePageReducer(undefined, {})).toEqual(fromJS({}))
  })
})
