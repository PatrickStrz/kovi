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
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: ${CARD_Z_INDEX};
  margin-bottom: 5px;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
`
const CardBody = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  align-items: left;
`
const HeaderBox = styled.div`
  width: auto;
  cursor: pointer;
  :hover{
    opacity: 0.5;
  }
`

const ImageBox = styled.div`
  :hover{
    opacity: 0.5;
  }
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
    bottomSection: PropTypes.node,
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
  }

  render(){

    const {
      text,
      onBodyClick,
      bottomSection,
      highlight,
      highlightColor,
      imageUrl,
    } = this.props
    return(
      <CardBox highlight={highlight} highlightColor={highlightColor}>
        <ImageBox onClick={onBodyClick}>
          <Image size="80px" url={imageUrl}/>
        </ImageBox>
        <CardBody>
          <HeaderBox onClick={onBodyClick}>
            <Title>{text}</Title>
          </HeaderBox>
          <ActionsBox>
            {bottomSection}
          </ActionsBox>
        </CardBody>
      </CardBox>
    )
  }
}
