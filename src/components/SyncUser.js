import React,{Component} from 'react'
import PropTypes from 'prop-types'

import {graphql, compose} from 'react-apollo'
import {USER_QUERY} from '../gql/User/queries'
import {
  UPDATE_USER_MUTATION,
  CREATE_USER_MUTATION,
} from '../gql/User/mutations'

/*
This Component is to be rendered ONLY when a user is logged in ( state.auth.auth0Authenticated = true)
and the user is not Synced with the graphQL api.
User query is performed to check if user exists. If user exists it will return an id otherwise it will
return null.
*/

class SyncUser extends Component {
  static PropTypes = {
    data: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    handleUserSyncSuccess: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }

  userProfile = () =>({ //auth0 user profile
    "email": this.props.profile.email,
    "familyName": this.props.profile.family_name,
    "givenName": this.props.profile.given_name,
    "name": this.props.profile.name,
    "picture": this.props.profile.picture,
    "pictureLarge": this.props.profile.picture_large
  })

  handleUpdateUser = async () =>{
    const options = {
      //api user id  + auth0 profile:
      variables: { id: this.props.data.user.id, ...this.userProfile()}
    }
    try{
      const response = await this.props.updateUserMutation(options)
      if (response.data) {
        const user = response.data.updateUser
        this.props.handleUserSyncSuccess(user.id, user.scorecard.id)
        //dispatches action that marks user as synced and sets apiUserId +
        // apiScorecardId on localStorage and redux state
      }
    }
    catch(error){
      console.log(error)
      this.props.logout()
    }
  }

  handleCreateUser = async () =>{
    const idToken = localStorage.getItem('id_token')
    const options = {
      variables: {idToken, ...this.userProfile(),}
    }
    try{
      const response = await this.props.createUserMutation(options)
      if (response.data.createUser.id) {
        const user = response.data.createUser
        this.props.handleUserSyncSuccess(user.id, user.scorecard.id)
      }
    }
    catch(error){
      console.log(error)
      this.props.logout()
    }
  }

  render(){
    const {data} = this.props

    if (data.loading){
      return(
        <div style={{visibility:"hidden"}}></div>
        //temporary hack needed to move user queries and mutations outside of <Site />
      )
    }
    //update user if user query returns a user
    if (data.user) {
      this.handleUpdateUser()
    }
    //if user query returns null create user:
    else {
      this.handleCreateUser()
    }
    return(
      <div style={{visibility:"hidden"}}></div>
    )
  }
}

const SyncUserApollo = compose(
  graphql(UPDATE_USER_MUTATION, {name: 'updateUserMutation'}),
  graphql(CREATE_USER_MUTATION, {name: 'createUserMutation'}),
  graphql(USER_QUERY, {options: {fetchPolicy: 'network-only'}}),
)(SyncUser)

export default SyncUserApollo
