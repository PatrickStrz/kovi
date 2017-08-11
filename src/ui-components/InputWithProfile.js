import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {muiColors} from 'lib/theme/colors'

import TextareaAutosize from 'react-autosize-textarea';
import Avatar from 'ui-components/Avatar'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`
const Button = styled.a`
	color: ${muiColors.primary1};
  font-size: 14px;
  cursor: pointer;
`
/*
Controlled input with avatar on left side. Component spans the full width
of parent component to change size wrap in a sized element
*/

export default class CommentCreate extends Component {

  static propTypes = {
    avatarImageUrl: PropTypes.string.isRequired,
    avatarSize: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  state = {
    text:'default'
  }

  styles = {
    createComment: {
      border: 'solid 1px rgb(181, 181, 181)',
      borderRadius: '3px',
      fontSize: 14,
      resize: 'none', //to hide resize handle
      marginLeft: 5,
      marginRight: 5,
      width: '100%' //to take up remaining space in parent element
    }
  }

  handleInput = (e) => {
    this.setState({text: e.target.value})
  }

  render(){
    const {avatarImageUrl, avatarSize, placeholder, handleSubmit} = this.props
    return(
      <Container>
        <Avatar size={avatarSize} imageUrl={avatarImageUrl}/>
        <TextareaAutosize
          placeholder={placeholder}
          style={this.styles.createComment}
          onChange={(e)=> this.handleInput(e)}
        />
        <Button onClick={() => handleSubmit()}>Post</Button>
      </Container>
    )
  }
}
