import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {CARD_Z_INDEX} from 'styles/z-index'

const CardBox = styled.div`
  background-color: white;
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
  cursor: pointer;
  :hover{
    opacity: 0.5;
  }
`
const Text = styled.p`
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
    text: PropTypes.string.isRequired,
    onBodyClick: PropTypes.func.isRequired,
    bottomSection: PropTypes.node,
  }

  render(){

    const {text, onBodyClick, bottomSection} = this.props
    return(
      <CardBox>
        <CardBody onClick={onBodyClick}>
          <Text>{text}</Text>
        </CardBody>
        <ActionsBox>
          {bottomSection}
        </ActionsBox>
      </CardBox>
    )
  }
}
