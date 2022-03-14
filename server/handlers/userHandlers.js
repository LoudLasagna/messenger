const users = [
  {
    id: 1,
    avatar: "gorg",
    login: 'nexman',
    password: 'qwerty'
  },
  {
    id: 2,
    avatar: "danny",
    login: 'nexman2',
    password: 'qwerty'
  }
]
  
export const registerGetUsers = (io, socket) => {
  const getUsers = () => {
    io.in(socket.roomId).emit('users', users)
  }

  const addUser = ({ username, userId }) => {
    if (!users[userId]) {
      users[userId] = { username, online: true }
    } else {
      users[userId].online = true
    }

    getUsers()
  }
  
  const removeUser = (userId) => {
    users[userId].online = false
    getUsers()
  }
  
  socket.on('user:get', getUsers)
  socket.on('user:add', addUser)
  socket.on('user:leave', removeUser)
}

export const registerTryLogin = (io, socket) => {
  const registerTryLogin = (userId, userObj) => {
    io.in(socket.roomId).emit('userdata', userObj)
  }
}