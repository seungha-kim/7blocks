import {gql} from 'react-apollo'

export default gql`
  mutation newBlock($cardId: String!, $length: Int!) {
    newBlock(cardId: $cardId, length: $length) {
      id
    }
  }
`
