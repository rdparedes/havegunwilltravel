import React, { Component } from 'react'
import Day from './Day.jsx'
import moment from 'moment'
import { base } from './App.jsx'

function renderDays (days) {
  if (days.length > 0) {
    return days.map((day, index) => (
      <Day key={index} events={day.events} totalCost={day.totalCost}
        totalDistance={day.totalDistance} date={day.date} />
    )).sort(function (a, b) {
      return moment(b.props.date, 'DD-MM-YYYY') - moment(a.props.date, 'DD-MM-YYYY')
    }).reverse()
  } else {
    return []
  }
}

export default class Schedule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      days: []
    }
  }
  componentWillMount () {
    base.syncState('days', {
      context: this,
      state: 'days',
      asArray: true
    })
  }
  render () {
    const days = renderDays(this.state.days)

    return (
      <div className='schedule'>
        <div className='container'>
          <div className='row'>
            <div className='col s12 hide-on-small-only right-align'>
              <a href='#'>Fotos grandes</a> | <a href='#'>Fotos pequeñas</a>
            </div>
          </div>
          { days }
        </div>
      </div>
    )
  }
}
