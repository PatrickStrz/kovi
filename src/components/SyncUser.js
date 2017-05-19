import React,{Component} from 'react'
import {graphql} from 'react-apollo'
import {userQuery} from '../queries/user-queries'

class SyncUser extends Component {
  render(){
    if (this.props.data.loading){
      console.log('loading data')
      return(
        <div style={{visibility:"hidden"}}></div>
        //temporary hack needed to move user queries and mutations outside of <Site />
      )
    }
    console.log(this.props.data.user.id)
    return(
      <div style={{visibility:"hidden"}}></div>
    )
  }
}

const SyncUserApollo = graphql(userQuery, {options: {fetchPolicy: 'network-only' }})(SyncUser)

export default SyncUserApollo
