import React from 'react'
import PropTypes from 'prop-types'
import feather from 'feather-icons'

/* eslint-disable react/no-danger */

const FeatherIcon = (props) => (
  <div className="d-inline-flex" dangerouslySetInnerHTML={{ __html: feather.icons[props.icon].toSvg({ width: props.size, height: props.size }) }} />
)

FeatherIcon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
}

export default FeatherIcon
