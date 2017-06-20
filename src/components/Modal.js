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
    children: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {
    open: false,
  }

  styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      textAlign: 'center',
      color: muiColors.primary1
    }
  }

  render() {
    const {isOpen, handleClose, children} = this.props

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
          title="Create A Challenge"
          actions={actions}
          modal={true}
          open={isOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
          titleStyle={this.styles.title}
        >
          <div style={this.styles.container}>
            {children}
          </div>
        </Dialog>
      </div>
    )
  }
}

// export default Modal
