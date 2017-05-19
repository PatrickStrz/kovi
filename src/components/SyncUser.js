import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {graphql, compose} from 'react-apollo'
import {userQuery} from '../queries/user-queries'
import {userUpdateMutation} from '../mutations/user-mutations'

//Only render if User authenticated and userSynced: false
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
      // refetchQueries: [{ query: allChallengesQuery}]
    }
    const updateUserMutation = await this.props.updateUserMutation(options)
    debugger
    this.props.handleUserSyncSuccess()
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
    if (data.user.id) {
      this.handleUpdateUser()
      // alert(data.user.id)
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
