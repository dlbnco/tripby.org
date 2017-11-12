/**
*
* Footer
*
*/

import React from 'react'
// import styled from 'styled-components';


function Footer() {
  return (
    <div>
      <section className="py-5" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div className="row align-items-center">
            <ul className="col-12 col-md-6 d-flex mb-0 flex-column flex-md-row">
              <li className="mr-5" style={{ listStyleType: 'none' }}><a href="https://www.facebook.com/tripby">Facebook</a></li>
              <li className="mr-5" style={{ listStyleType: 'none' }}><a href="https://www.facebook.com/tripby">Twitter</a></li>
              <li className="mr-5" style={{ listStyleType: 'none' }}><a href="https://www.facebook.com/tripby">Instagram</a></li>
              <li className="mr-5" style={{ listStyleType: 'none' }}><a href="https://www.facebook.com/tripby">GitHub</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

Footer.propTypes = {

}

export default Footer
