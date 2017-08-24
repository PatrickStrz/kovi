import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const Container = styled.div`
  cursor: pointer;
   ${ props => css`
      .fa{
        font-size: ${props.size};
        color: ${props.color};
        :hover{
          color: ${props.hoverColor};
        }
     ` }
  }
`

const FaIconButton = (props) => {
  const {size, color, hoverColor, onClick, faClassName} = props
  return(
    <Container
      size={size}
      color={color}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      <i className={`fa ${faClassName}`} aria-hidden="true"></i>
    </Container>
  )
}

FaIconButton.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  faClassName: PropTypes.string.isRequired, // http://fontawesome.io/cheatsheet/
}

export default FaIconButton
