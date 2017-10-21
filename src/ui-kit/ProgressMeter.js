import React, {Component} from 'react'
// import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {colors, muiColors} from 'styles/theme/colors'

class ProgressMeter extends Component {
  // static PropTypes
  render(){
    return(
      <Box>
        <Progress percent={80} />
      </Box>
    )
  }
}

const Box = styled.div`
  height: 10px;
  width: 100px;
  padding: 0px;
  border: solid 3px ${colors.faintGrey};
  border-radius: 3px;
  margin: 5px;
`
const Progress = styled.div`
  height: 10px;
  width: ${props => `${props.percent}%`};
  margin: 0px;
  background-color: ${muiColors.tertiary1};
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
`

export default ProgressMeter
