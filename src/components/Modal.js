import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {muiColors} from '../lib/theme/colors'
// import RaisedButton from 'material-ui/RaisedButton'

export default class Modal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    open: false,
  }

  styles = {
    title: {
      textAlign: 'center',
      color: muiColors.primary1
    }
  }

  customContentStyle = {
  width: '100%',
  maxWidth: 'none',
  height: '100%'
  }

  render() {
    const {isOpen, handleClose, children, title} = this.props

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ]

    return (
      <div>
        <Dialog
          title={title}
          actions={actions}
          modal={true}
          open={isOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
          titleStyle={this.styles.title}
          contentStyle={this.customContentStyle}
        >
          <div>
            {children}
          </div>
        </Dialog>
      </div>
    )
  }
}
