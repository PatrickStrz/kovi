import React,{Component} from 'react'
import PropTypes from 'prop-types'

import {muiColors, colors} from 'lib/theme/colors'
import {DIALOG_Z_INDEX} from '../styles/z-index'
import {XS_MAX} from '../styles/screen-sizes'
import styled from 'styled-components'
//stylesheet to prevent body scroll:
import '../styles/css/react-modal.css'


import Media from 'react-media'
import Modal from 'react-modal'
import ExitIcon from 'ui-components/icons/ExitIcon'

const ExitBox = styled.div`
  position: fixed;
  right:0px;
  top:0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height:45px;
  width:45px;
  text-align: center;
  background-color: ${muiColors.secondary1};
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
  renderModal = (matches) => {
    const {isOpen, handleClose, children, title, modal} = this.props
    const styles = this.styles(matches)

    return(
      <div>
        <ExitBox>
          <ExitIcon
            color={colors.lightGrey}
            hoverColor={colors.errorRed}
            size={'2x'}
            handleClick={() => handleClose()}
          />
        </ExitBox>
        <Modal
          style={styles}
          contentLabel={title}
          isOpen={isOpen}
          onRequestClose={handleClose}
          shouldCloseOnOverlayClick={!modal}
        >
          {/* <Exit onClick={()=> handleClose()}>x</Exit> */}
          <ChildrenContainer>
            {children}
            <div style={{MarginTop:25, MarginBottom:25}}>No more to see</div>
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
