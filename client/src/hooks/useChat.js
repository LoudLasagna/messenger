/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { nanoid } from 'nanoid'
import useLocalstorage from './useLocalStorage'
import useBeforeUnload from './useBeforeUnload'

const SERVER_URL = 'http://localhost:5000'

const useChat = (roomId) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [userId] = useLocalstorage('userId', nanoid(8))
  const [username] = useLocalstorage('username')

  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    socketRef.current.emit('user:add', { username, userId })

    socketRef.current.on('users', (usrs) => {
      setUsers(usrs)
    })

    socketRef.current.emit('message:get')

    socketRef.current.on('messages', (msgs) => {
      const newMessages = msgs.map((msg) => (msg.userId === userId
        ? { ...msg, currentUser: true }
        : msg
      ))
      setMessages(newMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomId, userId, username])

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName
    })
  }

  const removeMessage = (id) => {
    socketRef.current.emit('message:remove', id)
  }

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId)
  })

  return {
    users,
    messages,
    sendMessage,
    removeMessage
  }
}
