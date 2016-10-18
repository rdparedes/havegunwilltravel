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
                            <div className="row">
                                <div className="col s2 m1">
                                    <i className="medium material-icons">label_outline</i>
                                </div>
                                <h3 style={{paddingTop: '6px'}}>Lunes 31 - $400 - 57km</h3>
                            </div>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Horario</th>
                                    <th>Evento</th>
                                    <th>$</th>
                                    <th>Kms.</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>07:05 - 8:00</td>
                                    <td>Vuelo UIO-CUE</td>
                                    <td>100</td>
                                    <td>0</td>
                                    <td><a href="https://www.google.com" target="_blank">www.google.com</a></td>
                                </tr>
                            </tbody>
                        </table>
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
                        <img className="responsive-img" src="./images/demo_img2.jpg" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
