import React, { Component } from 'react'

export default class DayEvent extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <tr>
        <td>{ this.props.schedule }</td>
        <td>{ this.props.name }</td>
        <td>{ this.props.totalCost }</td>
        <td>{ this.props.carDistance }</td>
        <td>{ this.props.description }</td>
        <td><a href={this.props.url} target="_blank">{ this.props.url }</a></td>
      </tr>
    )
  }
}
