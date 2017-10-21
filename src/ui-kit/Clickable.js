//react
import React from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'

// Wraps an element making it clickable (calls onClick function passed as prop):
const Clickable = (props) => {
  return(
    <Box onClick={props.onClick}>{props.children}</Box>
  )
}

Clickable.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const Box = styled.div`
  -webkit-tap-highlight-color:transparent;
  cursor: pointer;
`

export default Clickable
