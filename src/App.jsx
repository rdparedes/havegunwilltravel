import React, { Component } from 'react'
import logo from './logo.svg'
import Header from './Header.jsx'

export default class App extends Component {
  render () {
    return (
      <div className='App'>
        <Header />
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="waves-effect waves-light btn">button</a>
      </div>
    )
  }
}
