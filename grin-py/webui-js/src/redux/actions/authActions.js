// @flow
import { API_URL } from '../../config.js'
import { sha256 } from 'js-sha256'

export const createUser = (username: string, password: string, history: any) => async (dispatch, getState) => {
  try {
    const url = `${API_URL}pool/users`
    const createUserResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username,
        password: sha256(password)
      })
    })
    const createUserData = await createUserResponse.json()
    if (createUserData.username) {
      dispatch(login(username, password, history))
    }
  } catch (e) {
    console.log('Error: ', e)
  }
}

export const login = (username: string, password: string, history) => async (dispatch, getState) => {
  try {
    const hashedPassword = sha256(password)
    const auth = 'Basic ' + Buffer.from(username + ':' + hashedPassword).toString('base64')
    const url = `${API_URL}pool/users`
    const loginResponse = await fetch(url, {
      headers: {
        'Authorization': auth
      }
    })
    const loginData = await loginResponse.json()
    dispatch({ type: 'ACCOUNT', data: { username, token: loginData.token } })
    history.push('/miner')
  } catch (e) {
    console.log('Error: ', e)
  }
}