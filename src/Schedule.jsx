import React, { Component } from 'react'
import Day from './Day.jsx'
import Rebase from 're-base'

let base = Rebase.createClass({
  apiKey: "AIzaSyCAkRN5NsUMMEKpChQGFjXmHjh3nmGZtq0",
  authDomain: "havegunwilltravel-33450.firebaseapp.com",
  databaseURL: "https://havegunwilltravel-33450.firebaseio.com",
  storageBucket: "havegunwilltravel-33450.appspot.com"
})

function renderDays(days) {
  // TODO: sort days correctly
  if (days.length > 0) {
    return days.map((day, index) => (
      <Day key={index} events={day.events} totalCost={day.totalCost}
        totalDistance={day.totalDistance} date={day.date} />
    )).reverse()
  }
  else return []
}

export default class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      days: []
    }
  }
  componentWillMount() {
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
          { days }
        </div>
      </div>
    )
  }
}
