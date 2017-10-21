import React from 'react'
import PropTypes from 'prop-types'

import styled, {css} from 'styled-components'
import {muiColors} from 'styles/theme/colors'
import CircularProgress from 'material-ui/CircularProgress'

const TextButton = (props) => {

  const handleClick = () => {
    props.onClick()
  }

  if (props.inProgress){
    return <CircularProgress size={20}/>
  }

  return(
    <div>
    <Button
      color={props.color}
      fontSize={props.fontSize}
      onClick={() => handleClick()}
      withBorder={props.withBorder}
      borderColor={props.borderColor}
    >
    {props.label}
    </Button>
    </div>
  )
}

const Button = styled.a`
  ${props => css`
    color: ${props.color};
    font-size: ${props.fontSize};
    `}
  ${props => props.withBorder && css`
    border: solid 2px ${props.borderColor};
    border-radius: 3px;
    `}
  /* top left bottom right: */
  padding: 2px 5px 2px 5px;
  cursor: pointer;
`

TextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  withBorder: PropTypes.bool,
  borderColor: PropTypes.string,
  size: PropTypes.string,
}

TextButton.defaultProps = {
  size: '16px',
  color: muiColors.primary1
}

export default TextButton
