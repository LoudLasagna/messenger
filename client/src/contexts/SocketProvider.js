/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()
const SERVER_URL = 'http://localhost:5000'

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
