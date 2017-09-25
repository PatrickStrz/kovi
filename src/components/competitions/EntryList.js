import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
//components
import {Link, Route, withRouter} from 'react-router-dom'
import EntryDetailContainer from 'components/competitions/EntryDetailContainer'


class EntryList extends Component {
  static propTypes = {
    entries: PropTypes.array,
  }

  renderEntryList = () => {

    const {entries, competitionId} = this.props
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

export default withRouter(EntryList)
