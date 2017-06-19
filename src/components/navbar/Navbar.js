import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import AppBar from 'material-ui/AppBar'
import UserIconMenu from './UserIconMenu'
import IconButton from 'material-ui/IconButton'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import {muiColors} from '../../lib/theme/colors'

const Navbar = (props) => {

  const handleTouchTap = () => props.history.push('/')
  const {handleLogin, handleLogout, isAuthenticated, profile} = props

  const styles = {
    title: {
      cursor: 'pointer',
      color: '#3f51b5',
    },
    navbar: {
      backgroundColor:"#ffffff",
      position: "fixed",
      top: 0,
    },
    accountCircleIcon: {
      width: 30,
      height: 30,
    },
  }

  const renderUserControls = () => {
    if (isAuthenticated) {
      return (
        <UserIconMenu picture={profile.picture} handleLogout={handleLogout}/>
      )
    }
    else {
      return (
        // call clear profile
        <IconButton
          onTouchTap={()=>handleLogin()}
          iconStyle={styles.accountCircleIcon}
          tooltip="Login Signup"
        >
          <AccountCircle
            // color={muiColors.primary1}
            color="#363636"
            hoverColor={muiColors.secondary1}
          />
        </IconButton>
      )
    }
  }

  const userControls = renderUserControls()

  return(
    <AppBar
      title={<span style={styles.title}>KOVI</span>}
      onTitleTouchTap={handleTouchTap}
      style={styles.navbar}
      iconElementRight={userControls}
    />
  )
}

Navbar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
}

export default withRouter(Navbar)
