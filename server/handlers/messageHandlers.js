import { nanoid } from 'nanoid'
import { existsSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Low, JSONFileSync } from 'lowdb'

let adapters = new JSONFileSync('db/messages.json')
let db = new Low(adapters)
await db.read()
let adapterUsers = new JSONFileSync('db/users.json')
let dbUsers = new Low(adapterUsers)
await dbUsers.read()

const _dirname = dirname(fileURLToPath(import.meta.url))

async function readMessages (chatId) {
  const dirPath = join(_dirname, `../db/messages`, chatId)
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true })
  }

  adapters = new JSONFileSync(`${dirPath}/messages.json`)
  db = new Low(adapters)
  await db.read()
  return db.data ||= { messages: [] }
}

export default (io, socket) => {
  const getMessages = async () => {
    const data = await readMessages(socket.chatId)
    data.messages.forEach((message) => {
      const user = dbUsers.data.users.find((elem) => elem.id === message.userId);
      message.userName = user.login;
      message.avatar = user.avatar
    })

    io.in(socket.chatId).emit('messages', data.messages)
  }

  const addMessage = async (message) => {
    const newMessage = {
      messageId: nanoid(8),
      createdAt: new Date(),
      ...message
    }
    db.data.messages.push(newMessage)
    await db.write()
    getMessages()
  }

  const removeMessage = (messageId) => {
    const messageIndex = db.data.messages.findIndex((elem) => elem.id === messageId)
    db.data.messages.splice(messageIndex, 1)
    getMessages()
  }

  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  socket.on('message:remove', removeMessage)
}