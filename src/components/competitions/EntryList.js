import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
// import styled from 'styled-components'
//components
import {Link} from 'react-router-dom'

class EntryList extends Component {
  static propTypes = {
    entries: PropTypes.array,
  }

  renderEntryList = () => {

    const {entries} = this.props
    return(entries.map(entry =>{
      return(
        <Link key={'entry'+entry.id} to={`entry/${entry.id}`}>
          {entry.author.name}
        </Link>
        )
      })
    )
  }

  render(){
    return(
      <div>
        entry list
        {this.renderEntryList()}

      </div>
    )
  }
}

export default EntryList
