/* eslint-disable react/prop-types */
/*
import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { SERVER_URL } from '../components/constants'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState({})

  const newSocket = io(
    SERVER_URL,
    { query: { sessionId: id } }
  )
  useEffect(() => {
    setSocket(newSocket)
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
*/
