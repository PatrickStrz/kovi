import React from 'react'
import {muiColors} from 'styles/theme/colors'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GenericError = () => {
  return(
    <Box>
      <div>
        <h1 style={{color:muiColors.primary1}}>Loading...</h1>
      </div>
    </Box>
  )
}

export default GenericError
