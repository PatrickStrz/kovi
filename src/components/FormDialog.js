import React,{Component} from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'


/**
 * Dialog content can be scrollable.
 */
class FormDialog extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
  }

  state = {
    open: false,
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
          title="Scrollable Dialog"
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent={true}
        >
          {children}
        </Dialog>
      </div>
    )
  }
}

export default FormDialog
