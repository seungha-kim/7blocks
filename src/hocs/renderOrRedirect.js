import React from 'react'
import {Redirect} from 'react-router-dom'

export default (predicate, to) => Component => props => (
  predicate(props)
  ? <Component {...props} />
  : <Redirect to={to} />
)
