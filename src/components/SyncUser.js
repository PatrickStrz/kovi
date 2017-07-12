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

  componentWillReceiveProps = (nextProps) => {
    if (this.props.data.loading && !nextProps.data.loading) {
      const profile = this.userProfile(nextProps.profile)
      const props = nextProps
      debugger
      if (nextProps.data.user) {
        debugger
        const userId = nextProps.data.user.id
        this.handleUpdateUser(props, userId,profile)
      }
      else if (nextProps.data.user == null){
        debugger
        this.handleCreateUser(props, profile)
      }
    }
  }

  userProfile = (profile) => ({ //auth0 user profile
    "email": profile.email,
    "familyName": profile.family_name,
    "givenName": profile.given_name,
    "name": profile.name,
    "picture": profile.picture,
    "pictureLarge": profile.picture_large
  })

  handleUpdateUser = async (props, userId, profile) => {
    const options = {
      //api user id  + auth0 profile:
      variables: { id: userId, ...profile}
    }
    try{
      const response = await props.updateUserMutation(options)
      if (response.data) {
        const user = response.data.updateUser
        props.handleUserSyncSuccess(user.id, user.scorecard.id)
        //dispatches action that marks user as synced and sets apiUserId +
        // apiScorecardId on localStorage and redux state
      }
    }
    catch(error){
      console.log(error)
      // props.logout()
    }
  }

  handleCreateUser = async (props, profile) => {
    const idToken = localStorage.getItem('id_token')
    const options = {
      variables: {idToken, ...profile}
    }
    try{
      const response = await props.createUserMutation(options)
      if (response.data.createUser.id) {
        const user = response.data.createUser
        props.handleUserSyncSuccess(user.id, user.scorecard.id)
      }
    }
    catch(error){
      console.log(error)
      // props.logout()
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
