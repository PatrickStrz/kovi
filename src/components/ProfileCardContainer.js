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
import {PROFILE_CARD_SHADOW} from 'styles/shadows'

//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import UserPhoto from 'ui-kit/UserPhoto'
import UserScore from 'components/scoreboard/UserScore'
import {FaIcon} from 'ui-kit/icons'

const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: rgb(255, 255, 255);
  ${PROFILE_CARD_SHADOW}
  padding: 10px;
  min-height: 150px;
  min-width: 270px;
`
const TopBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    margin-left: 10px;
    border-radius: 3px;
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
const LevelBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  width: 100%;
  margin-top: 10px;
  background-color: ${colors.faintTeal};
  border-radius: 3px;
`
const Score = styled.div`
  display: inline-block;
  color: ${muiColors.primary1};
  font-size: 18px;
  margin-right: 5px;
`

const LevelHeading = styled.div`
  margin: 10px;
  display: inline-block;
  font-size: 18px;
  color: ${muiColors.secondary1};
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
      return <OuterBox><GenericLoader text="..." /></OuterBox>
    }
    if (this.props.data.error){

      return <OuterBox><GenericError /></OuterBox>
    }
    const {name, pictureLarge} = this.props.data.User
    return(
      <OuterBox>
        <TopBox>
          <UserPhoto imageUrl={pictureLarge} size="100px" />
          <Body>
            <Name>{name}</Name>
            <ScoreBox>
              {this.renderScore()}
              <FaIcon
                faClassName="fa-star-o"
                color={muiColors.primary1}
                inline={true}
                extraStyles="margin-left: 5px"
              />
            </ScoreBox>
          </Body>
        </TopBox>
        <LevelBox>
          <LevelHeading>
            LEVEL 1 - EXPLORER
        </LevelHeading>
        <FaIcon
          faClassName="fa-binoculars"
          color={muiColors.secondary1}
          inline={true}
          extraStyles="margin-left: 10px;"
        />
        </LevelBox>
      </OuterBox>
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
