import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'

const Button = styled.a`
	color: ${muiColors.primary1};
  font-size: 14px;
  cursor: pointer;
`

const TextButton = (props) => {

  const handleSubmit = () => {
    props.handleSubmit()
  }

  return(
    <Button onClick={() => handleSubmit()}>{props.label}</Button>
  )
}

TextButton.propTypes = {
  label: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default TextButton
