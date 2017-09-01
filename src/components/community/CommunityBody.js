import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {muiColors} from 'styles/theme/colors'
import styled from 'styled-components'
//components
import TasksContainer from 'components/tasks/TasksContainer'
import CommunityScore from 'components/scoreboard/CommunityScore'

const Header = styled.h3`
  color: white;
`

const HeadingContainer = styled.div`
  background-color: ${muiColors.secondary1};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RightContent = styled.div`
  top:15vh;
  height:76vh;
  position:fixed;
  ${''/* background-color: #ffffff; */}
  width: 20vw;
  right:20px;
  border-radius: 3px;
  overflow-y:auto;
  ::-webkit-scrollbar {
    display: none;
  } /* hides scrollbar*/
`

// component must be rendered inside of a container ( i.e drawer, or panel)
export default class CommunityBody extends Component {
  render(){
    return(
      <div>
        <CommunityScore />
        <HeadingContainer>
        <Header>Community</Header>
        </HeadingContainer>
        <TasksContainer />
      </div>
    )
  }
}
