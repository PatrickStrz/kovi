//react
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  hideCreateChallengeView,
  challengeCreated
 } from '../actions/challenge-actions'
import {handleEditorChange, clearEditor, setEditorValue} from '../actions/editor-actions'
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

/* form for both creating and updating challenges, update prop determines if
    it is used as an update form
*/
class ChallengeFormContainer extends Component {
  //so can change query variables in one place and pass to child components:
  static propTypes = {


    update: PropTypes.bool.isRequired, // if false renders create form
    defaultValues: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
    challengeId: PropTypes.string, // for update
    onUpdateComplete: PropTypes.func,
    /* apollo compose HOC */
    createChallengeAndScoreMutation: PropTypes.func.isRequired,
    /* redux connect HOC */
    handleEditorChange: PropTypes.func.isRequired,
    clearEditor: PropTypes.func.isRequired,
    challengeCreated: PropTypes.func.isRequired,
    hideCreateChallengeView: PropTypes.func.isRequired,
    setEditorValue: PropTypes.func.isRequired,
    apiUserId: PropTypes.string.isRequired,
    apiUserScorecardId: PropTypes.string.isRequired,
    editorHtml: PropTypes.string.isRequired,

  }

  state = {
    title: "",
    description: "",
    titleError:""
  }

  componentWillMount() {
    const {defaultValues, setEditorValue} = this.props
       if (defaultValues){
         this.setState({title:defaultValues.title})
         setEditorValue(defaultValues.body)
       }
   }

   componentWillUnmount() {
     this.props.setEditorValue('')
   }

  allChallengesQueryVariables = () => ({"filter":{ "id": this.props.apiUserId}})

  charMax = 100

  // adjusts based on update prop:
  handleChallengeSubmit = async () => {
    const {
      createChallengeAndScoreMutation,
      hideCreateChallengeView,
      clearEditor,
      challengeCreated,
      update,
      challengeId,
      updateChallengeMutation,
      onUpdateComplete,
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
      // const updateArgs
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

    const submitChallenge = (options) =>{
      if(update){
        /* prevent manual update, apollo takes care of updating store
        automatically for items already in the store: */
        options.update = ''
        options.variables.id = challengeId
        updateChallengeMutation(options)
      }
      else{
        createChallengeAndScoreMutation(options)
      }
    }

    try{
      const response = await submitChallenge(options)
      this.setState({title:""}) //clear field on success.
      clearEditor()
      /*
      if created let other components know which challenge was recently created
      (So user can easily see where their new addition is in a list):
      */
      if (update) {
        onUpdateComplete()
      }
      if(!update){
        challengeCreated(response.data.createChallenge.id)
        hideCreateChallengeView()
        window.scrollTo(0,0)
      }
      // scroll to top so user can see newly added challenge:
    }
    catch(err){
      logException(err, {
      action: "mutation in handleChallengeSubmit in ChallengeList.js"
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
    const {update} = this.props
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
            label={update ? "update" : "submit challenge"}
            onClick={this.handleChallengeSubmit}
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
    setEditorValue,
  }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    apiUserId: state.app.auth.apiUserId,
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
    editorHtml: state.app.editor.editorHtml,
  }
}

const ChallengeFormContainerApollo = compose(
  graphql(
    CREATE_CHALLENGE_AND_SCORE_MUTATION,
    {name:"createChallengeAndScoreMutation"}
  ),
  graphql(
    UPDATE_CHALLENGE_MUTATION,
    {name:"updateChallengeMutation"}
  ),
)(ChallengeFormContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeFormContainerApollo)
