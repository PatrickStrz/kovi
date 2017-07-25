// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
//apollo
import {graphql} from 'react-apollo'
import {
  CHALLENGE_DETAIL_QUERY,
} from '../gql/Challenge/queries'
//other
import DOMPurify from 'dompurify' //prevents XSS
//components
import GenericError from './commons/GenericError'


export class ChallengeDetail extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }
  render(){
    if (this.props.data.loading){
      return(<p>...Loading</p>)
    }
    if (this.props.data.error){
      return <GenericError error={this.props.data.error} />
    }

    const {id, title, body} = this.props.data.Challenge

    return(
      <div>
        <h1>ChallengeDetail for: {id}</h1>
        <h2>title:{title}</h2>
        <div
          className="content"
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
        />

      </div>
    )
  }
}

const ChallengeDetailApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: ({ id }) => ({ variables: { id } }), // coming from own props
})(ChallengeDetail)

export default ChallengeDetailApollo
