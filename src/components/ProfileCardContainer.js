// react+redux
import React, {Component} from 'react'
import PropTypes from 'prop-types'
//gql
import {graphql} from 'react-apollo'
import {USER_QUERY} from '../gql/User/queries'
//other
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'

//components
import GenericError from 'ui-kit/GenericError'
import GenericLoader from 'ui-kit/GenericLoader'
import UserPhoto from 'ui-kit/UserPhoto'

const Box = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: top;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  `
const Name = styled.p`
  font-size: 20px;
  color: ${muiColors.primary1};
  margin: 10px;
`

export class ProfileCardContainer extends Component {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      User: PropTypes.object,
    }).isRequired,
  }

  render(){
    if (this.props.data.loading){
      return <Box><GenericLoader text="..." /></Box>
    }
    if (this.props.data.error){

      return <Box><GenericError /></Box>
    }
    const { name, pictureLarge} = this.props.data.User

    return(
      <Box>
        <UserPhoto imageUrl={pictureLarge} size="100px" />
        <Name>{name}</Name>
      </Box>
    )
  }
}

const ProfileCardContainerApollo = graphql(
  USER_QUERY,{
  options: ({ userId }) => ({ variables: {id: userId}}), // coming from own props
})(ProfileCardContainer)

export default ProfileCardContainerApollo
