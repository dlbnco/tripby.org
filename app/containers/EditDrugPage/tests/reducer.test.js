
import { fromJS } from 'immutable'
import editDrugPageReducer from '../reducer'

describe('editDrugPageReducer', () => {
  it('returns the initial state', () => {
    expect(editDrugPageReducer(undefined, {})).toEqual(fromJS({}))
  })
})
