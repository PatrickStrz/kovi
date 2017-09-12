import React,{Component} from 'react'
import PropTypes from 'prop-types'
//redux
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  refetchUserScoreComplete,
} from '../../actions/score-actions'
//gql
import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../../gql/Scorecard/queries'
import {USER_SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import styled from 'styled-components'
import {logException} from '../../config'
import {muiColors} from 'styles/theme/colors'
import {bounceInKeyframes} from 'styles/animations/keyframes'

//components

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  animation: ${bounceInKeyframes} 0.5s;
`

class UserScore extends Component {
  static propTypes = {
    scorecardId: PropTypes.string,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Scorecard: PropTypes.object,
      refetch: PropTypes.func,
    }).isRequired,
  }

  // componentWillMount() {
  //      this.props.subscribeToScorecardUpdates()
  //  }

  componentWillReceiveProps = (nextProps) => {
    /* once component finishes loading data, inital score can be set
    using the value returned from the query
    */
    // if (this.props.data.loading && !nextProps.data.loading) {
    //   const userScore = nextProps.data.Scorecard.total
    //   this.props.initializeUserScore(userScore)
    // }
    const {
      refetchQuery,
      refetchUserScoreComplete,
      data
    } = this.props

    if (nextProps.shouldRefetchUserScore && !this.props.shouldRefetchUserScore) {
      data.refetch()
    }

    else if (this.props.shouldRefetchUserScore){
      refetchUserScoreComplete()
    }
  }

  renderScore = () => {
    return(
      <Score>
        {this.props.data.Scorecard.total}
      </Score>
    )
  }
  render(){
    const {data} = this.props
    if (data.loading){
      return <div></div>
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
    }
    // to have a new render on score change to replay animation
    return(
      <div>
        {/* {animation1 && this.renderScore()}
        {animation2 && this.renderScore()} */}
        {this.renderScore()}
      </div>
    )
  }
}

const UserScoreWithData = graphql(USER_SCORECARD_QUERY,{
  options: (ownProps)=>({
    variables: {
      id: ownProps.scorecardId,
    },
    fetchPolicy: 'network-only',
  }),
 })(UserScore)

const mapStateToProps = (state) => {
  return {
    userScore: state.app.scores.userScore,
    animation1: state.app.scores.userAnimation1,
    animation2: state.app.scores.userAnimation2,
    shouldRefetchUserScore: state.app.scores.shouldRefetchUserScore
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      refetchUserScoreComplete,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScoreWithData)
