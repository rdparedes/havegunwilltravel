import React, { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <div className='header'>
        <div className='row'>
            <div className='col m3 push-m9'>
                <a href='#' className='waves-effect waves-light btn' style={{float: 'right'}}>
                    Login
                </a>
            </div> 
        </div>
      </div>
    )
  }
}
