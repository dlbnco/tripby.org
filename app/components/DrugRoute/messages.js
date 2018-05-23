/*
 * DrugRoute Messages
 *
 * This contains all the text for the DrugRoute component.
 */
import { defineMessages } from 'react-intl'

export default defineMessages({
  dosage: {
    id: 'app.components.DrugRoute.dosage',
    defaultMessage: 'Dosage',
    dosageLevel: 'Level',
    dosageLevels: {
      treshold: 'Treshold',
      light: 'Light',
      common: 'Common',
      strong: 'Strong',
      heavy: 'Heavy',
    },
  },
  duration: {
    id: 'app.components.DrugRoute.duration',
    defaultMessage: 'Duration',
    timeframe: 'Period',
    timeframes: {
      Total: 'Total',
      Onset: 'Onset',
      ComeUp: 'Come up',
      ComeDown: 'Come down',
      Peak: 'Peak',
      Hangover: 'After effects',
    },
  },
})
