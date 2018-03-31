/*
 *
 * AllDrugs actions
 *
 */

import {
  SET_NAVIGATION,
} from './constants'

export function setNavigation(navigation) {
  return {
    type: SET_NAVIGATION,
    navigation,
  }
}
