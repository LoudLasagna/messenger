/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import { useSocket } from '../contexts/SocketProvider'
import useBeforeUnload from './useBeforeUnload'

const SERVER_URL = 'http://localhost:5000'

export default function useChat(chatId) {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [username] = useSelector((store) => store.currentUser.login || '-1')
  const [userEmail] = useSelector((store) => store.currentUser.email || '-1')

  const socket = useSocket();

  useEffect(() => {
    socket.current.on('users', (usrs) => {
      setUsers(usrs)
    })

    socket.current.emit('message:get', { chatId })

    socket.current.on('messages', (msgs) => {
      const newMessages = msgs.map((msg) => (msg.userId === userEmail
        ? { ...msg, currentUser: true }
        : msg
      ))
      setMessages(newMessages)
    })
  }, [chatId, userEmail, username])

  const sendMessage = ({ text }) => {
    socket.current.emit('message:add', {
      chatId,
      senderName: username,
      text
    })
  }

  const removeMessage = (id) => {
    socket.current.emit('message:remove', id)
  }

  /*
  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })
  */

  return {
    users,
    messages,
    sendMessage,
    removeMessage
  }
}
