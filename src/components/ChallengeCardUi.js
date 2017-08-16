import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardBox = styled.div`
  background-color: white;
  width:100%;
  border: solid 2px rgb(128, 128, 128);
  border-radius: 3px;
  padding: 10px;
  :hover{
    background-color: #f6f0f0;
  }
  cursor: pointer;
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

    const {text, upvote} = this.props
    return(
      <div>
      <CardBox>
        <Text>{lorem}</Text>
        <ActionsBox>
          {upvote}
        </ActionsBox>
      </CardBox>
      </div>
    )
  }
}
