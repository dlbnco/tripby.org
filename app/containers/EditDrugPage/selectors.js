import { createSelector } from 'reselect'

/**
 * Direct selector to the editDrugPage state domain
 */
const selectEditDrugPageDomain = () => (state) => state.get('editDrugPage')

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditDrugPage
 */

const makeSelectEditDrugPage = () => createSelector(
  selectEditDrugPageDomain(),
  (substate) => substate.toJS()
)

export default makeSelectEditDrugPage
export {
  selectEditDrugPageDomain,
}
