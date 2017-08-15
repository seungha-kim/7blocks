import React from 'react'
import _axios from 'axios'
import {graphql, compose} from 'react-apollo'

import userWithCards from '../queries/userWithCards'
import renderOrRedirect from '../hocs/renderOrRedirect'
import loadingIndicator from '../hocs/loadingIndicator'

const API_URL = process.env.REACT_APP_API_URL

const axios = _axios.create({
  baseURL: API_URL,
  withCredentials: true
})

export function makeHandler(data) {
  const loginWindow = window.open(`${API_URL}/auth`)
  new Promise((resolve, reject) => {
    function listener(e) {
      console.log(e.origin)
      if (e.data === 'success') {
        console.log('login success')
        resolve()
      } else {
        reject('auth failed')
      }
      loginWindow.close()
      window.removeEventListener('message', listener)
    }
    window.addEventListener('message', listener)
  }).then(() => {
    return data.refetch()
  }) // TODO: catch
}

export async function deleteAuth() {
  return axios.delete('/auth')
}

export default compose(
  graphql(userWithCards),
  loadingIndicator(),
  renderOrRedirect(props => (props.data.currentUser == null), '/')
)(({data}) => (
  <div>
    <button onClick={() => makeHandler(data)}>login</button>
  </div>
))

