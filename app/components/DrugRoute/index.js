/**
*
* DrugRoute
*
*/

import React from 'react'
import PropTypes from 'prop-types'

class DrugRoute extends React.Component {
  constructor() {
    super()
    this.mapDurations = this.mapDurations.bind(this)
    this.parseTimeframes = this.parseTimeframes.bind(this)
  }
  mapDurations() {
    const durations = this.props.route.durations
    const rows = durations.map((duration) => (
      <tr>
        <td>{this.parseTimeframes(duration.timeframe)}</td>
        <td>{duration.min >= 60 && duration.min % 60 === 0 ? `${(duration.min / 60)}h` : `${duration.min}min`}–{duration.min > 60 && duration.min % 60 === 0 ? `${(duration.max / 60)}h` : `${duration.max}min`}</td>
      </tr>
    ))
    return rows
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
        <table className="table">
          <thead>
            <tr>
              <td><strong>Duração</strong></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {this.mapDurations()}
          </tbody>
        </table>
      </div>
    )
  }
}

DrugRoute.propTypes = {
  route: PropTypes.object,
}

export default DrugRoute
