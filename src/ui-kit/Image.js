import React, {Component} from 'react'
import PropTypes from 'prop-types'
// other
import styled, {css} from 'styled-components'

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
    const {size, url} = this.props
    return(
      <div>
        {url ? this.renderImage() : <Placeholder size={size}/> }
      </div>
    )
  }
}

const styles ={
  borderRadius: '2px'
}

const Placeholder = styled.div`
${props => css`
  height:${props.size};
  width:${props.size};
`}
  background-color: rgb(191, 191, 191);
  border-radius: ${styles.borderRadius};
`
const ImageTag = styled.img`
  border-radius: ${styles.borderRadius};
  ${props => css`
    height:${props.size};
    width:${props.size};
  `}
`

export default Image
