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
import {USER_SCORE_COUNTS_QUERY} from 'gql/Score/queries'
//other
import styled from 'styled-components'
import {logException} from '../../config'
import {muiColors} from 'styles/theme/colors'
import {bounceInKeyframes} from 'styles/animations/keyframes'
import {calculateTotalScore, levels} from 'lib/score-system'

// styled components:

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  animation: ${bounceInKeyframes} 0.5s;
`

// default component

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
  state = {
    animation1: true,
    animation2: false,
  }
  componentWillReceiveProps = (nextProps) => {
    /*
    requestRefetchUserScore action creator is called from other components which
    sets the shouldRefetchUserScore state to true. If refetch is successfull
    need to reset that piece of state to false.
    */
    const {
      refetchUserScoreComplete,
      data
    } = this.props

    if (this.props.data[levels.one.name] && nextProps.data[levels.one.name]){
      const currentScore = calculateTotalScore(this.props.data)
      const nextScore = calculateTotalScore(nextProps.data)
      if (currentScore !== nextScore){
        this.setState({
          animation1:!this.state.animation1,
          animation2:!this.state.animation2
        })
      }
    }

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
        {calculateTotalScore(this.props.data)}
      </Score>
    )
  }
  render(){
    const {animation1, animation2} = this.state
    const {data} = this.props
    if (data.loading){
      return <div></div>
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
    }
    /* animation 1 & 2 used to rerender the entire Score component on prop
     changes to rerun css animations: */
    return(
      <div>
        {animation1 && this.renderScore()}
        {animation2 && this.renderScore()}
      </div>
    )
  }
}

const UserScoreWithData = graphql(USER_SCORE_COUNTS_QUERY,{
  options: (ownProps)=>({
    variables: {
      scorecardId: ownProps.scorecardId,
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
