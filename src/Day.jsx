import React, { Component } from 'react'
import DayEvent from './DayEvent.jsx'
import moment from 'moment'
import 'moment/locale/es'

export default class Day extends Component {
  constructor(props) {
    super(props)
    let parsedDate = moment(this.props.date, 'DD-MM-YYYY')
    this.dayOfTheWeek = parsedDate.format('dddd')
    this.day = parsedDate.format('DD')
  }
  render () {
    let dayEvents = []
    if (this.props.events !== null && this.props.events !== undefined) {
      dayEvents = this.props.events.map((event, index) => (
        <DayEvent key={index} carDistance={event.carDistance} cost={event.cost} name={event.name}
          description={event.description} schedule={event.schedule} url={event.url} />
      ))
    }

    return (
      <div id={ this.props.date } className='day'>
        <div className='day-header'>
          <div className='row'>
            <div className='col s2 m1'>
              <i className='medium material-icons'>label_outline</i>
            </div>
            <h3>{ this.dayOfTheWeek } { this.day } - ${ this.props.totalCost } - { this.props.totalDistance }km</h3>
          </div>
        </div>
        <table className='highlight'>
          <thead>
            <tr>
              <th width='15%'>Horario</th>
              <th width='25%'>Evento</th>
              <th width='10%'>$</th>
              <th width='10%'>Kms.</th>
              <th width='25%'>Cosas</th>
              <th width='15%'>URL</th>
            </tr>
          </thead>
          <tbody>
            { dayEvents }
          </tbody>
        </table>
        <div className='photos'>
          <div className='row'>
            <div className='col s12 m4'>
              <a href='#' className='waves-effect waves-light btn'>
                Agregar foto
              </a>
              </div>
              <div className='col m8 hide-on-small-only right-align'>
                Fotos grandes | Fotos pequeñas
              </div>
            </div>
          <img className='responsive-img' src='#' />
          <img className='responsive-img' src='#' />
        </div>
      </div>
    )
  }
}
