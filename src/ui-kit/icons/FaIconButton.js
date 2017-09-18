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

const Box = styled.div`
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
      height: ${props.size};
      width: ${props.size};
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
    <Box
      inline={inline}
      disabled={disabled}
      disabledColor={disabledColor}
      size={size}
      color={color}
      hoverColor={hoverColor}
      onClick={!disabled && onClick}
    >
      <i className={`fa ${faClassName}`} aria-hidden="true"></i>
    </Box>
  )
}

FaIconButton.propTypes = {
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  faClassName: PropTypes.string.isRequired, // http://fontawesome.io/cheatsheet/
}

export default FaIconButton
