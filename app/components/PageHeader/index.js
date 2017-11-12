/**
*
* PageHeader
*
*/

import React from 'react'
import PropTypes from 'prop-types'


const PageHeader = (props) => (
  <div className="bg-greyLight py-5">
    <div className="container">
      <h1>{props.children}</h1>
    </div>
  </div>
  )

PageHeader.propTypes = {
  children: PropTypes.node,
}

export default PageHeader
