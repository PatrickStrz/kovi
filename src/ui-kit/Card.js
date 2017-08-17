import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardBox = styled.div`
  background-color: white;
  :hover{
    background-color: #f6f0f0;
  }
  width:100%;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: 1;
  margin-bottom: 5px;"
`
const CardBody = styled.div`
  padding: 10px;
  cursor: pointer;
`
const Text = styled.p`
  font-size: 16px;
  color: rgb(75, 75, 75)
`
const ActionsBox = styled.div`
`

export default class Card extends Component{

  static propTypes = {
    text: PropTypes.string.isRequired,
    onBodyClick: PropTypes.func.isRequired,
    bottomSection: PropTypes.node.isRequired,
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
