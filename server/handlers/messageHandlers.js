import { nanoid } from 'nanoid'
import { Low, JSONFileSync } from 'lowdb'

const adapters = new JSONFileSync('db/messages.json')
const db = new Low(adapters)
await db.read()

const lmessages = [
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique, elit vel mollis vestibulum, ante lectus mattis nunc, vel porta lacus ex vel magna. Pellentesque fringilla tortor sit amet leo congue, quis tincidunt magna varius. Nam magna tellus, sodales eu ipsum nec, finibus commodo arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi efficitur dolor lorem, nec egestas arcu euismod sit amet. Curabitur nisi diam, eleifend at tellus eget, vestibulum vehicula magna. Duis a maximus erat, ac bibendum mi. Duis volutpat velit a dapibus molestie. Suspendisse blandit eu diam vel mollis. Nullam pharetra ex eget enim euismod, ac tincidunt erat maximus. Suspendisse maximus in justo a hendrerit. Cras diam orci, consequat vitae rutrum ac, convallis aliquet nibh. Nulla eget ornare nunc. Aenean aliquet quam sit amet tempor vestibulum. Nulla cursus augue eros, ut facilisis neque consectetur nec. Praesent elit metus, lobortis ut ultricies vel, placerat et nibh. Proin tincidunt ipsum vitae urna eleifend, id blandit purus consequat. Fusce varius nibh at tellus semper viverra. Quisque pharetra, dui non ornare molestie, nisi massa sagittis nulla, eget pretium erat risus non quam. Ut ultricies dignissim ligula, in sollicitudin arcu iaculis vitae. Vivamus molestie tempus sapien non volutpat. Nunc consectetur ex eget purus volutpat egestas vel sit amet odio. Donec aliquam nisl et turpis placerat fringilla. Ut ut tortor massa. Suspendisse at massa turpis. Nullam imperdiet id enim a tempor. Donec euismod nibh nec velit sagittis tristique. Fusce euismod malesuada eros ut efficitur. Praesent feugiat orci at lacus dignissim ullamcorper nec dictum lorem. Aenean eget nisi dolor.'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne@ya.ru',
    content: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne2@ya.ru',
    content: 'im just trying to do this shit'
  },
  {
    chatId: '1-1',
    messageType: 'text',
    userId: 'ne2@ya.ru',
    content: 'im just trying to do thsadhgfasojfdjsadasdsadjvgasdasufdasduasl djafdasdfjkfasgab jkjhdsbafkjbjsdbfbjadbf kadsjb fjasdbfkjdfkjsodsafajdfasjfdkjasfdjasfdkjlkasdkjvasjkldvhasvjdjavsdkjvasdjkvaskjvasjkdsavdsakis shit'
  }
]

export default (io, socket) => {
  const getMessages = ({ chatId }) => {
    const messages = lmessages.filter((elem) => elem.chatId === chatId);
    io.in(socket.sessionId).emit('messages', messages)
  }

  const addMessage = (message) => {
    lmessages.push({
      messageId: nanoid(8),
      createdAt: new Date(),
      ...message
    })
    getMessages({ chatId: message.chatId })
  }

  const removeMessage = (messageId) => {
    db.get('messages').remove({ messageId }).write()

    getMessages
  }

  socket.on('message:get', getMessages)
  socket.on('message:add', addMessage)
  socket.on('message:remove', removeMessage)
}