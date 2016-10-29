import React, { Component } from 'react'
import { base } from './App.jsx'

export default class DayImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: {},
      images: [],
      file: null
    }
    this.storageRef = base.storage().ref(this.props.dayId)
    this.photosAreLoading = false
    this.photosAreReady = false

    this.uploadImage = () => {
      let uploadTask = this.storageRef.child(this.state.file.name).put(this.state.file)
      uploadTask.on(base.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        console.log('uploading picture')
      }, (error) => {
        console.error('An error has occurred while uploading the picture')
      }, () => {
        let url = uploadTask.snapshot.downloadURL
        console.log('upload successful, this is the url: ', url)
      })
    }
  }
  componentDidMount() {
    let photosEndpoint = 'days/' + this.props.dayId.replace(/_|-/g, "_") + '/photos'
    base.syncState(photosEndpoint, {
      context: this,
      state: 'photos',
      asArray: false
    })

    let input = document.querySelectorAll('#upload' + this.props.dayId)[0]
    input.addEventListener('change', (e) => {
      let file = input.files[0]
      this.setState({ file: file })
    })
  }
  componentDidUpdate(nextProps, nextState) {
    if (!this.photosAreLoading && !this.photosAreReady) {
      this.photosAreLoading = true
      let photos = this.state.photos
      let photosLength = Object.keys(this.state.photos).length

      for (var key in photos) {
        let index = key
        this.storageRef.child(photos[key]).getDownloadURL().then((url) => {
          let img = <img key={index} className='responsive-img' src={url} />
          let imagesLength = this.state.images.length
          this.setState({ images: this.state.images.concat(img) })
          if (imagesLength >= photosLength) {
            this.photosAreLoading = false
            this.photosAreReady = true
          }
        })
      }
    }
  }
  render () {
    let uploadSection
    if (!this.state.file) {
      uploadSection = <div className='col s12 m8'>
        <input type='file' accept='image/*' id={ 'upload' + this.props.dayId }
          className='upload-file'/>
        <label htmlFor={ 'upload' + this.props.dayId }
          className='waves-effect waves-light btn'>Elegir foto</label>
      </div>
    } else {
      uploadSection = <div className='col s12 m8'>
        <span className='file-name'>{ this.state.file.name }</span>
        <button onClick={ this.uploadImage } className='waves-effect waves-light btn'>
           Subir foto
        </button>
      </div>
    }

    return (
      <div className='photos'>
        <div className='row'>
          { uploadSection }
          <div className='col m4 hide-on-small-only right-align'>
            Fotos grandes | Fotos pequeñas
          </div>
        </div>
        { this.state.images }
      </div>
    )
  }
}

