import {
  useState,
  useEffect,
  React
} from 'react';
import { useSelector } from 'react-redux';

import { useSocket } from '../../contexts/SocketProvider';

export default function UseChat(chatId) {
  const [lusers, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const username = useSelector((store) => store.currentUser.login)
  const userEmail = useSelector((store) => store.currentUser.email)

  const socket = useSocket();

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
  }, [chatId, userEmail, username])

  const sendMessage = (messageData) => {
    socket.emit('message:add', {
      chatId,
      senderName: username,
      ...messageData
    })
  }

  const removeMessage = (id) => {
    socket.emit('message:remove', id)
  }

  const mountingTag = <></>
  return {
    lusers,
    messages,
    sendMessage,
    removeMessage,
    mountingTag
  }
}
