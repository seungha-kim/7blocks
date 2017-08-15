import React from 'react'
import {compose, graphql} from 'react-apollo'
import {Redirect} from 'react-router'

import userWithCards from '../queries/userWithCards'
import loadingIndicator from '../hocs/loadingIndicator'

function defaultGetter(props) {
  return props.data.currentUser
}

export const LoginScreenIfNullUser = (getter = defaultGetter) => Component => props => (
  getter(props) == null
  ? <Redirect to='/login' />
  : <Component {...props} />
)

export default compose(
  graphql(userWithCards),
  loadingIndicator(),
  LoginScreenIfNullUser()
)
