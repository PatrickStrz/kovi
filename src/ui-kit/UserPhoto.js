//react
import React from 'react'
import PropTypes from 'prop-types'
//other
import styled, {css} from 'styled-components'

//Profile avatar that displays inline
const UserPhoto = (props) => {
  return(
    <PictureFrame size={props.size} imageUrl={props.imageUrl}/>
  )
}

const PictureFrame = styled.div`
  border-radius: 3px;
  background-image: url(${props => props.imageUrl});
  ${props => `
      width: ${props.size};
      height: ${props.size};
    `}
  background-size: cover;
  /* center the image vertically and horizontally */
  background-position: center;
  display: inline-block;
  ${props => css`
      min-width: ${props.size};
      max-width: ${props.size};
    `}
`

UserPhoto.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default UserPhoto
