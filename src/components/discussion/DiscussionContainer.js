//react+redux
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {DISCUSSION_QUERY} from 'gql/Discussion/queries'
//helpers+other
import {logException} from 'config'
//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'

class DiscussionContainer extends Component{
  static propTypes = {
    discussionId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      discussion: PropTypes.object,
    }).isRequired, // apollo
  }

  render(){
    const data = this.props.data // apollo client data

    if (data.loading){
      return(<GenericLoader text="Loading..."/>)
    }
    if (data.error){
      logException(data.error, {
        action: "DISCUSSION_QUERY query in DiscussionContainer"
      })
      return(
        <GenericError/>
      )
    }
    return(
      <h2>{data.Discussion.topic}</h2>
    )
  }
}

const DiscussionApollo =
  graphql(
    DISCUSSION_QUERY,{
      options: ({discussionId}) => ({variables: {id:discussionId}})
    })(DiscussionContainer)

export default DiscussionApollo
