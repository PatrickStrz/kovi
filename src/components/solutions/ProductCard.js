import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {PRODUCT_CARD_SHADOW} from 'styles/shadows'
//components
import {Image} from 'ui-kit'

const Box = styled.div`
  height: 200px;
  width: 150px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  margin: 5px;
  ${PRODUCT_CARD_SHADOW}
`

class ProductCard extends Component {
  static PropTypes = {
    solution: PropTypes.object.isRequired
  }
  render(){
    const {product} = this.props
    const imageUrl = product.image.url
    return(
      <Box>
        <Image size="150px" url={imageUrl} />
        <h4>{product.title}</h4>
      </Box>
    )
  }
}

export default ProductCard
