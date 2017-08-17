//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideCreateChallengeView } from '../actions/challenge-actions'
import { handleEditorChange, clearEditor } from '../actions/editor-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  ALL_CHALLENGES_QUERY,
  MORE_CHALLENGES_QUERY,
} from '../gql/Challenge/queries'
import {CREATE_CHALLENGE_AND_SCORE_MUTATION} from '../gql/Challenge/mutations'
import {CHALLENGE_CREATE_SCORE} from '../gql/Score/score-system'
//helpers+other
import {uniqBy} from 'lodash'
import {muiColors} from '../lib/theme/colors'
import {logException} from '../config'
//components
import ChallengeList from 'components/ChallengeList'
import ChallengeCreateForm from './ChallengeCreateForm'
import MaterialDialog from './MaterialDialog'
import GenericError from './commons/GenericError'
import Editor from './Editor'

class ChallengeListContainer extends Component {
  //so can change query variables in one place and pass to child components:
  getAllChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})
  handleCreateChallengeSubmit = async (values) => {
    const {title, description} = values
    const options = {
      variables: {
        title,
        description,
        body: this.props.editorHtml,
        "filter":{ "id": this.props.apiUserId},
        scorecardId: this.props.apiUserScorecardId,
        scoreValue: CHALLENGE_CREATE_SCORE.value,
        authorId: this.props.apiUserId,
      },
      update: (proxy, { data: {createChallenge} }) => {
        const data = proxy.readQuery({
          query: ALL_CHALLENGES_QUERY,
          variables: this.getAllChallengesQueryVariables()
        })
        data.allChallenges.push(createChallenge)
        proxy.writeQuery({
          query:ALL_CHALLENGES_QUERY,
          variables: this.getAllChallengesQueryVariables(),
          data
        })
      },
    }
    try{
      await this.props.createChallengeAndScoreMutation(options)
      this.props.hideCreateChallengeView()
      this.props.clearEditor()
    }
    catch(err){
      logException(err, {
      action: "mutation in handleCreateChallengeSubmit in ChallengeList.js"
      })
    }
  }

  render(){
    if (this.props.loading){
      return(<div>
        <h1 style={{color:muiColors.primary1}}>Loading...</h1>
      </div>)
    }

    if(this.props.error){
      return <GenericError />
    }

    const createChallengeForm = (
      <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit}>
        <Editor
          handleChange={this.props.handleEditorChange}
          value={this.props.editorHtml}
          // placeholder="Give us some body..."
        />
      </ChallengeCreateForm>
    )

    return(
      <div>
        <MaterialDialog
          isOpen={this.props.isCreateViewOpen}
          handleClose={this.props.hideCreateChallengeView}
          title='Create A Challenge'
          repositionOnUpdate={false}
          modal={true}
        >
          {createChallengeForm}
        </MaterialDialog>
        <ChallengeList
          challenges={this.props.allChallenges}
          allChallengesQueryVariables={this.getAllChallengesQueryVariables()}
          apiUserId={this.props.apiUserId}
          hasMore={this.props.cursor.length === 0 ? false : true}
          loadMoreEntries={()=>this.props.loadMoreEntries()}
        />
      </div>
      )
    }
  }

const ChallengeListApollo = compose(
  graphql(
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
  ),

  graphql(
    CREATE_CHALLENGE_AND_SCORE_MUTATION,
    {name:"createChallengeAndScoreMutation"}
  ),
)(ChallengeListContainer)

const mapStateToProps = (state) => {
  return {
    apiUserId: state.app.auth.apiUserId,
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
    isCreateViewOpen: state.app.challenges.isCreateViewOpen,
    editorHtml: state.app.editor.editorHtml,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hideCreateChallengeView,
    handleEditorChange,
    clearEditor,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeListApollo)
