import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {PRODUCT_CARD_SHADOW} from 'styles/shadows'
import {muiColors} from 'styles/theme/colors'
import {loadingOpacity} from 'styles/animations/keyframes'
//components
import {Image} from 'ui-kit'

const Box = styled.div`
  height: 190px;
  width: 140px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  margin: 5px;
  ${PRODUCT_CARD_SHADOW}
`

const Text = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${muiColors.primary1};
  margin-top: 10px;
`
const ImageLoadingBox = styled.div`
  animation: ${loadingOpacity} 1.25s infinite;
`

class ProductCard extends Component {
  static PropTypes = {
    solution: PropTypes.object.isRequired,
    loadingPlaceholder: PropTypes.bool.isRequired
  }
  renderCard = () => {
    if(this.props.loadingPlaceholder){
      return(
        <Box>
          <ImageLoadingBox>
            <Image size="140px"/>
          </ImageLoadingBox>
        </Box>
      )
    }
    else {
      const {product} = this.props
      const imageUrl = product.image.url
      return(
        <Box>
          <Image size="140px" url={imageUrl} />
          <Text>{product.title}</Text>
        </Box>
      )
    }
  }

  render(){
    return(
      <div>
        {this.renderCard()}
      </div>
    )
  }
}

export default ProductCard
