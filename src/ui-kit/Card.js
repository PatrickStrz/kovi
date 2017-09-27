import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {CARD_Z_INDEX} from 'styles/z-index'
//components
import {Image} from 'ui-kit'

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props =>{
    return props.highlight ? props.highlightColor : `#ffffff`
    }
  };
  width:100%;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  font-family: 'Open Sans', sans-serif;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: ${CARD_Z_INDEX};
  margin-bottom: 5px;
  padding-right: 5px;
`

const CardBody = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
`
const ClickableBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover{
    opacity: 0.5;
  }
`

const ImageBox = styled.div`
  margin: 10px;
`

const Title = styled.p`
  word-break: break-all;
  font-size: 16px;
  color: ${colors.medGrey};
`
const ActionsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
`

export default class Card extends Component{

  static propTypes = {
    imageUrl: PropTypes.string,
    text: PropTypes.string.isRequired,
    onBodyClick: PropTypes.func.isRequired,
    actions: PropTypes.node,
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
  }

  render(){
    const {
      text,
      onBodyClick,
      actions,
      highlight,
      highlightColor,
      imageUrl,
    } = this.props
    return(
      <CardBox highlight={highlight} highlightColor={highlightColor}>
        <CardBody>
          <ClickableBox onClick={onBodyClick}>
            <ImageBox onClick={onBodyClick}>
              <Image size="90px" url={imageUrl}/>
            </ImageBox>
            <Title>{text}</Title>
          </ClickableBox>
            {actions}
        </CardBody>
      </CardBox>
    )
  }
}
