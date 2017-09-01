import React,{Component} from 'react'
import styled from 'styled-components'
import {muiColors} from 'styles/theme/colors'
//components
import TasksContainer from 'components/tasks/TasksContainer'
import CommunityScore from 'components/scoreboard/CommunityScore'

const Header = styled.p`
  color: ${muiColors.secondary1};
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  font-size: 20px;
  margin: auto;
`

const HeadingContainer = styled.div`
  background-color: ${muiColors.secondary1};
  background-color: #bff9f7;  ${''/* margin: 5px; */}
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const ScoreContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  border-radius: 3px;
  margin: 15px;
  padding-left: 15px;
  padding-right: 15px;
`

class Community extends Component {
  render(){
    return(
      <div>
        <HeadingContainer>
          <Header>Community</Header>
          <ScoreContainer>
            <CommunityScore />
          </ScoreContainer>
        </HeadingContainer>
        <TasksContainer />
      </div>
    )
  }
}

export default Community
