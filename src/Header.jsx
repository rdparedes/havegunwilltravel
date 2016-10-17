import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <div className='header'>
        <div className='row'>
            <div className='col s12 right-align'>
                <a href='#' className='waves-effect waves-light btn'>
                    Login
                </a>
            </div> 
        </div>
      </div>
    )
  }
}
