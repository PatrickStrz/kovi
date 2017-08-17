import React from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class WarningDialog extends React.Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    actionName: PropTypes.string.isRequired,
    actionInProgress: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }

  render() {
    const {
      isOpen,
      handleClose,
      actionName,
      description,
      handleCompleteAction,
      title,
      actionInProgress
    } = this.props

    const getAction2 = (inProgress) => {
      if (inProgress){
        return <CircularProgress size={20}/>
      }
      else {
        return(<FlatButton
            label={actionName}
            primary={true}
            keyboardFocused={true}
            onTouchTap={handleCompleteAction}
          />
        )
      }
    }

    const getActions = (inProgress) => ([
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
      />,
      getAction2(inProgress)
    ])

    return (
      <div>
        <Dialog
          title={title}
          actions={getActions(actionInProgress)}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
        >
          {description}
        </Dialog>
      </div>
    )
  }
}
