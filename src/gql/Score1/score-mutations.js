import {gql} from 'react-apollo'

export const createScoreMutation = gql`
  mutation createScore($scorecardId:ID!, $value:Int!){
    createScore(value:$value, scorecardId:$scorecardId){
      id
      value
    }
  }
`
