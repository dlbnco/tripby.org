/**
*
* PageHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'


const PageHeader = (props) => (
  <div className="py-3 py-md-4 bg-blueLighter">
    <div className="container">
      <h1>{props.children}</h1>
    </div>
  </div>
  )

PageHeader.propTypes = {
  children: PropTypes.node,
}

export default PageHeader
