//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
//gql
import {compose,graphql} from 'react-apollo'
import {
  ALL_CHALLENGES_QUERY,
  MORE_CHALLENGES_QUERY,
  ALL_CHALLENGES,
} from '../gql/Challenge/queries'
import {ALL_TASKS_QUERY} from '../gql/Task/queries'
//helpers+other
import {uniqBy} from 'lodash'
import {logException} from '../config'
//components
import ChallengeList from 'components/ChallengeList'
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'

class HomeFeedContainer extends Component {
  render(){
    //so can change query variables in one place and pass to child components:
    const allChallengesQueryVariables = {"filter":{ "id": this.props.apiUserId}}

    if (this.props.allChallengesQuery.loading || this.props.allTasksQuery.loading){
      return <GenericLoader text="loading..." />
    }

    // if(this.props.error){
    //   logException(this.props.error, {action: 'query in ChallengeListContainer'})
    //   return <GenericError />
    // }

    const {allChallengesQuery, allTasksQuery} = this.props

    return(
        <ChallengeList
          challenges={allChallengesQuery.allChallenges}
          allChallengesQueryVariables={allChallengesQueryVariables}
          apiUserId={this.props.apiUserId}
          hasMore={allChallengesQuery.cursor.length === 0 ? false : true}
          loadMoreEntries={()=>allChallengesQuery.loadMoreEntries()}
          tasks={allTasksQuery.allTasks}
        />
      )
    }
  }

const allChallengesQueryOptions = {
  props: ({
    ownProps,
    data: { loading, error, allChallenges, cursor, fetchMore},
  }) => {
    return ({
      allChallengesQuery:{
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
      }
    })},
//query:
  options: (ownProps)=>({
    variables: {
      filter:{
        id: ownProps.apiUserId ? ownProps.apiUserId : '',
      },
    },
    fetchPolicy: 'network-only',
    name: "allChallenges"
  }),
}

const HomeFeedContainerApollo = compose(
  graphql(ALL_CHALLENGES_QUERY, allChallengesQueryOptions),

  graphql(ALL_TASKS_QUERY, {name: 'allTasksQuery'}),
  // graphql(ALL_CHALLENGES, {name: 'allChallengesQuery'}),

)(HomeFeedContainer)

const mapStateToProps = (state) => {
  return {
    apiUserId: state.app.auth.apiUserId,
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
  }
}

export default connect(mapStateToProps)(HomeFeedContainerApollo)
