import React, { Component } from 'react'
import DayEvent from './DayEvent.jsx'
import DayImages from './DayImages.jsx'
import moment from 'moment'
import 'moment/locale/es'
import { base } from './App.jsx'

export default class Day extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [],
      addEventFormIsVisible: false
    }
    let parsedDate = moment(this.props.date, 'DD-MM-YYYY')
    this.dayOfTheWeek = parsedDate.format('dddd')
    this.day = parsedDate.format('DD')
  }
  componentWillMount () {
    let eventsEndpoint = 'days/' + this.props.date.replace(/_|-/g, '_') + '/events'
    base.syncState(eventsEndpoint, {
      context: this,
      state: 'events',
      asArray: true
    })
    this.deleteEvent = (index) => {
      let updatedEvents = this.state.events
      updatedEvents.splice(index, 1)
      this.setState({ events: updatedEvents })
    }
  }
  addEvent () {
    $('#add-event-form' + this.props.date).show()
    this.setState({ addEventFormIsVisible: true })
  }
  getEventValues () {
    return {
      schedule: $('#' + this.props.date + ' #horario').val(),
      name: $('#' + this.props.date + ' #evento').val(),
      cost: parseFloat($('#' + this.props.date + ' #costo').val() || 0),
      carDistance: parseFloat($('#' + this.props.date + ' #kms').val() || 0),
      description: $('#' + this.props.date + ' #cosas').val(),
      url: $('#' + this.props.date + ' #url').val(),
      key: this.state.events.length
    }
  }
  saveEvent () {
    let event = this.getEventValues()
    if (!event.name) {
      return
    }
    this.setState({ events: this.state.events.concat(event) })
    this.cancelAddEvent()
  }
  cancelAddEvent () {
    $('#add-event-form' + this.props.date).hide()
    this.setState({ addEventFormIsVisible: false })
  }
  render () {
    let dayEvents = []
    let addEventSection
    let saveEventSection
    let addEventForm
    if (this.state.events) {
      dayEvents = this.state.events.map((event, index) => (
        <DayEvent key={event.key} carDistance={event.carDistance} cost={event.cost} name={event.name}
          description={event.description} schedule={event.schedule} url={event.url}
          deleteEvent={this.deleteEvent} index={event.key} />
      ))
    }
    if (this.props.loggedIn) {
      addEventSection = <div className='row event'>
        <div className='col s12'>
          <button id={'add-event' + this.props.date} className='waves-effect waves-light btn grey'
            onClick={ () => this.addEvent() }>
            + Evento
          </button>
        </div>
      </div>
      saveEventSection = <div className='row event'>
        <div className='col s12'>
          <button id={ 'save-event' + this.props.date } className='waves-effect waves-light btn'
            onClick={ () => this.saveEvent() }>
            Guardar
          </button>
          <button id={ 'cancel-event' + this.props.date } className='waves-effect waves-light btn grey'
            onClick={ () => this.cancelAddEvent() }>
            Cancelar
          </button>
        </div>
      </div>
      addEventForm = <form className='col s12'>
        <div className='row'>
          <div className='input-field col s12 m3'>
            <input placeholder='Horario' id='horario' type='text' className='validate' />
          </div>
          <div className='input-field col s12 m7'>
            <input placeholder='Evento (obligatorio)' id='evento' type='text' className='validate'
              required/>
          </div>
          <div className='input-field col s12 m2'>
            <input placeholder='Costo' id='costo' type='number' step='any' className='validate' />
          </div>
          <div className='input-field col s12 m2'>
            <input placeholder='Kms' id='kms' type='number' step='any' className='validate' />
          </div>
          <div className='input-field col s12 m6'>
            <input placeholder='Cosas' id='cosas' type='text' className='validate' />
          </div>
          <div className='input-field col s12 m4'>
            <input placeholder='URL' id='url' type='text' className='validate' />
          </div>
        </div>
      </form>
    }
    let totalCost = 0
    let totalDistance = 0
    this.state.events.map((event) => {
      totalCost += event.cost
      totalDistance += event.carDistance
    })

    return (
      <div id={this.props.date} className='day'>
        <div className='day-header'>
          <div className='row'>
            <i className='medium material-icons'>label_outline</i>
            <h3>{ this.dayOfTheWeek } { this.day } - ${ totalCost } - { totalDistance }km</h3>
          </div>
        </div>
        { !this.state.addEventFormIsVisible ? addEventSection : saveEventSection }
        <section id={'add-event-form' + this.props.date} className='row' hidden>
            { addEventForm }
        </section>
        <table className='highlight'>
          <thead>
            <tr>
              <th width='12%'>Horario</th>
              <th width='23%'>Evento</th>
              <th width='8%'>$</th>
              <th width='8%'>Kms.</th>
              <th width='29%'>Cosas</th>
              <th width='15%'>URL</th>
              <th width='5%'></th>
            </tr>
          </thead>
          <tbody>
            { dayEvents }
          </tbody>
        </table>
        <DayImages dayId={ this.props.date } photoSize={ this.props.photoSize }
          loggedIn={ this.props.loggedIn } />
      </div>
    )
  }
}
