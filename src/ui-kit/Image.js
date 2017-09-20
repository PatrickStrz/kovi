import React, {Component} from 'react'
import PropTypes from 'prop-types'
// other
import styled, {css} from 'styled-components'

const Placeholder = styled.div`
  height:60px;
  width:60px;
  background-color: rgb(191, 191, 191);
  border-radius: 2px;
`
const ImageTag = styled.img`
  ${props => css`
      height:${props.size};
      width:${props.size};
    `
  }
`

class Image extends Component {
  static propTypes = {
    url: PropTypes.string,
    size: PropTypes.string,
  }
  static defaultProps ={
    size: "70px"
  }

  renderImage = () => {
    const {size, url} = this.props
    return(
      <ImageTag src={url} size={size} alt="" />
    )
  }

  render(){
    const {url} = this.props
    return(
      <div>
        {url ? this.renderImage() : <Placeholder/> }
      </div>
    )
  }
}

export default Image
