import React from 'react'
import { gql, graphql } from 'react-apollo'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import userWithCards from '../queries/userWithCards'

function CardListContainer({data, onSelect}) {
  const {currentUser, loading} = data
  return (
    <div>
      { loading
      ? <div>loading</div>
      : currentUser
      ? (
        <List>
          <Subheader>Cards assigned to me</Subheader>
          {currentUser.assignedCards.map(({id, name, shortUrl}) => (
            <ListItem
              onClick={() => {onSelect(id)}}
              key={id}
              primaryText={name}
              />
          ))}
        </List>
      )
      : null }
    </div>
  )
}

export default graphql(userWithCards)(CardListContainer)
