//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { hideCreateChallengeView } from '../actions/challenge-actions'
import { handleEditorChange, clearEditor } from '../actions/editor-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {CREATE_CHALLENGE_AND_SCORE_MUTATION} from 'gql/Challenge/mutations'
import {ALL_CHALLENGES_QUERY} from 'gql/Challenge/queries'
import {CHALLENGE_CREATE_SCORE} from '../gql/Score/score-system'
//helpers+other
import {logException} from '../config'
//components
import ChallengeCreateForm from './ChallengeCreateForm'
import Editor from 'ui-kit/Editor'
import Dialog from 'ui-kit/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class ChallengeCreateContainer extends Component {
  //so can change query variables in one place and pass to child components:
  state = {
    title: "",
    description: "",
    titleError:""
  }

  allChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})

  charTotal = 100

  handleCreateChallengeSubmit = async () => {
    const {title, description} = this.state
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
          variables: this.allChallengesQueryVariables()
        })
        data.allChallenges.push(createChallenge)
        proxy.writeQuery({
          query:ALL_CHALLENGES_QUERY,
          variables: this.allChallengesQueryVariables(),
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

  // const validate = (title) =>{
  //   const errors = {}
  //   if (!title){
  //     errors.title = 'required'
  //   }
  //   if (!values.text){
  //     errors.text = 'required'
  //   }
  //   return errors
  // }

  titleError = () => {
    const title = this.state.title
    const titleLength = this.state.title.length
    if (titleLength > this.charTotal){
      return "exceeded max"
    }
    else {
      return ""
    }
  }

  handleTitleChange = e => {
    this.setState({title: e.target.value})
    this.setState({titleError: this.titleError()})
  }

  render(){

    const createChallengeForm = (
      <ChallengeCreateForm onSubmit={this.handleCreateChallengeSubmit}>
        <Editor
          handleChange={this.props.handleEditorChange}
          value={this.props.editorHtml}
        />
      </ChallengeCreateForm>
    )
    const renderCharCount = () => {
      const charCount = this.state.title.length
      return(
        <p>{`${charCount}/${this.charTotal}`}</p>
      )
    }

    return(
        <Dialog
          isOpen={this.props.isCreateViewOpen}
          handleClose={this.props.hideCreateChallengeView}
          title='Create A Challenge'
          modal={true}
        >
        <TextField
          hint="write a concise title"
          onChange={this.handleTitleChange}
          value={this.state.title}
          errorText={this.state.titleError}
        />
        {renderCharCount()}
        <Editor
          handleChange={this.props.handleEditorChange}
          value={this.props.editorHtml}
        />
        <br/>
        <RaisedButton label="submit challenge" onClick={this.handleCreateChallengeSubmit}/>
        </Dialog>
      )
    }
  }

const ChallengeCreateApollo = compose(
  graphql(
    CREATE_CHALLENGE_AND_SCORE_MUTATION,
    {name:"createChallengeAndScoreMutation"}
  ),
)(ChallengeCreateContainer)

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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCreateApollo)
