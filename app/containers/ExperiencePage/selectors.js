import { createSelector } from 'reselect'

/**
 * Direct selector to the experiencePage state domain
 */
const selectExperiencePageDomain = () => (state) => state.get('experiencePage')

/**
 * Other specific selectors
 */


/**
 * Default selector used by ExperiencePage
 */

const makeSelectExperiencePage = () => createSelector(
  selectExperiencePageDomain(),
  (substate) => substate.toJS()
)

export default makeSelectExperiencePage
export {
  selectExperiencePageDomain,
}
