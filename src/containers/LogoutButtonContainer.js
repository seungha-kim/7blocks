import React from 'react'
import _axios from 'axios'
import {withRouter} from 'react-router-dom'
import {compose, withApollo} from 'react-apollo'

const API_URL = process.env.REACT_APP_API_URL

const axios = _axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export async function deleteAuth() {
  return axios.delete('/auth')
}

function createLogoutHander({client, history}) {
  return async () => {
    await deleteAuth()
    client.resetStore()
    history.push('/login')
  }
}

const TempComponent = ({client, history}) => (
  <button onClick={createLogoutHander({client, history})}>logout</button>
)

export default compose(
  withRouter,
  withApollo
)(TempComponent)
