import React, { Component } from 'react'

export default class Schedule extends Component {
  render () {
    return (
      <div className='schedule'>
        <div className='container'>
            <div className='day'>
                <div className="header">
                    
                </div>
                <div className='body'>
                    <div className="schedule">
                        <div className="schedule-header">
                        
                        </div>
                        <div className="schedule-row">
                            
                        </div>
                        <div className="schedule-row">
                            
                        </div>
                    </div>
                    <div className="photos">
                        <div className="row">
                            <div className="col s12 m4">
                                <a href='#' className='waves-effect waves-light btn'>
                                    Agregar foto
                                </a>
                            </div>
                            <div className="col m8 hide-on-small-only right-align">
                                Fotos grandes | Fotos pequeñas
                            </div>
                        </div>
                        <img className="responsive-img" src="./images/demo_img1.jpg" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
