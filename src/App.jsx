import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './Header.jsx'
import Schedule from './Schedule.jsx'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <Schedule />
      </div>
    )
  }
}
