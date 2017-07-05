import { createSelector } from 'reselect';

/**
 * Direct selector to the drugPage state domain
 */
const selectDrugPageDomain = () => (state) => state.get('drugPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by DrugPage
 */

const makeSelectDrugPage = () => createSelector(
  selectDrugPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectDrugPage;
export {
  selectDrugPageDomain,
};
