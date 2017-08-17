import React,{Component} from 'react'
import PropTypes from 'prop-types'

import {muiColors} from 'styles/theme/colors'
import Media from 'react-media'
import {XS_MAX} from '../styles/screen-sizes'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


export default class MaterialDialog extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    modal: PropTypes.bool.isRequired, //if true, can't close by clicking outside
  }

  static defaultProps = {
    modal: false
  }

  styles = {
    title: {
      textAlign: 'center',
      color: muiColors.primary1
    }
  }

  customContentStyle = {
  //width set dynamically in renderModal in response to Media Query
  width: '',
  maxWidth: 'none',
  }

  //renders responsive modal. matches passed from media query component:
  renderModal = (matches) => {
    const {isOpen, handleClose, children, title, modal} = this.props

    this.customContentStyle.width = matches ? '100%' : '70%'

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ]

    return(
      <Dialog
        title={title}
        actions={actions}
        modal={modal}
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
    )
  }

  render() {
    return (
      <Media query={{maxWidth: XS_MAX}}>
         {matches => this.renderModal(matches)}
      </Media>
    )
  }
}
