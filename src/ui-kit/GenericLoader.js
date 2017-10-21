import React from 'react'
import {muiColors} from 'styles/theme/colors'
import PropTypes from 'prop-types'
import {loadingOpacity} from 'styles/animations/keyframes'
import styled from 'styled-components'

const GenericError = (props) => {
  return(
    <Box>
      <Loader>{props.text}</Loader>
    </Box>
  )
}

GenericError.PropTypes = {
  text: PropTypes.string.isRequired
}

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Loader = styled.h1`
  color: ${muiColors.primary1};
  animation: ${loadingOpacity} 1.25s infinite;
`

export default GenericError
