import {
  useState,
  useEffect
} from 'react';
import { io } from 'socket.io-client';

import { SERVER_URL } from '../components/constants';

export default function UseChat(chatId) {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const socket = io(
    SERVER_URL,
    { query: { chatId } }
  )

  useEffect(() => {
    socket.on('users', (usrs) => {
      setUsers(usrs)
    })

    socket.emit('message:get', { chatId })

    socket.on('messages', (msgs) => {
      setMessages(msgs)
    })

    return () => socket.disconnect()
  }, [chatId])

  const sendMessage = (messageData) => {
    socket.emit('message:add', {
      chatId,
      ...messageData
    })
  }

  const removeMessage = (id) => {
    socket.emit('message:remove', id)
  }

  return {
    users,
    messages,
    sendMessage,
    removeMessage
  }
}
