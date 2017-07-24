// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//apollo
import {graphql} from 'react-apollo'
import {
  CHALLENGE_DETAIL_QUERY,
  ALL_CHALLENGES,
} from '../gql/Challenge/queries'

export class ChallengeDetail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render(){
    if (this.props.data.loading){
      return(<p>...Loading</p>)
    }
    return(
      <div>
        <h1>ChallengeDetail for: {this.props.id}</h1>
        <h2>title:{this.props.data.Challenge.title}</h2>
      </div>
    )
  }
}

// const ChallengeDetailApollo = graphql(ALL_CHALLENGES)(ChallengeDetail)

const ChallengeDetailApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: ({ id }) => ({ variables: { id } }), // coming from own props
  // name:"CHALLENGE_DETAIL_QUERY"
})(ChallengeDetail)

export default ChallengeDetailApollo
