/*
 * ErrorAlert Messages
 *
 * This contains all the text for the ErrorAlert component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.components.ErrorAlert.header',
    defaultMessage: 'Unexpected error',
    emoji: '😕',
  },
  body: {
    id: 'app.components.ErrorAlert.body',
    defaultMessage: 'Something strange happened',
    action: 'Try again',
  },
  connection: {
    header: {
      id: 'app.components.ErrorAlert.connection.header',
      emoji: '😿',
      defaultMessage: 'Conection error',
    },
    body: {
      id: 'app.components.ErrorAlert.connection.body',
      defaultMessage: 'It was not possible to fetch the data',
      action: 'Try again',
    },
  },
  unauthorized: {
    header: {
      id: 'app.components.ErrorAlert.unauthorized.header',
      emoji: '🕵️',
      defaultMessage: 'Unauthorized',
    },
    body: {
      id: 'app.components.ErrorAlert.unauthorized.body',
      defaultMessage: 'You have insufficient permissions to see this page',
    },
  },
})
