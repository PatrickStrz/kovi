//react
import React from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'

//Profile avatar that displays inline
const StyledAvatar = styled.div`
  background-image: url(${props => props.imageUrl});
  ${props => `
      width: ${props.size}px;
      height: ${props.size}px;
    `}
  background-size: cover;
  /* center the image vertically and horizontally */
  background-position: center;
  border-radius: 50%;
  display: inline-block;
`

const Avatar = (props) => {
  return(
    <StyledAvatar size={props.size} imageUrl={props.imageUrl}/>
  )
}

Avatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}

export default Avatar
