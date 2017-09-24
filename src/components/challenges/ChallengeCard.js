//react
import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showProductSolutionForm} from 'actions/product-actions'
//gql
import {graphql, compose} from 'react-apollo'
import {
  ADD_CHALLENGE_UPVOTE_MUTATION,
  REMOVE_CHALLENGE_UPVOTE_MUTATION,
} from 'gql/Challenge/mutations'
// other
import {colors, muiColors} from 'styles/theme/colors'
import styled from 'styled-components'
import {requireAuth} from 'lib/auth'
//components
import Upvote from 'ui-kit/Upvote'
import Card from 'ui-kit/Card'
import {withRouter} from 'react-router'
import SolutionListContainer from 'components/solutions/SolutionListContainer'

const ActionsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`
const Text = styled.p`
  font-size: 14px;
  color: ${colors.lightGrey};
  cursor: pointer;
  margin-left: 25px;
  :hover{
    color: ${muiColors.primary1};
  }
`
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 20px;
  align-items: baseline;
`

class ChallengeCard extends Component {
  static propTypes = {
    challenge: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
      }),
      upvotes: PropTypes.array.isRequired,
      userDidUpvote: PropTypes.array,
    }).isRequired,
    // apollo
    addChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
    removeChallengeUpvoteMutation: PropTypes.func.isRequired, //apollo
    //redux:
    apiUserId: PropTypes.string,
    newUserChallenges: PropTypes.array.isRequired,
    showProductSolutionForm: PropTypes.func,
  }

  state = {
    showSolutions: false
  }

  /*
  check if challenge was created by user in this session
  newUserChallenges is an array of newly created challenge id's from redux store
  */
  isNewlyCreated = (challengeId) => {
    if (this.props.newUserChallenges.indexOf(challengeId) >= 0){
        return true
    }
    else {
      return false
    }
  }

  toggleSolutions = () => {
    this.setState({showSolutions:!this.state.showSolutions})
  }

  showForm = () => {
    const {showProductSolutionForm, challenge} = this.props
    requireAuth(()=>showProductSolutionForm(challenge.id))
  }

  render(){
    const {id, userDidUpvote, title, image} = this.props.challenge
    const upvotesCount = this.props.challenge._upvotesMeta.count
    const {
      apiUserId,
      addChallengeUpvoteMutation,
      removeChallengeUpvoteMutation,
    } = this.props

    const upvoteMutationVariables = {
        "userId": apiUserId ,
        "challengeId": id,
        "filter":{
          "id": apiUserId
        }
      }

    const actions = (
      <ActionsBox>
        <Upvote
          userDidUpvote={userDidUpvote.length > 0 && true}
          apiUserId={apiUserId}
          challengeId={id}
          upvotesCount={upvotesCount}
          style={{paddingBottom:0}}
          addUpvoteMutation={addChallengeUpvoteMutation}
          removeUpvoteMutation={removeChallengeUpvoteMutation}
          mutationVariables={upvoteMutationVariables}
          faIconClassName="fa-bullseye"
        />
      <IconBox>
        <Text onClick={this.toggleSolutions}>
          {this.state.showSolutions ? "Hide" : "Show Solutions" }
        </Text>

        <Text onClick={this.showForm}>
          + Solution
        </Text>
      </IconBox>

      </ActionsBox>
    )

    return(
      <div>
        <Card
          imageUrl={image && image.url}
          highlight={this.isNewlyCreated(id)}
          highlightColor={colors.faintTeal}
          text={title}
          bottomSection={actions}
          onBodyClick={()=> this.props.history.push(`/challenge/${id}`)}
        />
        {this.state.showSolutions && <SolutionListContainer challengeId={id} />}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showProductSolutionForm,
  }, dispatch)
}

const mapStateToProps = (state) => ({
  newUserChallenges: state.app.challenges.newUserChallenges,
  apiUserId: state.app.auth.apiUserId,
})

const ChallengeCardApollo = compose(
  graphql(ADD_CHALLENGE_UPVOTE_MUTATION, {name: "addChallengeUpvoteMutation"}),
  graphql(REMOVE_CHALLENGE_UPVOTE_MUTATION, {name: "removeChallengeUpvoteMutation"}),
)(ChallengeCard)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChallengeCardApollo)
)
