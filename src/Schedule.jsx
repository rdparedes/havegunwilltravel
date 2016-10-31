import React, { Component } from 'react'
import Day from './Day.jsx'
import moment from 'moment'
import { base } from './App.jsx'

function renderDays (state, props) {
  if (state.days.length > 0) {
    return state.days.map((day, index) => (
      <Day key={index} loggedIn={props.loggedIn} date={day.date} photoSize={state.photoSize} />
    )).sort(function (a, b) {
      return moment(b.props.date, 'DD-MM-YYYY') - moment(a.props.date, 'DD-MM-YYYY')
    }).reverse()
  } else {
    return []
  }
}

function changePhotosSize(size) {
  if (size === 'big') {
    $('.img').addClass('responsive-img').removeClass('small-img')
  } else if (size === 'small') {
    $('.img').addClass('small-img').removeClass('responsive-img')
  }
}

export default class Schedule extends Component {
  constructor (props) {
    super(props)
    this.state = {
      days: [],
      photoSize: 'responsive-img'
    }
  }
  componentWillMount () {
    base.syncState('days', {
      context: this,
      state: 'days',
      asArray: true
    })
  }
  componentDidMount () {
    $('#view-big-photos').click((event) => {
      event.preventDefault()
      this.setState({ photoSize: 'responsive-img' })
      changePhotosSize('big')
    })
    $('#view-small-photos').click((event) => {
      event.preventDefault()
      this.setState({ photoSize: 'small-img' })
      changePhotosSize('small')
    })
  }
  render () {
    const days = renderDays(this.state, this.props)

    return (
      <div className='schedule'>
        <div className='container'>
          <div className='row'>
            <div className='col s12 hide-on-small-only right-align'>
              <a href='#' id='view-big-photos'>Fotos grandes</a>
              &nbsp;| <a href='#' id='view-small-photos'>Fotos pequeñas</a>
            </div>
          </div>
          { days }
        </div>
      </div>
    )
  }
}
