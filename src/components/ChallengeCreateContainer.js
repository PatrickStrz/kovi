//react
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hideCreateChallengeView, challengeCreated} from '../actions/challenge-actions'
import {handleEditorChange, clearEditor} from '../actions/editor-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  CREATE_CHALLENGE_AND_SCORE_MUTATION,
  UPDATE_CHALLENGE_MUTATION,
} from 'gql/Challenge/mutations'
import {ALL_CHALLENGES_QUERY} from 'gql/Challenge/queries'
import {CHALLENGE_CREATE_SCORE} from '../gql/Score/score-system'
//helpers+other
import {logException} from '../config'
import styled from 'styled-components'
import {colors} from 'styles/theme/colors'
import {media} from 'styles/media-queries'
//components
import Editor from 'ui-kit/Editor'
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
  static propTypes = {
    // redux:
    update: PropTypes.bool.isRequired, // if false renders create form
    handleEditorChange: PropTypes.func.isRequired,
    clearEditor: PropTypes.func.isRequired,
    challengeCreated: PropTypes.func.isRequired,
    hideCreateChallengeView: PropTypes.func.isRequired,
    apiUserId: PropTypes.string.isRequired,
    apiUserScorecardId: PropTypes.string.isRequired,
    editorHtml: PropTypes.string.isRequired,
    defaultValues: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  }

  state = {
    title: "",
    description: "",
    titleError:""
  }

  // componentWillMount() {
  //   const {defaultValues, intitializeChallengeBody} = this.props
  //      if (defaultValues){
  //        this.setState({title:defaultValues.title})
  //        intitializeChallengeBody(defaultValues.body)
  //      }
  //  }

  allChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})

  charMax = 100

  handleCreateChallengeSubmit = async () => {
    const {
      createChallengeAndScoreMutation,
      hideCreateChallengeView,
      clearEditor,
      challengeCreated,
    } = this.props
    const {title} = this.state
    const options = {
      variables: {
        title,
        body: this.props.editorHtml,
        "filter":{ "id": this.props.apiUserId},
        scorecardId: this.props.apiUserScorecardId,
        scoreValue: CHALLENGE_CREATE_SCORE.value,
        authorId: this.props.apiUserId,
      },
      /* updates query in apollo store without performing network request,
      appends to beginning of list: */
      update: (proxy, {data: {createChallenge}}) => {
        const data = proxy.readQuery({
          query: ALL_CHALLENGES_QUERY,
          variables: this.allChallengesQueryVariables()
        })
        data.allChallenges.unshift(createChallenge)
        proxy.writeQuery({
          query:ALL_CHALLENGES_QUERY,
          variables: this.allChallengesQueryVariables(),
          data
        })
      },
    }
    try{
      const response = await createChallengeAndScoreMutation(options)
      this.setState({title:""}) //clear field on success.
      clearEditor()
      hideCreateChallengeView()
      /*
      let other components know which challenge was recently created
      (So user can easily see where their new addition is in a list):
      */
      challengeCreated(response.data.createChallenge.id)
      // scroll to top so user can see newly added challenge:
      window.scrollTo(0,0)
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
      )
    }
  }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleEditorChange,
    clearEditor,
    challengeCreated,
    hideCreateChallengeView,
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    apiUserId: state.app.auth.apiUserId,
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
    editorHtml: state.app.editor.editorHtml,
  }
}

const ChallengeCreateApollo = compose(
  graphql(
    CREATE_CHALLENGE_AND_SCORE_MUTATION,
    {name:"createChallengeAndScoreMutation"}
  ),
  graphql(
    UPDATE_CHALLENGE_MUTATION,
    {name:"updateChallenge"}
  ),
)(ChallengeCreateContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCreateApollo)
