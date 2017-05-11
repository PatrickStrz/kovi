import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {login, logout} from '../lib/auth'


class Home extends Component{
  render(){
    return(
      <div>
        <button onClick={()=>{
          login()
        }}>Login</button>
        <button onClick={()=>{
          logout()
        }}>Logout</button>
        <br/>
        {/* <h2 style={{color:"#002984"}}>Home screen</h2> */}
        <br />
        <ChallengeList />
      </div>
    )
  }
}

export default Home
