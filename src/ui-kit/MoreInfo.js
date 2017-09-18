import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
// components
import {FaIconButton} from 'ui-kit/icons'
import {Popover} from 'ui-kit'

const Box = styled.div`
  ${props => css`
      height: ${props.size};
      width: ${props.size};
    `}
`
const MoreInfoBox = styled.div`
  ${props => css`
      height: 100px;
      width: 500px;
    `}
  background-color: white;
`



class MoreInfo extends Component {
  // static PropTypes
  render(){
    const size = '20px'
    return(
      <Box size={size}>
        <Popover
          body={<MoreInfoBox>Infooooo</MoreInfoBox>}
          renderedOnPage={true}
        >
          <FaIconButton
            size="18px"
            color={colors.lightGrey}
            hoverColor={muiColors.secondary1}
            faClassName=" fa-info"
            inline={true}
          />
        </Popover>
      </Box>
    )
  }
}

export default MoreInfo
