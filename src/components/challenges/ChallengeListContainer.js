import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
//gql
import {graphql} from 'react-apollo'
import {
  ALL_CHALLENGES_QUERY,
  MORE_CHALLENGES_QUERY,
} from 'gql/Challenge/queries'
//helpers+other
import {uniqBy} from 'lodash'
import {logException} from 'config'
//components
import ChallengeList from 'components/challenges/ChallengeList'
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'

class ChallengeListContainer extends Component {
  static propTypes = {
    //apollo
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    allChallenges: PropTypes.array, // apollo
  }

  render(){
    //so can change query variables in one place and pass to child components:
    const allChallengesQueryVariables = {"filter":{ "id": this.props.apiUserId}}

    if (this.props.loading){
      return <GenericLoader text="loading..." />
    }

    if(this.props.error){
      logException(this.props.error, {action: 'query in ChallengeListContainer'})
      return <GenericError />
    }

    return(
        <ChallengeList
          challenges={this.props.allChallenges}
          allChallengesQueryVariables={allChallengesQueryVariables}
          hasMore={this.props.cursor.length === 0 ? false : true}
          loadMoreEntries={()=>this.props.loadMoreEntries()}
        />
      )
    }
  }

const ChallengeListApollo = graphql(
    ALL_CHALLENGES_QUERY, {
      props: ({
        ownProps,
        data: { loading, error, allChallenges, cursor, fetchMore},
      }) => {
        return ({
          error,
          loading,
          allChallenges,
          cursor,
          loadMoreEntries: () => {
            return fetchMore({
              query: MORE_CHALLENGES_QUERY,
              variables: {
                filter:{
                  id: ownProps.apiUserId ? ownProps.apiUserId : '',
                },
                cursor: cursor[0].id,
                querySize: 3,
              },
              updateQuery: ( previousResult, { fetchMoreResult }) => {
                const previousChallenges = previousResult.allChallenges
                const newChallenges = fetchMoreResult.allChallenges
                //prevents adding duplicate when query overlaps with previously
                // manually added entry in apollo cache ( using update).
                const allChallenges = uniqBy(
                  [...previousChallenges, ...newChallenges],
                  'id'
                )
                return {
                  allChallenges,
                  cursor: fetchMoreResult.cursor
                }
              },
            })
          },
        })},
    //query:
      options: (ownProps)=>({
        variables: {
          filter:{
            id: ownProps.apiUserId ? ownProps.apiUserId : '',
          },
        },
        fetchPolicy: 'network-only',
      }),
    },
  )(ChallengeListContainer)

const mapStateToProps = (state) => {
  return {
    apiUserId: state.app.auth.apiUserId,
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
  }
}

export default connect(mapStateToProps)(ChallengeListApollo)
