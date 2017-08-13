import React, {Component} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import TextareaAutosize from 'react-autosize-textarea';
import Avatar from 'ui-components/Avatar'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

/*
input with avatar on left side. Component spans the full width
of parent component to change size wrap in a sized element
*/

export default class CommentCreate extends Component {

  static propTypes = {
    avatarImageUrl: PropTypes.string.isRequired,
    avatarSize: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
  }

  styles = {
    createComment: {
      /* Appearance: none removes inner shadow in iOS */
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      background: 'transparent',
      border: 'solid 1px rgb(181, 181, 181)',
      borderRadius: '3px',
      fontSize: 16,
      resize: 'none', //to hide resize handle
      marginLeft: 5,
      marginRight: 5,
      width: '100%' //to take up remaining space in parent element
    }
  }

  handleChange = (e) => {
      const text = e.target.value
      this.props.handleChange(text)
  }

  render(){
    const {avatarImageUrl, avatarSize, placeholder, value} = this.props
    return(
      <Container>
        <Avatar size={avatarSize} imageUrl={avatarImageUrl}/>
        <TextareaAutosize
          placeholder={placeholder}
          style={this.styles.createComment}
          onChange={(e)=> this.handleChange(e)}
          value={value}
        />
      </Container>
    )
  }
}
