import React from 'react'
import {muiColors} from 'styles/theme/colors'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-basis: 100%;
  align-items: center;
  flex-direction: column;
`

const GenericError = () =>{
  return(
    <Box>
      <h1 style={{color:muiColors.primary1}}>
        Request Error (¬▂¬)
      </h1>
      <h4>Please check your connection</h4>
    </Box>
  )
}

export default GenericError
