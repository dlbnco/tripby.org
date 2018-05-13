import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import FeatherIcon from '../FeatherIcon'

const Badge = ({
  children, bg, icon, close, color,
}) => {
  const badgeClass = classnames({
    badge: true,
    'badge-pill': true,
    [`bg-${bg}`]: bg,
    [`text-${color}`]: color,
    'text-white': true,
  })
  return (
    <div className={badgeClass}>
      <div className="d-flex align-items-center">
        <div className="mr-2">{icon}</div>
        {children}
        {close && <button type="button" className="ml-2" style={{ opacity: 0.5, cursor: 'pointer' }} onClick={() => close()}><FeatherIcon icon="x" size={12} /></button>}
      </div>
    </div>
  )
}

Badge.propTypes = {
  children: PropTypes.node,
  bg: PropTypes.string,
  icon: PropTypes.node,
  close: PropTypes.func,
  color: PropTypes.string,

}

export default Badge
