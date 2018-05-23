/*
 * ConnectionError Messages
 *
 * This contains all the text for the ConnectionError component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.components.ConnectionError.header',
    defaultMessage: 'Connection error',
  },
  body: {
    id: 'app.components.ConnectionError.body',
    defaultMessage: 'It was not possible to fetch the info',
    action: 'Try again',
  },
})
