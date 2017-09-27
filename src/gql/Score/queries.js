import {gql} from 'react-apollo'
import {levels} from 'lib/score-system'

export const COMMUNITY_SCORE_COUNTS_QUERY = gql`
  query communityScoreCounts{
    ${levels.one.name}: _allScoresMeta(filter:{value: ${levels.one.value}}){
          count
    }
    ${levels.two.name}: _allScoresMeta(filter:{value:${levels.two.value}}){
      count
    }
    ${levels.three.name}: _allScoresMeta(filter:{value: ${levels.three.value}}){
      count
    }
  }
`

export const USER_SCORE_COUNTS_QUERY = gql`
  query userScoreCounts($scorecardId: ID){
    ${levels.one.name}: _allScoresMeta(filter:{
      value: ${levels.one.value},
      scorecard:{id:$scorecardId}

    }){
      count
    }
    ${levels.two.name}: _allScoresMeta(filter:{
      value:${levels.two.value},
      scorecard:{id:$scorecardId}
    }){
      count
    }
    ${levels.three.name}: _allScoresMeta(filter:{
      value: ${levels.three.value},
      scorecard:{id:$scorecardId}
    }){
      count
    }
  }
`
