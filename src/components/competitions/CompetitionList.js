import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
// import styled from 'styled-components'
//components
import {Link} from 'react-router-dom'

class CompetitionList extends Component {
  static propTypes = {
    competitions: PropTypes.array
  }

  renderCompetitionList = () => {

    const {competitions} = this.props
    return(competitions.map(competition =>{
      return(
        <Link key={'competition'+competition.id} to={`competition/${competition.id}/`} >
          {competition.description}
        </Link>
        )
      })
    )
  }

  render(){
    return(
      <div>
        {this.renderCompetitionList()}
      </div>
    )
  }
}

export default CompetitionList
