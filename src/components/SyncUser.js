import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import {userQuery} from '../queries/user-queries'
import {userUpdateMutation} from '../mutations/user-mutations'

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

  updateUser = () =>{
    this.props.updateUserMutation()
  }

  render(){
    const { data, profile, handleUserSyncSuccess} = this.props
    // when user sync completes set api_user_id
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

// const SyncUserApollo = graphql(userQuery, {options: {fetchPolicy: 'network-only' }})(SyncUser)
const SyncUserApollo = compose(
  graphql(userUpdateMutation, {name:"updateUserMutation"}),
  graphql(userQuery, {options: {fetchPolicy: 'network-only' }})
)(SyncUser)


export default SyncUserApollo
