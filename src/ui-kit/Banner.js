import React,{Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
//components
import {FaIcon} from 'ui-kit/icons'

const Box = styled.div`
  margin-bottom:25px;
  padding: 15px;
  position:relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${muiColors.primary100};
  border-radius: 3px;
`

const Text = styled.div`
  width: 80%;
  color: ${muiColors.primary1};
  text-align: left;
  line-height: 2;
`

const IconBox = styled.div`
  position:absolute;
  top:5px;
  right:5px;
`

class Banner extends Component {
  static propTypes = {
      onExitClick: PropTypes.func.isRequired,
      text: PropTypes.node.isRequired,
  }

  render(){
    const {text, onExitClick} = this.props
    return(
      <Box>
        <Text>{text}</Text>
        <IconBox>
          <FaIcon
           faClassName="fa-close"
           color={muiColors.primary1}
           size="20px"
           onClick={onExitClick}
         />
        </IconBox>
      </Box>
    )
  }
}

export default Banner
