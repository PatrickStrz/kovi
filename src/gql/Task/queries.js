import {gql} from 'react-apollo'

export const ALL_TASKS_QUERY = gql`
  query allTasks{
    allTasks{
      id
      type
      discussion{
        id
        topic
      }
    }  
  }
`
