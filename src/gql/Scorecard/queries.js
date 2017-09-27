import {gql} from 'react-apollo'
import {levels} from 'lib/score-system'

export const TOP_SCORERS_QUERY = gql`
  query{
    allScorecards(first:3,orderBy:total_DESC){
      id
      total
      ${levels.one.name}: _scoresMeta(filter:{
        value: ${levels.one.value},
      }){
        count
      }
      ${levels.two.name}: _scoresMeta(filter:{
        value:${levels.two.value},
      }){
        count
      }
      ${levels.three.name}: _scoresMeta(filter:{
        value: ${levels.three.value},
      }){
        count
      }
      user{
        id
        name
        picture
      }
    }
  }
`
