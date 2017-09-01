import React,{Component} from 'react'
import PropTypes from 'prop-types'
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
  ${''/* color: white; */}
`

const HeadingContainer = styled.div`
  background-color: ${muiColors.secondary1};
  background-color: #bff9f7;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Community extends Component {
  render(){
    // const {isCommunityMobileOpen} = this.props
    return(
      <div>
        <HeadingContainer>
          <Header>Community</Header>
        </HeadingContainer>
        <CommunityScore />
        <TasksContainer />
      </div>
    )
  }
}

export default Community
