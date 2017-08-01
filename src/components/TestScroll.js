import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {showScreen} from '../actions/layout-actions'

const DivTing = styled.div`
  height: 200px;
  width: 800px;
  background-color: rgb(95, 222, 139);
  margin-bottom: 20px;
`

class TestScroll extends Component{
  render(){
    return(
      <div>
        <button onClick={()=> this.props.showScreen()}>Close</button>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
        <DivTing/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      showScreen
    }, dispatch)
}

export default connect(null,mapDispatchToProps)(TestScroll)
