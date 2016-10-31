import React, { Component } from 'react'
import { base } from './App.jsx'

export default class Header extends Component {
  render () {
    let authSection
    let login = () => {
      base.authWithOAuthPopup('facebook', (error) => {
        if (error) console.error(error)
        return
      })
    }
    let logout = () => {
      base.unauth()
    }
    if (this.props.loggedIn) {
      authSection = <div className='row'>
        <div className='col s6'>
          <h4>Hola, { this.props.user.name }!</h4>
        </div>
        <div className='col s6 right-align'>
          <button onClick={logout} className='waves-effect waves-light btn'>
                Salir
          </button>
        </div>
      </div>
    } else {
      authSection = <div className='row'>
        <div className='col s12 right-align'>
          <button onClick={login} className='waves-effect waves-light btn'>
              Autenticarse
          </button>
        </div>
      </div>
    }

    return (
      <div className='header'>
        { authSection }
      </div>
    )
  }
}
