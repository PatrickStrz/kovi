import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {muiColors, colors} from 'styles/theme/colors'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import 'styles/css/react-dropzone.css'

const Box = styled.div`
  display: flex;
  ${''/* flex-direction: column; */}
  align-items: center;
  justify-content: center;
  padding: 15px;
`
const Text = styled.p`
  font-size: 18px;
  color: ${props => props.color ? props.color: colors.lightGrey};
  text-align: center;
  margin: 5px;
`
const Image = styled.img`
  height:100px;
  width:100px;
`
class ImageUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired, // callback that accepts fileId and fileUrl
  }

  state={
    uploadStatus:'',
    dropzoneStatus:'',
  }

  uploadFile = (files) => {
  this.setUploadStatus('uploading')
  let data = new FormData()
  data.append('data', files[0])
  fetch(process.env.REACT_APP_GRAPHCOOL_FILE_ENDPOINT, {
      method: 'POST',
      body: data
    }).then(response => {
      return response.json()
    }).then(file => {
      this.props.onUpload(file.id, file.url)
      this.setState({imageUrl:file.url})
      this.setUploadStatus('upload-complete')
    })
  }

  setUploadStatus = (status) => {
    this.setState({uploadStatus:status})
  }
  // setDropzoneStatus = (status) => {
  //   this.setState({dropzoneStatus:status})
  // }

  baseStyle = {
    height: 200,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  styles = {
    style: {
      border: '2px dashed rgb(179, 179, 179)',
      ...this.baseStyle,
    },
    active:{
      border: `2px solid ${muiColors.secondary1}`,
      ...this.baseStyle,
    },
    reject:{
      border: `2px solid ${colors.warningRed}`,
      ...this.baseStyle,
    },
  }

  renderUploadBody = () => {

      switch (this.state.uploadStatus) {
        case 'uploading':
          return(
            <Box>
              <Text>uploading...</Text>
            </Box>
          )
        case 'upload-complete':
          return(
            <Box>
              <Image src={this.state.imageUrl} alt=""/>
            </Box>
          )
        case 'rejected':
          return(
            <Box>
              <Text color={colors.warningRed}>
                File must be less than 2mb and
                of one of the following types:
              <br/> .gif .png .jpg  .jpeg
              </Text>
            </Box>
          )
        default:
          return(
            <Box>
              <Text>Drop a file or click here, GIFs encouraged ヽ(•‿•)ノ</Text>
            </Box>
          )
      }

  }

  render(){
    return(
      <Dropzone
        accept=".jpg,.png,.gif,.jpeg"
        style={this.styles.style}
        activeStyle={this.styles.active}
        rejectStyle={this.styles.reject}
        maxSize={2e+6} //2mb converted to bytes
        onDropAccepted={this.uploadFile}
        onDropRejected={()=>this.setUploadStatus('rejected')}
      >
        {this.renderUploadBody()}
      </Dropzone>
    )
  }
}

export default ImageUpload
