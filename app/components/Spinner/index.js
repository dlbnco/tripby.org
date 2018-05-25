/**
*
* Spinner
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components';


const Spinner = ({ inline }) => (
  <div className={!inline && 'spinner-wrapper'}>
    <div className="spinner" />
  </div>
)

Spinner.propTypes = {
  inline: PropTypes.bool,
}

export default Spinner
