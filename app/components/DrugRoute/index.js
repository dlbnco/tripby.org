/**
*
* DrugRoute
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class DrugRoute extends React.Component {
  constructor() {
    super()
    this.mapDurations = this.mapDurations.bind(this)
    this.mapDosage = this.mapDosage.bind(this)
    this.parseTimeframes = this.parseTimeframes.bind(this)
    this.parseIntensity = this.parseIntensity.bind(this)
  }
  mapDurations() {
    const durations = this.props.route.durations
    const durationRows = durations.map((duration) => (
      <tr>
        <td>{this.parseTimeframes(duration.timeframe)}</td>
        <td>
          {(duration.min >= 60 && duration.min % 60 === 0) ? (`${(duration.min / 60)}h`) : (`${duration.min}min`)} – {duration.min > 60 && duration.min % 60 === 0 ? `${(duration.max / 60)}h` : `${duration.max}min`}
        </td>
      </tr>
    ))
    return durationRows
  }
  mapDosage() {
    const rowClass = (intensity) => classnames({
      'table-danger': intensity === 'heavy',
      'table-warning': intensity === 'strong',
    })
    const dosage = this.props.route.dosage
    const dosageKeys = Object.keys(dosage)
    const dosageRows = dosageKeys.map((intensity) => {
      if (intensity !== '__typename') {
        return (
          <tr className={rowClass(intensity)}>
            <td>{this.parseIntensity(intensity)}</td>
            <td>
              {typeof dosage[intensity] === 'object' ? ( //eslint-disable-line
                (!dosage[intensity].max ? (
                  `${dosage[intensity].min}mg+`
                ) : (`${dosage[intensity].min} – ${dosage[intensity].max}mg`))
              ) : (
                `${dosage[intensity]}mg`
              )}
            </td>
          </tr>
        )
      }
      return null
    }
  )
    return dosageRows
  }
  parseIntensity(intensity) {
    switch (intensity) {
      case 'treshold':
        return 'Mínimo'
      case 'light':
        return 'Leve'
      case 'common':
        return 'Comum'
      case 'strong':
        return 'Forte'
      case 'heavy':
        return 'Intenso'
      default:
        return ''
    }
  }
  parseTimeframes(timeframe) {
    switch (timeframe) {
      case 'Total':
        return 'Total'
      case 'ComeUp':
        return 'Ascensão'
      case 'Onset':
        return 'Primeiras sensações'
      case 'Peak':
        return 'Pico'
      case 'ComeDown':
        return 'Queda'
      case 'Hangover':
        return 'Efeitos posteriores'
      default:
        return ''
    }
  }
  render() {
    return (
      <div>
        {
          this.props.route.dosage ?
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td><strong>Dosagem</strong></td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="table-sm">
                {this.mapDosage()}
              </tbody>
            </table> : null}
        {
          this.props.route.durations ?
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td><strong>Duração</strong></td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="table-sm">
                {this.mapDurations()}
              </tbody>
            </table> : null}
      </div>
    )
  }
}

DrugRoute.propTypes = {
  route: PropTypes.object,
}

export default DrugRoute
