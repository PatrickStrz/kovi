import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import {muiColors, colors} from 'styles/theme/colors'
import styled, {css} from 'styled-components'
import 'styles/css/react-dropzone.css'
//components
import Dropzone from 'react-dropzone'
import {FaIcon} from 'ui-kit/icons'
import CircularProgress from 'material-ui/CircularProgress';

class ImageUpload extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired, // callback that accepts fileId and fileUrl
    previewHeight: PropTypes.string.isRequired,
    previewWidth: PropTypes.string.isRequired,
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
    .catch( err => {
      this.setUploadStatus('error')
      }
    )
  }

  setUploadStatus = (status) => {
    this.setState({uploadStatus:status})
  }

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
    const {previewWidth, previewHeight} = this.props

    switch (this.state.uploadStatus) {
      case 'uploading':
        return(
          <Box>
            <CircularProgress size={50}/>
          </Box>
        )
      case 'upload-complete':
        return(
          <Box>
            <Image
              src={this.state.imageUrl} alt=""
              previewWidth={previewWidth}
              previewHeight={previewHeight}
            />
            <IconBox>
              <FaIcon
                size="50px"
                faClassName="fa-check"
                color={muiColors.secondary1}
              />
            </IconBox>
          </Box>
        )
      case 'error':
        return(
          <Box>
            <Text color={colors.warningRed}>
              There was error uploading the file
              <br/>please check your connection and try again.
            </Text>
          </Box>
        )
      case 'rejected':
        return(
          <Box>
            <Text color={colors.warningRed}>
              File must be less than 10mb and
              of one of the following types:
            <br/> .gif .png .jpg  .jpeg
            </Text>
          </Box>
        )
      default:
        return(
          <Box>
            <Text>
            Drop a file or click here, GIFs encouraged <br/> <br/>
            ヽ(•‿•)ノ
            </Text>
          </Box>
        )
    }
  }

  render(){
    return(
      <Dropzone
        onDrop={()=>this.setUploadStatus('')} // to reset after errors
        accept=".jpg,.png,.gif,.jpeg"
        style={this.styles.style}
        activeStyle={this.styles.active}
        maxSize={1e+7} //10mb converted to bytes
        onDropAccepted={this.uploadFile}
        onDropRejected={()=>this.setUploadStatus('rejected')}
      >
        {this.renderUploadBody()}
      </Dropzone>
    )
  }
}

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
`
const Text = styled.p`
  font-size: 18px;
  color: ${props => props.color ? props.color: colors.lightGrey};
  text-align: center;
  margin: 15px;
`
const Image = styled.img`
  ${props => css`
    height: ${props.previewHeight};
    width: ${props.previewWidth};
  `}
`

const IconBox = styled.div`
  margin: 25px;
`

export default ImageUpload
