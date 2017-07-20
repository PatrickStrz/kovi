import React,{Component} from 'react'
import PropTypes from 'prop-types'
// import Dialog from 'material-ui/Dialog'
// import FlatButton from 'material-ui/FlatButton'
import {muiColors} from '../lib/theme/colors'
// import RaisedButton from 'material-ui/RaisedButton'
import AriaModal from 'react-aria-modal'

export default class Modal2 extends Component {

  static propTypes = {
    // isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    // title: PropTypes.string.isRequired,
  }

  getApplicationNode = () => {
   return document.getElementById('root')
 }

  render() {
    const {isOpen, handleClose, children, title} = this.props

    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary={true}
    //     onTouchTap={this.props.handleClose}
    //   />
    // ]

    return (
      <div>
        <AriaModal
          titleText="demo one"
          onExit={this.props.handleClose}
          // initialFocus="#demo-one-deactivate"
          getApplicationNode={this.getApplicationNode}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <div id="demo-one-modal" className="modal">
            <div className="modal-body" style={{backgroundColor:'white'}}>
              {this.props.children}
            </div>
            <footer className="modal-footer">
              <button id="demo-one-deactivate" onClick={this.props.handleClose}>
                deactivate modal
              </button>
            </footer>
          </div>
        </AriaModal>
      </div>
    )
  }
}
