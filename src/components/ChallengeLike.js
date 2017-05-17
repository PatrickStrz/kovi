import React,{Component} from 'react'
import IconButton from 'material-ui/IconButton'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import {muiColors} from '../lib/theme/colors'
import PropTypes from 'prop-types'

class ChallengeLike extends Component{
  static propTypes = {
    // upvotes: PropTypes.object.isRequired,
  }

  render(){
    // debugger
    return(
      <IconButton
        style = {{paddingTop:50}}
        // onTouchTap={()=>handleLogin()}
        iconStyle={{height:30, width:30}}
      >
        <ThumbUp
          color={muiColors.primary1}
          style = {{paddingTop:40, marginTop:"20px"}}
          color={ this.props.upvotes.length > 0 ? muiColors.secondary1 : "#6f6f6f"}

          hoverColor={muiColors.secondary1}
        />
        { this.props.upvotes.includes("facebook|10154990636666251") ? alert('includes id!') : "#6f6f6f"}

      </IconButton>
    )
  }
}

export default ChallengeLike
