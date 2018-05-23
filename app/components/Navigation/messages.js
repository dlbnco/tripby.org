/*
 * Navigation Messages
 *
 * This contains all the text for the Navigation component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  navigation: {
    id: 'app.component.Navigation.navigation',
    items: [
      {
        label: 'All drugs',
        link: '/drugs',
        icon: 'loader',
      },
      {
        label: 'Search',
        link: '/search',
        icon: 'search',
      },
    ],
  },
})
