// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {CHALLENGE_DETAIL_QUERY} from '../gql/Challenge/queries'
//components
import GenericError from 'ui-kit/GenericError'
import ChallengeDetail from 'components/ChallengeDetail'
import GenericLoader from 'ui-kit/GenericLoader'

export class ChallengeDetailContainer extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      Challenge: PropTypes.object,
    }).isRequired,
  }

  render(){
    if (this.props.data.loading){
      return <GenericLoader text="loading..." />
    }
    if (this.props.data.error){
      return <GenericError />
    }

    const {id, title, body} = this.props.data.Challenge

    return(
      <ChallengeDetail id={id} title={title} body={body}  />
    )
  }
}

const ChallengeDetailContainerApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: ({ id }) => ({ variables: { id } }), // coming from own props
})(ChallengeDetailContainer)

export default ChallengeDetailContainerApollo
