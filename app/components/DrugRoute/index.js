/**
*
* DrugRoute
*
*/

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import messages from './messages'
import { durationTimeframes } from '../../constants'

class DrugRoute extends React.Component {
  constructor() {
    super()
    this.mapDurations = this.mapDurations.bind(this)
    this.mapDosage = this.mapDosage.bind(this)
  }
  mapDurations() {
    const duration = this.props.route.duration
    const timeframeRows = durationTimeframes.map((timeframe) => {
      const value = duration[timeframe]
      return (
        <tr key={`${this.props.route.id}-duration-${timeframe}`}>
          <td>{messages.duration.timeframes[timeframe]}</td>
          <td>
            {(value.min >= 60 && value.min % 60 === 0) ? (`${(value.min / 60)}h`) : (`${value.min}min`)} – {value.min > 60 && value.min % 60 === 0 ? `${(value.max / 60)}h` : `${value.max}min`}
          </td>
        </tr>
      )
    })
    return timeframeRows
  }
  mapDosage() {
    const rowClass = (intensity) => classnames({
      'table-danger': intensity === 'heavy',
      'table-warning': intensity === 'strong',
    })
    const dosage = this.props.route.dosage
    const dosageKeys = Object.keys(dosage)
    const dosageRows = dosageKeys.map((intensity, index) => {
      if (intensity !== '__typename') {
        return (
          <tr className={rowClass(intensity)} key={`${this.props.route.id}-intensity-${dosageKeys[index]}`}>
            <td>{messages.dosage.dosageLevels[intensity]}</td>
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
  render() {
    return (
      <div>
        {
          this.props.route.dosage ?
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td><strong>{messages.dosage.dosageLevel}</strong></td>
                  <td><strong>{messages.dosage.defaultMessage}</strong></td>
                </tr>
              </thead>
              <tbody className="table-sm">
                {this.mapDosage()}
              </tbody>
            </table> : null}
        {
          this.props.route.duration ?
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td>
                    <strong>{messages.duration.timeframe}</strong>
                  </td>
                  <td>
                    <strong>{messages.duration.defaultMessage}</strong>
                  </td>
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
