import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {colors, muiColors} from 'styles/theme/colors'

const height = '20px'

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Meter = styled.div`
  height: ${height};
  width: 100px;
  padding: 0px;
  background-color: ${colors.faintGrey};
  border-radius: 3px;
  margin: 5px;
`

const Percentage = styled.p`
  letter-spacing: 1px;
  color: ${muiColors.primary1};
  font-size: 16px;
`

const Progress = styled.div`
  height: ${height};
  width: ${props => `${props.percent}%`};
  margin: 0px;
  background-color: ${muiColors.tertiary1};
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
`

class ProgressMeter extends Component {
  static propTypes = {
    percent: PropTypes.number.isRequired,
  }
  getPercent = () => {
    const {percent} = this.props
    if (percent > 100){
      return 100
    }
    else {
      return percent
    }
  }
  render(){
    const percent = this.getPercent()
    return(
      <Box>
        <Meter>
        <Progress percent={this.getPercent()} />
        </Meter>
        <Percentage>{percent}%</Percentage>
      </Box>
    )
  }
}

export default ProgressMeter
