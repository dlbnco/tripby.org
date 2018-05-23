/*
 * DrugBody Messages
 *
 * This contains all the text for the DrugBody component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  header: {
    id: 'app.components.DrugBody.header',
    defaultMessage: 'This is the DrugBody component !',
  },
  alert: {
    id: 'app.components.DrugBody.alert',
    defaultMessage: 'The effects listed below hardly (or never) occur all at once. But heavier doses will increase the chances and are more likely to induce a full range of effects.',
  },
  tabs: {
    id: 'app.components.DrugBody.tabs',
    defaultTabs: [
      { link: 'overview', label: 'Overview' },
      { link: 'effects', label: 'Effects' },
      { link: 'health', label: 'Health' },
      { link: 'law', label: 'Law' },
      { link: 'experiences', label: 'Experiences' },
    ],
  },
})
