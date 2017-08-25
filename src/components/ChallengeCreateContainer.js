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
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {media} from 'styles/media-queries'
//components
import Editor from 'ui-kit/Editor'
import Dialog from 'ui-kit/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const CharCount = styled.p`
    color: ${props => props.color };
`

const FormBox = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 70%;
  margin-left: 15%;
   ${media.md`
     width:90%;
     margin-left: 5%;
     align-items: left;
     `}
`
const EditorBox = styled.div`
  width:100%
`
const TitleBox = styled.div`
  width:90%;
`
class ChallengeCreateContainer extends Component {
  //so can change query variables in one place and pass to child components:
  state = {
    title: "",
    description: "",
    titleError:""
  }

  allChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})

  charMax = 100

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
      this.setState({title:""}) //clear field on success.
      this.props.hideCreateChallengeView()
      this.props.clearEditor()
    }
    catch(err){
      logException(err, {
      action: "mutation in handleCreateChallengeSubmit in ChallengeList.js"
      })
    }
  }

  setTitleError = (value) => {
    let error = "" // clears error

    if (!value){
      error = "Please write a title"
    }
    if (value.length > (this.charMax)){
      error = "Above character limit"
    }
    this.setState({titleError:error})
  }

  checkRequiredFields = () => {
    const {title} = this.state
    if (!title){
      this.setState({titleError:"title is required"})
    }
  }

  handleTitleChange = e => {
    const {value} = e.target
    this.setState({title: value})
    this.setTitleError(value)
  }

  render(){

    const renderRemainingCharCount = () => {
      const charCount = this.state.title.length
      const remainingChars = this.charMax - charCount
      return(
        <CharCount color={remainingChars < 15 ? "red" : colors.lightGrey}>
          {remainingChars}
        </CharCount>
      )
    }

    /*-------------- render return ----------------*/

    return(
        <Dialog
          isOpen={this.props.isCreateViewOpen}
          handleClose={this.props.hideCreateChallengeView}
          title='Create A Challenge'
          modal={true}
        >
          <FormBox>
            <TitleBox>
              <TextField
                id="challengeCreateTitle"
                fullWidth={true}
                hintText="write a concise title"
                onChange={this.handleTitleChange}
                value={this.state.title}
                errorText={this.state.titleError}
                multiLine={true}
              />
              {renderRemainingCharCount()}
            </TitleBox>
          <br />
            <EditorBox>
              <Editor
                handleChange={this.props.handleEditorChange}
                value={this.props.editorHtml}
              />
            </EditorBox>
            <br/>
            <br/>
            <RaisedButton
              label="submit challenge"
              onClick={this.handleCreateChallengeSubmit}
              primary={true}
              disabled={(this.state.titleError || !this.state.title) && true}
            />
          </FormBox>
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
