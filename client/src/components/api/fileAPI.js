/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { SERVER_URL } from '../constants'

const upload = async ({ file, chatId }) => {
  try {
    const body = new FormData()
    body.append('file', file, file.name)
    const response = await fetch(`${SERVER_URL}/upload`, {
      method: 'POST',
      body,
      headers: {
        'x-chat-id': chatId
      }
    })

    if (!response.ok) throw response

    const pathToFile = await response.json()
    return pathToFile
  } catch (e) {
    throw e
  }
}

const fileApi = { upload }

export default fileApi
