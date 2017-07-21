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
import ChallengeCard from './ChallengeCard'
import ChallengeCreateForm from './ChallengeCreateForm'
import {Row, Col} from 'react-flexbox-grid'
import InfiniteScroll from 'react-infinite-scroll-component'
import DialogOverlay from './DialogOverlay'
import GenericError from './commons/GenericError'
import Editor from './Editor'

class ChallengeList extends Component {
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

    const challengeCards = this.props.allChallenges.map(challenge =>{
      return(
        <Col key={'challengelist'+challenge.id} xs={12}>
          <ChallengeCard
            challenge={challenge}
            apiUserId={this.props.apiUserId}
            allChallengesQueryVariables={this.getAllChallengesQueryVariables()}
          />
        </Col>
      )
    })

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
        <InfiniteScroll
          pageStart={0}
          hasMore={this.props.cursor.length === 0 ? false : true}
          loader={<div className="loader">Loading ...</div>}
          next={()=>this.props.loadMoreEntries()}
         >
          <Col
            xsOffset={1} xs={10}
            smOffset={1} sm={10}
            mdOffset={3} md={6}
            lgOffset={3} lg={6}
          >
            <DialogOverlay
              isOpen={this.props.isCreateViewOpen}
              handleClose={this.props.hideCreateChallengeView}
              title='Create A Challenge'
              repositionOnUpdate={false}
              modal={true}
            >
              {createChallengeForm}
            </DialogOverlay>
            <Row>
            {challengeCards}
            </Row>
          </Col>
        </InfiniteScroll>
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
)(ChallengeList)

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
