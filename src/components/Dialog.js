import React,{Component} from 'react'
import PropTypes from 'prop-types'

import {muiColors} from '../lib/theme/colors'
import {DIALOG_Z_INDEX} from '../styles/z-index'
import {XS_MAX} from '../styles/screen-sizes'
import styled from 'styled-components'
//stylesheet to prevent body scroll:
import '../styles/css/react-modal.css'

import Media from 'react-media'
import Modal from 'react-modal'

const Exit = styled.span`
  cursor: pointer;
  font-size: 5vh;
  color: ${muiColors.primary1};
  position: fixed;
`

const ChildrenContainer = styled.div`
  padding-bottom: 5vh;
`

//Wrapper component for react modal:
export default class Dialog extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    // title: PropTypes.string.isRequired,
    modal: PropTypes.bool, //if true, can't close by clicking outside
  }

  static defaultProps = {
    modal: false
  }

  styles = (isMobile) => ({
    overlay : {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(19, 19, 19, 0.75)',
      zIndex: DIALOG_Z_INDEX,
    },
    content : {
      position: 'absolute',
      top: isMobile ? '2vh': '10vh',
      left: isMobile ? 0: '10vh',
      right: isMobile ? 0: '10vh',
      border: '1px solid #ccc',
      background: '#ffffff',
      height: isMobile ? '90vh' : '80vh',
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '3px',
      outline: 'none',
      margin:0,
    }
  })

  //renders responsive modal. matches (boolean) passed from media query component
  // matches = true if viewport is mobile size ( < XS_MAX )
  renderModal = (matches) => {
    const {isOpen, handleClose, children, title, modal} = this.props
    const styles = this.styles(matches)

    return(
      <Modal
        style={styles}
        contentLabel={title}
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={!modal}
      >
        <Exit onClick={()=> handleClose()}>x</Exit>
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
      </Modal>
    )
  }

  render() {
    Modal.setAppElement(root)
    return (
      <Media query={{maxWidth: XS_MAX}}>
         {matches => this.renderModal(matches)}
      </Media>
    )
  }
}
