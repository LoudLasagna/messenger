import { createServer } from 'http'
import path from 'path'
import { Server } from 'socket.io'
import express from 'express'
import registerMessageHandler from './handlers/messageHandlers.js'
import registerUsersHandler from './handlers/userHandlers.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'


const PORT = process.env.PORT || 5000;
const httpServer = createServer()

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
/*

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(express.static(path.join(__dirname, '..', 'db')))

const server = createServer(app)
const io = new Server(server);


const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})
*/

const log = console.log

const onConnection = (socket) => {
  log('User connected')
    
  const { sessionId } = socket.handshake.query
  console.log('Sid: ' + sessionId)
  socket.sessionId = sessionId
  socket.join(sessionId)

  registerMessageHandler(io, socket)
  registerUsersHandler(io, socket)

  socket.on('disconnect', () => {
    log('User disconnected')
      socket.leave(sessionId)
  })
}

io.on('connection', onConnection)

httpServer.listen(PORT, () => {
  log(`Server ready. Port: ${PORT}`)
})