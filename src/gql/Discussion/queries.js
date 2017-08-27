import {gql} from 'react-apollo'

export const DISCUSSION_QUERY = gql`
  query discussion($id:ID){
    Discussion(id:$id){
      id
      topic
    }
  }
`
