import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
  height: 250px;
  width: 200px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  margin: 5px;
`

class ProductCard extends Component {
  static PropTypes = {
    solution: PropTypes.object.isRequired
  }
  render(){
    const {product} = this.props
    return(
      <Box>
        <h1>{product.title}</h1>
        <h4>{product.id}</h4>
      </Box>
    )
  }
}

export default ProductCard
