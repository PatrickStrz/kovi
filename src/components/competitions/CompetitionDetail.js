import React, {Component} from 'react'
import PropTypes from 'prop-types'
//other
import styled from 'styled-components'
import {withRouter} from 'react-router'
//components

class CompetitionDetail extends Component {
  static propTypes = {
    competitions: PropTypes.array
  }

  render(){
    const {id} = this.props.match.params
    return(
      <div>
        <h1>competitionDetail for: {id} </h1>
      </div>
    )
  }
}

export default withRouter(CompetitionDetail)
