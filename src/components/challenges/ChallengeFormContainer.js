//react
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  hideCreateChallengeView,
  challengeCreated,
 } from 'actions/challenge-actions'
 import {requestRefetchUserScore} from 'actions/score-actions'
 import {showErrorAlert} from 'actions/alert-actions'
import {handleEditorChange, clearEditor, setEditorValue} from 'actions/editor-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  CREATE_CHALLENGE_AND_SCORE_MUTATION,
  UPDATE_CHALLENGE_MUTATION,
} from 'gql/Challenge/mutations'
import {ALL_CHALLENGES_QUERY} from 'gql/Challenge/queries'
import {CHALLENGE_CREATE_SCORE} from 'lib/score-system'
//helpers+other
import {logException} from 'config'
import styled from 'styled-components'
import {media} from 'styles/media-queries'
//components
import Editor from 'ui-kit/Editor'
import RaisedButton from 'material-ui/RaisedButton'
import {ImageUpload, InputWithCharLimit} from 'ui-kit'

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
    showErrorAlert: PropTypes.func.isRequired,
    apiUserId: PropTypes.string.isRequired,
    apiUserScorecardId: PropTypes.string.isRequired,
    editorHtml: PropTypes.string.isRequired,
  }

  state = {
    title: "",
    description: "",
    imageId:"",
    imageUrl:"",
    titleError:"",
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
      showErrorAlert,
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
        imageId: this.state.imageId,
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

    const submitChallenge = (options) =>{
      if(update){
        /* prevent manual update, apollo takes care of updating store
        automatically for items already in the store: */
        options.update = ''
        options.variables.id = challengeId
        return updateChallengeMutation(options)
      }
      else{
        return createChallengeAndScoreMutation(options)
      }
    }

    try{
      const response = await submitChallenge(options)
      this.setState({title:""}) //clear field on success.
      this.props.requestRefetchUserScore()
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
      const message = update ? "error updating challenge" : "error creating challenge"
      showErrorAlert(message)
      logException(err, {
      action: "mutation in handleChallengeSubmit in ChallengeList.js"
      })
    }
  }

  checkRequiredFields = () => {
    const {title} = this.state
    if (!title){
      this.setState({titleError:"title is required"})
    }
  }

  handleTitleChange = value => {
    this.setState({title: value})
  }

  handleTitleError = errorMsg => {
    if (errorMsg !== this.state.titleError) {
      this.setState({titleError:errorMsg})
    } // prevent infinite loop
  }

  onUpload = (imageId, imageUrl) => {
    this.setState({imageId, imageUrl})
  }

  isDisabled = () => {
    const {titleError, title, imageId} = this.state
    let isDisabled
      if (
        !titleError &&
        title &&
        this.props.editorHtml &&
        imageId
      ){
        isDisabled = false
      }
      else {
        isDisabled = true
      }
    return isDisabled
  }

  render(){
    const {update} = this.props

    /*-------------- render return ----------------*/

    return(
        <FormBox>
          <TitleBox>
            <InputWithCharLimit
              placeholder="Quick description of the challenge"
              onChange={this.handleTitleChange}
              value={this.state.title}
              charMax={60}
              onError={this.handleTitleError}
              required={true}
            />
          </TitleBox>
          <br/>
          <ImageUpload
            onUpload={this.onUpload}
            previewWidth="50px"
            previewHeight="50px"
          />
          <br/>
          <br/>
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
            disabled={this.isDisabled()}
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
    requestRefetchUserScore,
    showErrorAlert,
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

const TitleBox = styled.div`
  width:90%;
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

export default connect(
  mapStateToProps, mapDispatchToProps
)(ChallengeFormContainerApollo)
