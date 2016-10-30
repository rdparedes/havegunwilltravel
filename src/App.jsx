import React, { Component } from 'react'
import Header from './Header.jsx'
import Schedule from './Schedule.jsx'
import Rebase from 're-base'

export let base = Rebase.createClass({
  apiKey: 'AIzaSyCAkRN5NsUMMEKpChQGFjXmHjh3nmGZtq0',
  authDomain: 'havegunwilltravel-33450.firebaseapp.com',
  databaseURL: 'https://havegunwilltravel-33450.firebaseio.com',
  storageBucket: 'havegunwilltravel-33450.appspot.com'
})

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: {}
    }
  }
  componentDidMount () {
    base.onAuth((authData) => {
      if (authData) {
        this.setState({
          loggedIn: true,
          user: {
            name: authData.displayName.split(' ')[0]
          }
        })
      } else {
        this.setState({
          loggedIn: false,
          user: {}
        })
      }
    })
  }
  render () {
    return (
      <div className='App'>
        <Header loggedIn={this.state.loggedIn} user={this.state.user} />
        <Schedule />
      </div>
    )
  }
}
