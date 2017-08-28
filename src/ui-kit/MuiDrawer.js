import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

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
        <Drawer width={300}
          openSecondary={true}
          open={isOpen}
          docked={docked}
          onRequestChange={this.handleClickAway}
        >
          <AppBar title="Community" />
          {children}
        </Drawer>
      </div>
    )
  }
}
