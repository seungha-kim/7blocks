import {gql} from 'react-apollo'

export default gql`
  query userWithCards {
    currentUser {
      email
      assignedCards {
        id
        name
        shortUrl
      }
    }
  }
`
