import React, { Component } from 'react'
import { base } from './App.jsx'

export default class DayEvent extends Component {
  render () {
    return (
      <tr>
        <td>{ this.props.schedule }</td>
        <td>{ this.props.name }</td>
        <td>{ this.props.cost }</td>
        <td>{ this.props.carDistance }</td>
        <td>{ this.props.description }</td>
        <td><a href={this.props.url} target='_blank'>{ this.props.url }</a></td>
        <td>
          <button className='btn-flat waves-effect waves-light'
            onClick={ () => this.props.deleteEvent(this.props.index) }>×</button>
        </td>
      </tr>
    )
  }
}
