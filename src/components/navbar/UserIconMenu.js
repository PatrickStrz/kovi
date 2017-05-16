import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'

class UserIconMenu extends Component{
  static propTypes = {
    picture: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }

  state = { open:false }

  handleTouchTap = (event) => {
   // This prevents ghost click.
    event.preventDefault()

   this.setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render(){
  const { picture, handleLogout } = this.props
    return(
      <div >
        <IconButton onTouchTap={this.handleTouchTap} >
          <Avatar
            src={picture}
            size={30}
          />
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          animated={true}
        >
          <Menu>
            <MenuItem primaryText="Log Out" onTouchTap={()=>handleLogout()}/>
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default UserIconMenu
