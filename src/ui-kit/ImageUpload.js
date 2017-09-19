import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import Dropzone from 'react-dropzone'

class ImageUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired, // callback that accepts fileId and fileUrl
  }

  uploadFile = (files) => {
  let data = new FormData()
  data.append('data', files[0])
  fetch(process.env.REACT_APP_GRAPHCOOL_FILE_ENDPOINT, {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(file => {
      this.props.onUpload(file.id, file.url)
    })
  }

  render(){
    return(
      <Dropzone
        onDrop={this.uploadFile}
        // onDropAccepted={()=>alert('drop accepted')}
      />
    )
  }
}

export default ImageUpload
