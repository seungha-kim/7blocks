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


export async function newAuth() {
  const loginWindow = window.open(`${API_URL}/auth`)
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

export async function deleteAuth() {
  return axios.delete('/auth')
}
