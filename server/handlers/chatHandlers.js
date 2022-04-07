import { nanoid } from 'nanoid'
import { Low, JSONFileSync } from 'lowdb'

const adapters = new JSONFileSync('db/messages.json')
const db = new Low(adapters)
await db.read()

const users = {
  'ne@ya.ru': {
    avatar: 'gorg',
    login: 'nexman',
    email: 'ne@ya.ru',
    password: 'qwerty',
    online: false,
    chats: [
      '1-1',
      '1-2',
      '1-3'
    ]
  },
  'ne2ya.eu': {
    avatar: 'danny',
    login: 'nexman2',
    email: 'ne2ya.eu',
    password: 'qwerty',
    online: false,
    chats: [
      '1-1',
      '1-2'
    ]
  },
  'ne3ya.eu': {
    avatar: 'danny',
    login: 'nexman3',
    email: 'ne3ya.eu',
    password: 'qwerty',
    online: false,
    chats: [
      '1-2'
    ]
  }
}

const chats = {
  '1-1': {
    name: 'arggarh',
    members: [
      'ne@ya.ru',
      'ne2@ya.ru'
    ]
  },
  '1-2': {
    name: 'тест2',
    members: [
      'ne@ya.ru',
      'ne2@ya.ru',
      'ne3@ya.ru'
    ]
  },
  '1-3': {
    name: 'тест3',
    members: [
      'ne@ya.ru'
    ]
  }
}

export default (io, socket) => {
  const getChats = ({ userEmail }) => {
    const uchats = users[userEmail].chats;
    const lchats = [];
    uchats.forEach((element) => {
      lchats.push({ id: element, ...chats[element] })
    });
    io.in(socket.sessionId).emit('chats', lchats)
  }

  const createChat = ({ name, members }) => {
    const id = nanoid(16)
    chats[id] = {
      name,
      members
    }
    getChats({ userEmail: socket.sessionId })
  }


  const removeChat = ({ chatId }) => {
    chats[chatId] = {}

    getChats({ userEmail: socket.sessionId })
  }

  socket.on('chats:get', getChats)
  socket.on('chats:add', createChat)
  socket.on('chats:remove', removeChat)
}