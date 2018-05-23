/*
 * CreateExperience Messages
 *
 * This contains all the text for the CreateExperience component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  meta: {
    id: 'app.containers.CreateExperience.meta',
    title: 'Submit an experience',
    description: ':p',
  },
  header: {
    id: 'app.containers.CreateExperience.header',
    defaultMessage: 'Submit an experience',
  },
  form: {
    id: 'app.containers.CreateExperience.form',
    title: 'Title',
    story: 'Story',
    drugSelection: 'Select one or more drugs you used in this experience:',
    filter: 'Filter',
    submit: 'Continue',
  },
})
