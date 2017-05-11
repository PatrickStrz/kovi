import React,{Component} from 'react'
import ChallengeList from './ChallengeList'

class Home extends Component{
  render(){
    return(
      <div>
        <br/>
        {/* <h2 style={{color:"#002984"}}>Home screen</h2> */}
        <br />
        <ChallengeList />
      </div>
    )
  }
}

export default Home
