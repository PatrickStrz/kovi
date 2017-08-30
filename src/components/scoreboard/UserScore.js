//react+redux
import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {USER_SCORECARD_QUERY} from '../../gql/Scorecard/queries'
import {USER_SCORE_CREATED_SUBSCRIPTION} from '../../gql/Score/subscriptions'
//other
import styled from 'styled-components'
import {logException} from '../../config'
import {muiColors} from 'styles/theme/colors'
//components
import GenericLoader from 'ui-kit/GenericLoader'

const Score = styled.p`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
`

class UserScore extends Component {
  static propTypes = {
    subscribeToScorecardUpdates: PropTypes.func.isRequired, //apollo HOC
    apiUserScorecardId: PropTypes.string, //connect HOC
  }

  componentWillMount() {
       this.props.subscribeToScorecardUpdates()
   }

  render(){
    const {data} = this.props
    if (data.loading){
      return(<GenericLoader text="..."/>)
    }
    if (data.error){
      logException(this.props.data.error, {
      action: "UserScore query in UserScore.js"
      })
    }
    return(
      <Score>
        {this.props.data.Scorecard.total}
      </Score>
    )
  }
}

const UserScoreWithData = graphql(USER_SCORECARD_QUERY,{
  options: (ownProps)=>({
    variables: {
      id: ownProps.apiUserScorecardId,
    },
    fetchPolicy: 'network-only',
  }),
  props: ({ownProps, data}) => {
    return {
      data,
      subscribeToScorecardUpdates: () => {
        return data.subscribeToMore({
          document: USER_SCORE_CREATED_SUBSCRIPTION,
          variables: {id: ownProps.apiUserScorecardId},
          updateQuery: (prev, {subscriptionData}) => {
            if (!subscriptionData.data) {
                return prev
            }
            const newScoreValue = subscriptionData.data.Score.node.value
            const newScorecardTotal = prev.Scorecard.total + newScoreValue
            const newScorecard = {...prev.Scorecard}
            newScorecard.total = newScorecardTotal
            return {
                Scorecard: newScorecard,
            }
          }
        })
      },
    }
  }
})(UserScore)

const mapStateToProps = (state) => {
  return {
    apiUserScorecardId: state.app.auth.apiUserScorecardId,
  }
}

export default connect(mapStateToProps)(UserScoreWithData)
