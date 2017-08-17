import React,{Component} from 'react'
import PropTypes from 'prop-types'

import {muiColors, colors} from 'styles/theme/colors'
import {DIALOG_Z_INDEX} from 'styles/z-index'
import {XS_MAX} from 'styles/screen-sizes'
import styled, {css} from 'styled-components'
//stylesheet to prevent body scroll:
import 'styles/css/react-modal.css'


import Media from 'react-media'
import Modal from 'react-modal'
import ExitIcon from 'ui-kit/icons/ExitIcon'

const ExitBox = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${props =>{
    if (props.isMobile){
      return css`
        background-color: rgb(69, 69, 69);
        height: 45px;
        width: 45px;
        right: 0px;
        top: 20px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      `
    }
    else {
      return css`
        background-color: white;
        height: 45px;
        width: 45px;
        right: 2vh;
        top: 2vh;
        border-radius: 50%;
      `
      }
    }
  }
  opacity: 80%;
  overflow: auto;
  z-index: 1000
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
      // position: 'fixed'  --> prevents scrolling body when forcefully scroll
      // past bottom
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(19, 19, 19, 0.75)',
      zIndex: DIALOG_Z_INDEX,
    },
    content : {
      position: 'absolute',
      top: isMobile ? 0: '10vh',
      left: isMobile ? 0: '10vh',
      right: isMobile ? 0: '10vh',
      border: '1px solid #ccc',
      background: '#ffffff',
      height: isMobile ? '100vh' : '80vh',
      overflow: 'scroll',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '3px',
      outline: 'none',
      margin:0,
    }
  })

  //renders responsive modal. matches (boolean) passed from media query component
  // matches = true if viewport is mobile size ( < XS_MAX )
  renderModal = (isMobile) => {
    const {isOpen, handleClose, children, title, modal} = this.props
    const styles = this.styles(isMobile)
    /*
    using 2 click handlers below to make exit smoother on mobile ( can clicK
    on icon or container to close) :
    */
    return(
      <div>
        <ExitBox isMobile={isMobile} onClick={()=> handleClose()}>
          <ExitIcon
            color={colors.lightGrey}
            hoverColor={muiColors.primary1}
            size={'2x'}
            onClick={()=> handleClose()}
          />
        </ExitBox>
        <Modal
          style={styles}
          contentLabel={title}
          isOpen={isOpen}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={!modal}
        >
          <ChildrenContainer>
            {children}
          </ChildrenContainer>
        </Modal>
      </div>
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
