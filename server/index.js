import { createServer } from 'http'
import { Server } from "socket.io";
import registerMessageHandler from './handlers/messageHandlers.js'
import { registerGetUsers } from './handlers/userHandlers.js'

const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const log = console.log

const onConnection = (socket) => {
  log('User connected')
    
  const { roomId } = socket.handshake.query
  socket.roomId = roomId
  socket.join(roomId)

  registerMessageHandler(io, socket)
  registerGetUsers(io, socket)

  socket.on('disconnect', () => {
    log('User disconnected')
      socket.leave(roomId)
  })
}

io.on('connection', onConnection)

const PORT = process.env.PORT || 5000
httpServer.listen(PORT, () => {
  console.log(`Server ready. Port: ${PORT}`)
})