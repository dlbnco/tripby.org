/**
*
* Identicon
*
*/

import React from 'react'
import PropTypes from 'prop-types'

import IdentIcon from 'identicon.js'

function Identicon({ hash, size }) {
  const icon = new IdentIcon(hash, {
    format: 'svg',
    background: [238, 238, 238, 255],
    foreground: [240, 98, 146, 255],
    size,
    margin: 0.16,
  }).toString()
  return (

    <img alt="avatar" src={`data:image/svg+xml;base64,${icon}`} />
  )
}

Identicon.propTypes = {
  hash: PropTypes.string,
  size: PropTypes.number,
}

export default Identicon
