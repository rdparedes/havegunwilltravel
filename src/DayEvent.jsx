import React, { Component } from 'react'

export default class DayEvent extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <tr>
        <td>07:05 - 8:00</td>
        <td>Vuelo UIO-CUE</td>
        <td>100</td>
        <td>0</td>
        <td><a href="https://www.google.com" target="_blank">www.google.com</a></td>
      </tr>
    )
  }
}
