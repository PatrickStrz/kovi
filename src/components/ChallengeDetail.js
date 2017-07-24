import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import DialogOverlay from './DialogOverlay'

export default class ChallengeDetail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render(){
    return(
    // <DialogOverlay>
      <h1>ChallengeDetail for: {this.props.id}</h1>

    // </DialogOverlay>
    )
  }
}
