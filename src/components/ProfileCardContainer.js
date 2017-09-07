// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
//gql
import {graphql} from 'react-apollo'
import {USER_QUERY} from '../gql/User/queries'
//other
import styled from 'styled-components'
import {muiColors, colors} from 'styles/theme/colors'

//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import UserPhoto from 'ui-kit/UserPhoto'
import UserScore from 'components/scoreboard/UserScore'

const Box = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  `
const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Name = styled.p`
  font-size: 20px;
  color: ${muiColors.primary1};
  margin: 10px;
`

const ScoreBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`
const ScoreHeading = styled.p`
  font-size: 18px;
  color: ${colors.lightGrey};
  margin-right:5px;
`
const Score = styled.p`
  color: ${muiColors.primary1};
  font-size: 18px;
`

export class ProfileCardContainer extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      User: PropTypes.object,
      //redux
      currentUserId: PropTypes.string,
    }).isRequired,
  }

  renderScore = () => {
    const {currentUserId, userId} = this.props
    const scorecardId = this.props.data.User.scorecard.id
    const score = this.props.data.User.scorecard.total
    if(currentUserId === userId){
      /* UserScore is a component with a subscription. So get up to date score
       if user clicks on their own profile: */
      return <UserScore scorecardId={scorecardId} />
    }
    else{
      return <Score>{score}</Score>
    }
  }

  render(){
    if (this.props.data.loading){
      return <Box><GenericLoader text="..." /></Box>
    }
    if (this.props.data.error){

      return <Box><GenericError /></Box>
    }
    const {name, pictureLarge} = this.props.data.User

    return(
      <Box>
        <UserPhoto imageUrl={pictureLarge} size="100px" />
        <Body>
          <Name>{name}</Name>
          <ScoreBox>
            <ScoreHeading>Score:</ScoreHeading>
            {this.renderScore()}
          </ScoreBox>
        </Body>
      </Box>
    )
  }
}

const ProfileCardContainerApollo = graphql(
  USER_QUERY,{
  options: ({ userId }) => ({ variables: {id: userId}}), // coming from own props
})(ProfileCardContainer)

const mapStateToProps = (state) =>({
  currentUserId: state.app.auth.apiUserId,
})

export default connect(mapStateToProps)(ProfileCardContainerApollo)
