import React from 'react'
import Header from './Header'
import Footer from './Footer'

class App extends React.Component{
  render () {
    return (
      <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
        <Header />
        <div style={{ flex: 1 }}>{this.props.children}</div>
        <Footer />
      </div>
    )
  }
}

export default App
