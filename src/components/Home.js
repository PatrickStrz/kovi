import React,{Component} from 'react'
import ChallengeList from './ChallengeList'

class Home extends Component{
  render(){
    return(
      <div>
        <br/>
        <h1>Home screen</h1>
        <br />
        <ChallengeList />
      </div>
    )
  }
}

export default Home
