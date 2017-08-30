import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ReactPopover from 'react-popover'
import {
  POPOVER_Z_INDEX,
  POPOVER_DRAWER_Z_INDEX,
  POPOVER_DIALOG_Z_INDEX
} from 'styles/z-index'

const Box = styled.div`
  cursor: pointer;
  -webkit-tap-highlight-color:transparent;
`

export default class Popover extends Component {

  static propTypes = {
    renderedInDialog: PropTypes.bool,
    renderedInDrawer: PropTypes.bool,
    //clicking on child toggles popover
    children: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired,
  }

  state = {
    open: false
  }

  handleClickChild = () => {
    this.setState({open:!this.state.open})
  }

  /*
  So that popover displays appropriately when rendered in each type of component.
  i.e) if don't close popover and open a modal -> should not display in the modal
  */
  setZindex = () => {
    const {renderedInDrawer, renderedInDialog} = this.props

    if (renderedInDrawer){
      return POPOVER_DRAWER_Z_INDEX
    }
    if (renderedInDialog){
      return POPOVER_DIALOG_Z_INDEX
    }
    else {
      return POPOVER_Z_INDEX
    }
  }

  render(){
    const popoverStyles = {
      fill:'rgb(255, 255, 255)', //tooltip color (tooltip is an svg polygon)
      zIndex:this.setZindex()
    }
    return(
      <ReactPopover style={popoverStyles}
        isOpen={this.state.open}
        body={this.props.body}
      >
        <Box onClick={this.handleClickChild}>
          {this.props.children}
        </Box>
      </ReactPopover>
    )
  }
}
