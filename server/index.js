import cors from 'cors'
import { createServer } from 'http'
import path from 'path'
import { Server } from 'socket.io'
import express from 'express'

import bodyParser from 'body-parser'
import fs from "fs"

import { getFilePath } from './utils/file.js'
import onError from './utils/onError.js'
import upload from './utils/upload.js'

import registerMessageHandler from './handlers/messageHandlers.js'
import registerUsersHandler from './handlers/userHandlers.js'
import registerChatHandler from './handlers/chatHandlers.js'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const jsonParser = bodyParser.json()
const app = express()

const PORT = process.env.PORT || 5000;
const origin = 'http://localhost:3000'

app.use(
  cors({
    origin
  })
)
app.use(express.json())

app.use('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.sendStatus(400)

  // формируем относительный путь к файлу
   const relativeFilePath = req.file.path
    .replace(/\\/g, '/')
    .split('server/files')[1]

  // и возвращаем его
  res.status(201).json(relativeFilePath)
})

app.use('/files', (req, res) => {
  // формируем абсолютный путь к файлу
  const filePath = getFilePath(req.url)

  // и возвращаем файл по этому пути
  res.status(200).sendFile(filePath)
})

app.post('/login', jsonParser, (req, res) => {
  const data = fs.readFileSync('./db/users.json', 'utf8');
  const users = JSON.parse(data).users;

  let user = null;

  const t = users.find((elem) => elem.email === req.body.email && elem.password === req.body.password)
  if (t) {
    user = {
      id: t.id,
      avatar: t.avatar,
      login: t.login,
      email: t.email
    }
  }
  if (user) res.send({ auth: true, user })
  else res.send({ auth: false, errorMessage: 'неверный телефон или пароль' })
})

app.use(onError)

const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin,
    serverClient: false
  }
})

const log = console.log

const onConnection = (socket) => {
  log('User connected')

  const { chatId } = socket.handshake.query
  log('Sid: ' + chatId)
  socket.chatId = chatId
  socket.join(chatId)

  registerMessageHandler(io, socket)
  registerUsersHandler(io, socket)
  registerChatHandler(io, socket)

  socket.onAny((eventName, data) => log(eventName, data))

  socket.on('disconnect', () => {
    log('User disconnected')
      socket.leave(chatId)
  })
}

io.on('connection', onConnection)

httpServer.listen(PORT, () => {
  log(`Server ready. Port: ${PORT}`)
})