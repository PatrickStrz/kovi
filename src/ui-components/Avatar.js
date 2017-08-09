import React from 'react'
import styled from 'styled-components'

// Profile avatar that displays inline

const StyledAvatar = styled.div`
  background-image: url(${props => props.imageUrl});
  width: 30px;
  height: 30px;
  background-size: cover;
  /* center the image vertically and horizontally */
  background-position: center;
  border-radius: 50%;
  display: inline-block;
`

const Avatar = (props) => <StyledAvatar imageUrl={props.imageUrl}/>

export default Avatar
