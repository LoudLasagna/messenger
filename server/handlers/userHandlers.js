const users = {
  'ne@ya.ru': {
    avatar: 'gorg',
    login: 'nexman',
    email: 'ne@ya.ru',
    password: 'qwerty',
    online: false
  },
  'ne2ya.eu': {
    avatar: 'danny',
    login: 'nexman2',
    email: 'ne2ya.eu',
    password: 'qwerty',
    online: false
  }
}
  
export default (io, socket) => {
  const getUsers = () => {
    io.in(socket.sessionId).emit('users', users)
  }

  const registerUser = ({ login, userId, encodedPassword }) => {
    if (!users[userId]) {
      users[userId] = { avatar: 'placeholder', login, email: userId, password: encodedPassword, online: true }
    } else {
      users[userId].online = true // нужно выдавать ошибку
    }
  }

  const loginUser = ({ userId, password }) => {
    if (users[userId] && users[userId].password === password) {
      users[userId].online = true
      io.in(socket.sessionId).emit('userData', users[userId]);
    }

    getUsers()
  }
  
  const removeUser = (userId) => {
    users[userId].online = false
    getUsers()
  }
  
  socket.on('user:get', getUsers)
  socket.on('user:login', loginUser)
  socket.on('user:leave', removeUser)
}