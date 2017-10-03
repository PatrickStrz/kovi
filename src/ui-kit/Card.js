import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
//helpers+other
import {muiColors, colors} from 'styles/theme/colors'
import {CARD_Z_INDEX} from 'styles/z-index'
//components
import {Image} from 'ui-kit'
import {FaIcon} from 'ui-kit/icons'

const CardBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props =>{
    if (props.highlight){
      return props.highlightColor
    }
    else if (props.backgroundColor) {
      return props.backgroundColor
    }
    else return '#ffffff'
    }
  };
  width:100%;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  font-family: 'Open Sans', sans-serif;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: ${CARD_Z_INDEX};
  margin-bottom: 15px;
  padding-right: 5px;
`

const CardBody = styled.div`
  width: 100%;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
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

const Title = styled.div`
  word-break: break-word;
  font-size: 16px;
  color: ${colors.grey};
  padding: 5px;
`

const IconBox = styled.div`
  position: absolute;
  left: 0%;
  bottom:0%;
  height: 20px;
  width: 20px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 2px;
  background-color: ${colors.lightTeal};
`

export default class Card extends Component{

  static propTypes = {
    imageUrl: PropTypes.string,
    text: PropTypes.string,
    onBodyClick: PropTypes.func,
    actions: PropTypes.node,
    highlight: PropTypes.bool,
    highlightColor: PropTypes.string,
    isLoading:  PropTypes.bool,
    backgroundColor: PropTypes.string,
    onBottomCornerClick: PropTypes.func,
  }

  render(){
    const {
      text,
      onBodyClick,
      actions,
      highlight,
      highlightColor,
      imageUrl,
      backgroundColor,
      onBottomCornerClick,
    } = this.props
    return(
      <CardBox
        highlight={highlight}
        highlightColor={highlightColor}
        backgroundColor={backgroundColor}
        >
        <CardBody>
          <ClickableBox onClick={onBodyClick}>
            <ImageBox onClick={onBodyClick}>
              <Image size="80px" url={imageUrl}/>
            </ImageBox>
            <Title>{text}</Title>
          </ClickableBox>
            {actions}
        </CardBody>
        <IconBox>
          <FaIcon
            faClassName="fa-chevron-down"
            color={colors.white}
            hoverColor={muiColors.secondary1}
            size="15px;"
            onClick={onBottomCornerClick}
          />
        </IconBox>
      </CardBox>
    )
  }
}
