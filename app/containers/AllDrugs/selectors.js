import { createSelector } from 'reselect'

/**
 * Direct selector to the allDrugs state domain
 */
const selectAllDrugsDomain = () => (state) => state.get('allDrugs')

/**
 * Other specific selectors
 */


/**
 * Default selector used by AllDrugs
 */

const makeSelectAllDrugs = () => createSelector(
  selectAllDrugsDomain(),
  (substate) => substate.toJS()
)

export default makeSelectAllDrugs
export {
  selectAllDrugsDomain,
}
