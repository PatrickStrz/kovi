import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {login} from '../lib/auth-helpers'


class Home extends Component{
  render(){
    return(
      <div>
        <button onClick={()=>{
          login()
        }}>Login</button>
        <br/>
        {/* <h2 style={{color:"#002984"}}>Home screen</h2> */}
        <br />
        <ChallengeList />
      </div>
    )
  }
}

export default Home
