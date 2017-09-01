import React,{Component} from 'react'
import PropTypes from 'prop-types'
//lib+other
import {DRAWER_BODY_Z_INDEX, DRAWER_OVERLAY_Z_INDEX} from 'styles/z-index'
//components
import Drawer from 'material-ui/Drawer'

export default class MuiDrawer extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    docked: PropTypes.bool,
    handleClose: PropTypes.func,
  }

  static defaultProps ={
    docked: true
  }

  handleToggle = () => this.setState({open: !this.state.open});

  //called when click away from drawer (onto overlay)
  handleClickAway = () =>{
    this.props.handleClose()
  }

  render() {
    const {isOpen, children, docked} = this.props

    return (
      <div>
        <Drawer
          overlayStyle={{zIndex: DRAWER_OVERLAY_Z_INDEX}}
          containerStyle={{zIndex: DRAWER_BODY_Z_INDEX}}
          openSecondary={true}
          open={isOpen}
          docked={docked}
          onRequestChange={this.handleClickAway}
        >
          {children}
        </Drawer>
      </div>
    )
  }
}
