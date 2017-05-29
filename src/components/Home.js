import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import Dialog1 from './Dialog1'


class Home extends Component{

  render(){
    return(
      <div>
        {/* <Quill /> */}
        <br/>
        <br />
        <Dialog1/>
        <ChallengeList />
      </div>
    )
  }
}

export default Home
