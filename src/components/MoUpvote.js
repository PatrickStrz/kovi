import React,{Component} from 'react'
import {graphql, compose} from 'react-apollo'
import PropTypes from 'prop-types'

import mojs from 'mo-js'

class MoUpvote extends Component{
  // state = { upvoteInProgress: false}
  // static propTypes = {
  //   userDidUpvote: PropTypes.array.isRequired,
  //   upvotesCount: PropTypes.number.isRequired,
  //   apiUserId: PropTypes.string,
  //   challengeId: PropTypes.string.isRequired,
  // }


  render(){
    // const styles = {
    //   iconColor: this.props.userDidUpvote.length > 0 ? muiColors.secondary1 : colors.lightGrey,
    //   icon: {
    //     height: 25,
    //     width: 25
    //   },
    //   count: {
    //     position:'relative',
    //     right: 7,
    //     bottom: 4,
    //     fontSize: 14,
    //     color: colors.lightGrey
    //   }
    // }

const root = document.getElementById('root')

  const shape = new mojs.Shape({
  parent: root,
  el: root,
  radius: 50,
  shape: 'circle',
  isShowStart: true,  //displays shape
  stroke:'#00a3ff',
  strokeWidth: 10,
  scale: {0: 4},
  delay: 500,
  easing: 'cubic.out',
  fill: {'#00a3ff':'deeppink'}
}).then({
  scale: 1,
  angle: { [-360] : 0}
}).play()

    return(
    //used span so component can be used inline:
<div>
  {shape}
</div>

    )
  }
}

export default MoUpvote
