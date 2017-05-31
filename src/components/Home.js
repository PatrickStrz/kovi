import React,{Component} from 'react'
import ChallengeList from './ChallengeList'
import {Row} from 'react-flexbox-grid'
class Home extends Component{

  render(){
    return(
      <div>
        <Row>
          <ChallengeList />
        </Row>
      </div>
    )
  }
}

export default Home
