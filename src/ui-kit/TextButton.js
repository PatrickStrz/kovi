import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'

const Button = styled.a`
	color: ${muiColors.primary1};
  font-size: 16px;
  cursor: pointer;
`

const TextButton = (props) => {

  const handleClick = () => {
    props.onClick()
  }

  return(
    <Button onClick={() => handleClick()}>{props.label}</Button>
  )
}

TextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default TextButton
