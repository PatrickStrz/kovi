import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {muiColors, colors} from 'styles/theme/colors'
import {FaIconButton} from 'ui-kit/icons'

class MoreInfo extends Component {
  render(){
    return(
      <FaIconButton
        size="25pxi"
        color={colors.lightGrey}
        hoverColor={muiColors.secondary1}
        faClassName=" fa-info"
        onClick={()=>alert('clicked!')}
      />
    )
  }
}

export default MoreInfo
