import _axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const axios = _axios.create({
  baseURL: API_URL,
  withCredentials: true
})

let currentUser = null

export function getCurrentUser() {
  return currentUser
}

export function syncAuth() {
  return axios.get('user')
    .then(res => {
      const resJson = res.data
      if (resJson.ok) {
        const {
          displayName,
          email,
          createdAt
        } = resJson.data
        return {
          displayName,
          email,
          createdAt
        }
      } else {
        return null
      }
    })
}

export function newAuth() {
  const loginWindow = window.open(`${API_URL}/login`)
  return new Promise((resolve, reject) => {
    function listener(e) {
      console.log(e.origin)
      if (e.data === 'success') {
        resolve()
      } else {
        reject('auth failed')
      }
      loginWindow.close()
      window.removeEventListener('message', listener)
    }
    window.addEventListener('message', listener)
  })
}

export function deleteAuth() {
  return axios.delete('/login')
}
