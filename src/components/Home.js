import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {login, logout, requireAuth} from '../lib/auth'


class Home extends Component{

  loggedTest = () => {
    console.log('logggggged in!!')
  }

  render(){
    return(
      <div>
        <button onClick={()=> login()}>Login</button>
        <button onClick={()=>logout()}>Logout</button>
        <br/>
        <button onClick={()=>requireAuth(this.loggedTest)}>Test require auth by clicking this!</button>
        <br/>
        <br />
        <ChallengeList />
      </div>
    )
  }
}

export default Home
