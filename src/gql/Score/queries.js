import {gql} from 'react-apollo'
import {levels} from './score-system'

export const COMMUNITY_SCORE_COUNTS_QUERY = gql`
  query {
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
