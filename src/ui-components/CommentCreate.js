import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {colors} from 'lib/theme/colors'

import TextareaAutosize from 'react-autosize-textarea';
import Avatar from 'ui-components/Avatar'

const styles = {
  createComment: {
    width:'50%',
    border: 'solid 1px rgb(181, 181, 181)',
    borderRadius: '3px',
    backgroundColor: colors.faintGrey,
    fontSize: 14,
    resize: 'none', //to hide resize handle
    marginLeft: 5,
  }
}

export default class CommentCreate extends Component {

  static propTypes = {
    avatarImageUrl: PropTypes.string.isRequired,
  }

  state = {
    text:'default'
  }

  handleInput = (e) => {
    this.setState({text: e.target.value})
  }

  render(){
    return(
      <div>
      <Avatar size='20px' imageUrl={this.props.avatarImageUrl}/>
      <TextareaAutosize
        style={styles.createComment}
        onChange={(e)=> this.handleInput(e)}
      />
      </div>
    )
  }
}
