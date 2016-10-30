import React, { Component } from 'react'
import { base } from './App.jsx'

function getAddFileSection (self) {
  return <div className='col s12'>
    <input type='file' accept='image/*' id={'upload' + self.props.dayId}
      className='upload-file' />
    <label htmlFor={'upload' + self.props.dayId}
      className='waves-effect waves-light btn'>Elegir foto</label>
  </div>
}

function getUploadFileSection (self) {
  return <div className='col s12'>
    <span className='file-name'>{ self.state.file.name }</span>
    <button onClick={self.uploadImage} className='waves-effect waves-light btn'>
       Subir foto
    </button>
  </div>
}

export default class DayImages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photos: {},
      images: [],
      file: null,
      photosAreLoading: false,
      photosAreReady: false
    }
    this.storageRef = base.storage().ref(this.props.dayId)
    this.uploadImage = () => {
      let uploadTask = this.storageRef.child(this.state.file.name).put(this.state.file)
      uploadTask.on(base.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        console.log('uploading picture')
      }, (error) => {
        console.error('An error has occurred while uploading the picture')
      }, () => {
        let url = uploadTask.snapshot.downloadURL
        let updatedPhotos = this.state.photos
        let index = Object.keys(this.state.photos).length + 1
        updatedPhotos[index] = this.state.file.name
        this.setState({ photos: updatedPhotos })
        this.addImageToDOM(url, index)
        this.setState({ file: null })
        this.addFileInputListener()
      })
    }
  }
  componentDidMount () {
    let photosEndpoint = 'days/' + this.props.dayId.replace(/_|-/g, '_') + '/photos'
    base.syncState(photosEndpoint, {
      context: this,
      state: 'photos',
      asArray: false
    })
    this.addFileInputListener()
  }
  addFileInputListener () {
    let input = document.querySelectorAll('#upload' + this.props.dayId)[0]
    input.addEventListener('change', (e) => {
      let file = input.files[0]
      this.setState({ file: file })
    })
  }
  addImageToDOM (url, key) {
    let img = <img key={key} className='responsive-img' src={url} />
    this.setState({ images: this.state.images.concat(img) })
  }
  loadPhotos () {
    this.setState({ photosAreLoading: true })
    let photos = this.state.photos
    let photosLength = Object.keys(photos).length

    for (var key in photos) {
      let index = key
      this.storageRef.child(photos[key]).getDownloadURL().then((url) => {
        let imagesLength = this.state.images.length
        this.addImageToDOM(url, index)
        if (imagesLength >= photosLength) {
          this.setState({
            photosAreLoading: false,
            photosAreReady: true
          })
        }
      })
    }
  }
  componentDidUpdate (nextProps, nextState) {
    if (!this.state.photosAreLoading && !this.state.photosAreReady) {
      this.loadPhotos()
    }
  }
  render () {
    let images = this.state.images
    let uploadSection
    if (!this.state.file) {
      uploadSection = getAddFileSection(this)
    } else {
      uploadSection = getUploadFileSection(this)
    }

    return (
      <div className='photos'>
        <div className='row'>
          { uploadSection }
        </div>
        { images }
      </div>
    )
  }
}
