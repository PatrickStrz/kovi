import {gql} from 'react-apollo'
import {ENTRY_BODY_FRAGMENT} from './fragments'

export const ENTRY_DETAIL_QUERY = gql`
  query entryDetail($id:ID!){
    Entry(id:$id){
      ...entryBody
    }
  }
  ${ENTRY_BODY_FRAGMENT}
`
