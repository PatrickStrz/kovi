// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
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

    const {id, title, body, author} = this.props.data.Challenge
    const {apiUserId} = this.props

    return(
      <ChallengeDetail
        id={id}
        title={title}
        body={body}
        apiUserId={apiUserId}
        authorId={author.id}
      />
    )
  }
}

const ChallengeDetailContainerApollo = graphql(
CHALLENGE_DETAIL_QUERY,{
  options: ({ id }) => ({ variables: { id } }), // coming from own props
})(ChallengeDetailContainer)

const mapStateToProps = (state) => ({
  apiUserId: state.app.auth.apiUserId
})

export default connect(mapStateToProps)(ChallengeDetailContainerApollo)
