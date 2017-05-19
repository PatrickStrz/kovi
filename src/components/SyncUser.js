import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import {userQuery} from '../queries/user-queries'
import {
  updateUserMutation,
  createUserMutation,
} from '../mutations/user-mutations'

/*
This Component is to be rendered ONLY when a user is logged in ( state.auth.isAuthenticated = true)
and the user is not Synced with the graphQL api.
User query is performed to check if user exists. If user exists it will return an id otherwise it will
return null.
*/

class SyncUser extends Component {
  static PropTypes = {
    data: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    handleUserSyncSuccess: PropTypes.func.isRequired,
  }

  userProfile = { //without id
    "email": this.props.profile.email,
    "familyName": this.props.profile.family_name,
    "givenName": this.props.profile.given_name,
    "name": this.props.profile.name,
    "picture": this.props.profile.picture,
    "pictureLarge": this.props.profile.picture_large
  }

  handleUpdateUser = async () =>{
    const options = {
      variables: { id: this.props.data.user.id, ...this.userProfile}
    }
    const response = await this.props.updateUserMutation(options)

    if (response.data.updateUser.id) {
      this.props.handleUserSyncSuccess(response.data.updateUser.id)
      //dispatches action that marks user as synced and sets apiUserId on localStorage
      // and redux state
    }
  }

  handleCreateUser = async () =>{
    const idToken = localStorage.getItem('id_token')
    const options = {
      variables: {idToken, ...this.userProfile,}
    }
    const response = await this.props.createUserMutation(options)

    if (response.data.createUser.id) {
      this.props.handleUserSyncSuccess(response.data.createUser.id)
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
      // alert(data.user.id)
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
  graphql(updateUserMutation, {name: 'updateUserMutation'}),
  graphql(createUserMutation, {name: 'createUserMutation'}),
  graphql(userQuery, {options: {fetchPolicy: 'network-only'}}),
)(SyncUser)

export default SyncUserApollo
