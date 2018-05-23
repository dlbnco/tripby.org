/*
 * ListDrugs Messages
 *
 * This contains all the text for the ListDrugs component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.containers.ListDrugs.header',
    defaultMessage: 'This is ListDrugs container !',
  },
  countInfo: {
    id: 'app.container.ListDrugs.countInfo',
    defaultMessage: 'Showing {limit} drugs of {count}',
  },
  navigation: {
    id: 'app.containers.ListDrugs.navigation',
    previous: 'Previous',
    next: 'Next',
  },
})
