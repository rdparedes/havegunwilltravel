import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import firebase from 'firebase'
import 'jquery'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'
import './index.css'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyCAkRN5NsUMMEKpChQGFjXmHjh3nmGZtq0",
  authDomain: "havegunwilltravel-33450.firebaseapp.com",
  databaseURL: "https://havegunwilltravel-33450.firebaseio.com",
  storageBucket: "havegunwilltravel-33450.appspot.com",
  messagingSenderId: "4333420732"
}
firebase.initializeApp(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
