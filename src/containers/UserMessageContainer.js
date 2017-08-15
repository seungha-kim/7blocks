import React from 'react'
import { gql, graphql } from 'react-apollo'

import userWithCards from '../queries/userWithCards'

function CardList({cards}) {
  return (
    <ul>
      {cards.map(({id, name, shortUrl}) => (
        <li key={id}>{name} <a href={shortUrl} target='_blank'>link</a></li>
      ))}
    </ul>
  )
}

function UserMessage({data}) {
  const {currentUser, loading} = data
  return (
    <div>
      { loading
      ? <div>loading</div>
      : currentUser
      ? (
        <CardList cards={currentUser.assignedCards} />
      )
      : null }
    </div>
  )
}

export default graphql(userWithCards)(UserMessage)
