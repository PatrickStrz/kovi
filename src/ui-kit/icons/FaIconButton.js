import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const Container = styled.div`
  cursor: pointer;
   ${ props => css`
      .fa{
        color: ${props.color};
        :hover{
          color: ${props.hoverColor};
        }
     ` }
  }
`

const FaIconButton = (props) => {
  const {color, hoverColor, onClick, faClassName} = props
  return(
    <Container
      color={color}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      <i className={`fa ${faClassName}`} aria-hidden="true"></i>
    </Container>
  )
}

FaIconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  faClassName: PropTypes.string.isRequired, // http://fontawesome.io/cheatsheet/
}

export default FaIconButton
