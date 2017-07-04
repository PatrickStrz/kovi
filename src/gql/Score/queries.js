import {gql} from 'react-apollo'
import {levels} from './score-system'

export const COMMUNITY_SCORE_COUNTS_QUERY = gql`
  query {
    fifty: _allScoresMeta(filter:{
      value: ${levels.one.value}
    }){
          count
    }
    hundred: _allScoresMeta(filter:{value:100}){
          count
    }
    hundredfifty: _allScoresMeta(filter:{value:
  150}){
          count
    }
  }
`
