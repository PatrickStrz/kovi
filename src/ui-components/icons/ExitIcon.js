import React from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  cursor: pointer;
  .fa{
    ${props => css`
      color: ${props.color};
      :hover{
        color: ${props.hoverColor};
      }`
    }
  }
`

const ExitIcon = (props) => {
  return(
    <Container
      color={props.color}
      hoverColor={props.hoverColor}
      onClick={props.handleClick}
    >
      <i className={`fa fa-remove fa-${props.size}`} ></i>
    </Container>
  )
}

ExitIcon.propTypes = {
  handleClick: PropTypes.func,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired, //1x,2x,3x,4x,5x
}

export default ExitIcon
