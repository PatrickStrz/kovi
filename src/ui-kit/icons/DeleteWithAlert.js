import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {requireAuth} from 'lib/auth'
//components
import {FaIconButton} from 'ui-kit/icons'

//Delete button that requires auth and shows a warning when clicked.
const DeleteWithAlert = (props) => {
  const handleClick = () => {
    props.onClick()
  }
  return(
    <FaIconButton
      onClick={handleClick}
      color={colors.lightGrey}
      hoverColor={colors.errorRed}
      faClassName="fa-trash"
    />
  )
}

DeleteWithAlert.propTypes = {
  onClick = PropTypes.func.isRequired
}

export default DeleteWithAlert
