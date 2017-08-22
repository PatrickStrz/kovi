import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
import CircularProgress from 'material-ui/CircularProgress';

const Button = styled.a`
	color: ${muiColors.primary1};
  font-size: 16px;
  cursor: pointer;
`

const TextButton = (props) => {

  const handleClick = () => {
    props.onClick()
  }

	if (props.inProgress){
		return <CircularProgress size={20}/>
	}

  return(
		<div>
    <Button onClick={() => handleClick()}>{props.label}</Button>
		</div>
  )
}

TextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
	inProgress: PropTypes.bool,
}

export default TextButton
