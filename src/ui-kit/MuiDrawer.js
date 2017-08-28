import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'

export default class MuiDrawer extends Component {

  PropTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const {isOpen, children} = this.props

    return (
      <div>
        <Drawer style={{zIndex:10000}} width={200} openSecondary={true} open={this.props.isOpen} >
          <AppBar title="Community" />
          {children}
        </Drawer>
      </div>
    );
  }
}
