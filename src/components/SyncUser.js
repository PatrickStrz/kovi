import React,{Component} from 'react'
import {graphql, connect} from 'react-apollo'
import {userQuery} from '../queries/user-queries'

class SyncUser extends Component {
  render(){
    if (!this.props.data.loading){
      console.log('loading data')
    return(
      // console.log('return statement')
      <div style={{visibility:"hidden"}}></div>
    )
    }
    return(
      <div style={{visibility:"hidden"}}></div>
    )
  }
}

const SyncUserApollo = graphql(userQuery, {options: {fetchPolicy: 'network-only' }})(SyncUser)

export default SyncUserApollo
