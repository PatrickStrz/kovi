import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardBox = styled.div`
  background-color: white;
  width:100%;
  padding: 10px;
  :hover{
    background-color: #f6f0f0;
  }
  cursor: pointer;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 2px;
  z-index: 1;
  margin-bottom: 5px;"
`
const Text = styled.p`
  font-size: 16px;
  color: rgb(75, 75, 75)
`
const ActionsBox = styled.div``

export default class ChallengeCardUi extends Component{

  static propTypes = {
    text: PropTypes.string.isRequired,
    onUpvoteClick: PropTypes.func,
    // actions: PropTypes.array.isRequired,
  }

  render(){

    const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`

    const {text, upvote, onClick} = this.props
    return(
      <CardBox onClick={()=>onClick()}>
        <Text>{lorem}</Text>
        <ActionsBox>
          {upvote}
        </ActionsBox>
      </CardBox>
    )
  }
}
