import React from 'react'

function defaultGetter(props) {
  return props.data.loading
}

export default (getter = defaultGetter) => Component => props => (
  getter(props)
  ? <div>loading...</div>
  : <Component {...props}/>
)
