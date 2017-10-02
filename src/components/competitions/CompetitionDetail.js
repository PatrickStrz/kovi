import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import EntryList from 'components/competitions/EntryList'
import CompetitionDetailLayout from 'components/layouts/CompetitionDetailLayout'
import Community from 'components/community/Community'

// const OuterBox = styled.div`
//   display:flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: rgb(255, 155, 136);
// `
// const ContentBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: rgb(149, 206, 233);
// `
const Title = styled.h1`
  text-align: center;
`

class CompetitionDetail extends Component {
  static propTypes = {
    // competition: PropTypes.shape({
    //   id: PropTypes.string.isRequired,
    //   description: PropTypes.string.isRequired,
    //   entries:
    // }).isRequired
  }

  centerPanelContent = () => {
    return(
      <div>
        <Title>Competition namessdajndadjn</Title>
        <EntryList entries={this.props.competition.entries}/>
      </div>
    )
  }

  render(){
    const {entries} = this.props.competition
    return(
      <div>
        <CompetitionDetailLayout
          centerPanelContent={this.centerPanelContent()}
        />
      </div>
    )
  }
}

export default CompetitionDetail
