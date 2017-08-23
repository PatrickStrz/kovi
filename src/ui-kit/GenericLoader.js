import React from 'react'
import {muiColors} from 'styles/theme/colors'
import {loadingOpacityKeyframes} from 'styles/animations/keyframes'
import styled from 'styled-components'


const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Loader = styled.h1`
  color: ${muiColors.primary1};
  animation: ${loadingOpacityKeyframes} 1.25s infinite;
`

const GenericError = () => {
  return(
    <Box>
      <Loader>...Loading</Loader>
    </Box>
  )
}

export default GenericError
