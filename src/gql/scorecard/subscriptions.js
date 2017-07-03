import {gql} from 'react-apollo'

// export const UPDATE_USER_SCORECARD_SUBSCRIPTION = gql`
//   subscription updateUserScorecard($id:ID){
//     Scorecard(filter:{
//       mutation_in:[UPDATED],
//       node:{id:$id}
//     }){
//       mutation
//       node{
//         total
//       }
//     }
//   }
// `

export const UPDATE_USER_SCORECARD_SUBSCRIPTION = gql`
  subscription {
    Scorecard(filter:{
      mutation_in:[UPDATED],
      node:{id:"cj4h3bqcawi170155j6btqg1i"}
    }){
      mutation
      node{
        total
      }
    }
  }
`
