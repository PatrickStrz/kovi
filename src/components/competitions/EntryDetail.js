import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class EntryDetail extends Component {
  static propTypes = {
    entry: PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
      html: PropTypes.string.isRequired,
    }).isRequired
  }
  render(){
    return(
      <div>
        Entry Detail
      </div>
    )
  }
}

export default EntryDetail
