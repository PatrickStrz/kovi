import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

 const getColor = props => {
  const {disabled, disabledColor, color} = props
  if (disabledColor && disabled === true){
    return disabledColor
  }
  else{
    return color
  }
}

const Container = styled.div`
  /* remove background highlight on mobile click: */
  -webkit-tap-highlight-color:transparent;
  cursor: pointer;
   ${ props => css`
      .fa{
        font-size: ${props.size};
        color: ${getColor(props)};
        ${props.inline && `display:inline;`}
        :hover{
          color: ${props.hoverColor};
        }
      }
    `
  }
  ${props => props.inline && css`display: inline`}
`

const FaIconButton = (props) => {
  const {
    size,
    color,
    hoverColor,
    onClick,
    faClassName,
    inline,
    disabled,
    disabledColor,
  } = props

  return(
    <Container
      inline={inline}
      disabled={disabled}
      disabledColor={disabledColor}
      size={size}
      color={color}
      hoverColor={hoverColor}
      onClick={!disabled && onClick}
    >
      <i className={`fa ${faClassName}`} aria-hidden="true"></i>
    </Container>
  )
}

FaIconButton.propTypes = {
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  faClassName: PropTypes.string.isRequired, // http://fontawesome.io/cheatsheet/
}

export default FaIconButton
