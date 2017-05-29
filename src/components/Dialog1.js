import React,{Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Editor from './Editor'
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

// const styles = {
//   radioButton: {
//     marginTop: 16,
//   },
// };

/**
 * Dialog content can be scrollable.
 */
class Dialog1 extends Component {
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {




    return (
      <div>
        <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} />
        <Dialog
          title="Scrollable Dialog"
          // actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          styles={{height:500, width:300}}
        >
          <Editor/>
        </Dialog>
      </div>
    )
  }
}

export default Dialog1
