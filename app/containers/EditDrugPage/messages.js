/*
 * EditDrugPage Messages
 *
 * This contains all the text for the EditDrugPage component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  meta: {
    id: 'app.containers.EditDrugPage.meta',
    title: 'Suggest drug edit',
  },
  header: {
    id: 'app.containers.EditDrugPage.header',
    defaultMessage: 'Suggesting edit for {drug}',
  },
  sections: {
    id: 'app.containers.EditDrugPage.sections',
    basics: {
      title: 'Basics',
      form: {
        name: {
          label: 'Name',
        },
        aliases: {
          label: 'Aliases',
          placeholder: 'Write and press ↵ to add',
        },
        classes: {
          label: 'Classes',
        },
        overview: {
          label: 'Overview',
        },
      },
    },
  },
})
