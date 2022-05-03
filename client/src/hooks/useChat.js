import {
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { SERVER_URL } from '../components/constants';

export default function UseChat(chatId) {
  const [lusers, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const userEmail = useSelector((store) => store.currentUser.email)

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
      const newMessages = msgs.map((msg) => (msg.userId === userEmail
        ? { ...msg, currentUser: true }
        : msg
      ))
      setMessages(newMessages)
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
    lusers,
    messages,
    sendMessage,
    removeMessage
  }
}
