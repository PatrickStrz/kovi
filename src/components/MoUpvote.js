import React,{Component} from 'react'
// import {graphql, compose} from 'react-apollo'
// import PropTypes from 'prop-types'
import '../styles/css/mo-upvote.css'

import mojs from 'mo-js'

class Burst extends Component{
  // state = { upvoteInProgress: false}
  // static propTypes = {
  //   userDidUpvote: PropTypes.array.isRequired,
  //   upvotesCount: PropTypes.number.isRequired,
  //   apiUserId: PropTypes.string,
  //   challengeId: PropTypes.string.isRequired,
  // }

  state = { finished:''}

  comonentWillRecieveProps(nextProps){
    debugger
    nextProps.isPlay && this.timeline.replay()
  }

  componentDidMount(){
    // debugger
    class Upvote extends mojs.CustomShape {
      getShape(){
        return'<path d="M97.8449132,69.735732 L87.7531017,79.7667494 C86.98304,80.5368111 86.0711384,80.9218362 85.0173697,80.9218362 C83.963601,80.9218362 83.0516995,80.5368111 82.2816377,79.7667494 L50,47.4851117 L17.7183623,79.7667494 C16.9483005,80.5368111 16.036399,80.9218362 14.9826303,80.9218362 C13.9288616,80.9218362 13.01696,80.5368111 12.2468983,79.7667494 L2.15508685,69.735732 C1.3850251,68.9656703 1,68.0436365 1,66.969603 C1,65.8955695 1.3850251,64.9735357 2.15508685,64.2034739 L47.264268,19.1550868 C48.0343297,18.3850251 48.9462313,18 50,18 C51.0537687,18 51.9656703,18.3850251 52.735732,19.1550868 L97.8449132,64.2034739 C98.6149749,64.9735357 99,65.8955695 99,66.969603 C99,68.0436365 98.6149749,68.9656703 97.8449132,69.735732 Z" id=""></path>'
        // return'<path d="M99,53 C99,55.13865 98.2242268,57.0256658 96.6726573,58.661104 L91.9550706,63.3786906 C90.3615667,64.9721945 88.4535841,65.7689345 86.2310655,65.7689345 C83.9666126,65.7689345 82.0795968,64.9721945 80.5699615,63.3786906 L62.0770218,44.9486521 L62.0770218,89.2310655 C62.0770218,91.4116498 61.2907652,93.1833479 59.7182285,94.5462131 C58.1456918,95.9090783 56.2481925,96.5905006 54.0256739,96.5905006 L45.9743261,96.5905006 C43.7518075,96.5905006 41.8543082,95.9090783 40.2817715,94.5462131 C38.7092348,93.1833479 37.9229782,91.4116498 37.9229782,89.2310655 L37.9229782,44.9486521 L19.4300385,63.3786906 C17.9204032,64.9721945 16.0333874,65.7689345 13.7689345,65.7689345 C11.5044816,65.7689345 9.61746583,64.9721945 8.10783055,63.3786906 L3.3902439,58.661104 C1.79674,57.0676001 1,55.1805843 1,53 C1,50.7774814 1.79674,48.8694988 3.3902439,47.2759949 L44.338896,6.32734275 C45.806597,4.77577316 47.6936128,4 50,4 C52.2644529,4 54.1724355,4.77577316 55.7240051,6.32734275 L96.6726573,47.2759949 C98.2242268,48.9114331 99,50.8194157 99,53 Z" id=""></path>'
      }
    }
    const element = document.getElementById('icon1')
    mojs.addShape('upvote', Upvote)
    //target element
    // const elem = document.querySelector('.upvote')
    //element
    const upvote = new mojs.Shape({
      parent: element,
      fill: '#38c1be',
      shape:'upvote',
      scale: { 0: 1 },
      easing: 'elastic.out',
      delay: 300,
      radius: 13
    })
    const burst = new mojs.Burst({
      parent: element,
      radius: { 5: 40},
      angle: 45,
      count: 14,
      timeline: { delay:400 },
      children: {
        radius: 2,
        fill: ['#ff5d62', '#30e4cb',"#188fd2","deepPink"],
        scale: { 1 : 0, easing: 'quad.in' },
        pathScale: [.8, null],
        degreeShift: [13, null],
        duration: [500,600],
        easing: 'quint.out',
      }
    })

    this.timeline = new mojs.Timeline()
    this.timeline.add([upvote,burst])
    this.timeline.replay()
    // this.burst.replay()
  }

  componentWillUnmount(){
    this.timeline.replayBackward()
  }

  render(){
    return(
      <div></div>
    )
  }
}

class MoUpvote extends Component{

  state = { clicked: false }
  render(){
    const styles ={
      position: {
        position:'relative',
        top:30,
      },
    }
    return(
      <div style={styles.position}>
        <div id="icon1" onClick={()=>this.setState({clicked:!this.state.clicked})} className={this.state.clicked ? "icon-container upvote hidden" : "icon-container upvote"}><span className={this.state.clicked ? "fa fa-chevron-up" : "fa fa-chevron-up"}></span></div>
        {this.state.clicked && <Burst/>}
      </div>
    )
  }
}



export default MoUpvote
