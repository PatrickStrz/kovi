import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'

const Title = styled.h1`
  color: ${muiColors.primary1};
  margin-top:20px;
`
const Content = styled.h4`
  color: ${colors.medGrey};
  margin-top:20px;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
/* Simple component that acts as a placeholder for incomplete features ...
  i.e) Use it as a coming soon placeholder
*/
const Placeholder = (props) =>{
  return(
    <Box>
      <Title>{props.title}</Title>
      <Content>{props.content}</Content>
    </Box>
  )
}

Placeholder.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

export default Placeholder
