import React, {Component} from 'react'
// import PropTypes from 'prop-types'
//other
import styled, {css} from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'
//other
import {media} from 'styles/media-queries'
import {MORE_INFO_SHADOW} from 'styles/shadows'

const Box = styled.div`
  height: 10px;
  width: 100px;
  padding: 0px;
  border: solid 3px ${muiColors.primary1};
  border-radius: 3px;
  margin: 5px;
`
const Progress = styled.div`
  height: 10px;
  width: ${props => `${props.percent}%`};
  margin: 0px;
  background-color: #00f7f9;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
`

class ProgressMeter extends Component {
  // static PropTypes
  render(){
    const size = '20px'
    return(
      <Box>
        <Progress percent={80} />
      </Box>
    )
  }
}

export default ProgressMeter
