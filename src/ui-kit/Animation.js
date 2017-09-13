import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {bounceInKeyframes} from 'styles/animations/keyframes'

const AnimationContainer = styled.div`
  animation: ${bounceInKeyframes} 0.5s;
`
const Animation = (props) => {
  return(
    <AnimationContainer>
      {props.children}
    </AnimationContainer>
  )
}

Animation.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Animation
