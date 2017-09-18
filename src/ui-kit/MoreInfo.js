import React, {Component} from 'react'
// import PropTypes from 'prop-types'
//other
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
//other
import {media} from 'styles/media-queries'
import {MORE_INFO_SHADOW} from 'styles/shadows'
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
  width: 40vw;
  ${media.md`
    width: 70vw;
    `}
  background-color: white;
  ${MORE_INFO_SHADOW}
`



class MoreInfo extends Component {
  // static PropTypes
  render(){
    const size = '20px'
    return(
      <Box size={size}>
        <Popover
          body={<MoreInfoBox><h1>More info:</h1><h2>this is it</h2></MoreInfoBox>}
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
