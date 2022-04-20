/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  React,
  useState,
  useEffect
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { useSocket } from '../contexts/SocketProvider';
import UserProfile from './userprofile';
import cross from '../pics/cross.png';
import Chat from './chat/chat';
import 'bootstrap/dist/css/bootstrap.min.css';


// eslint-disable-next-line no-unused-vars
const lchats = [
  {
    id: '1',
    name: 'arggarh',
    members: [
      'ne@ya.ru',
      'ne2@ya.ru'
    ]
  },
  {
    id: '2',
    name: 'тест2',
    members: [
      'ne@ya.ru',
      'ne2@ya.ru',
      'ne3@ya.ru'
    ]
  },
  {
    id: '3',
    name: 'тест3',
    members: [
      'ne@ya.ru'
    ]
  }
]

// eslint-disable-next-line no-unused-vars
function useChats(userEmail) {
  const [chats, setChats] = useState([])

  const socket = useSocket();

  useEffect(() => {
    socket.on('chats', (chts) => {
      setChats(chts)
    })

    socket.emit('chats:get', { userEmail })
  }, [userEmail])

  const createChat = ({ name, members }) => {
    socket.emit('chats:add', {
      name,
      members
    })
  }

  const removeMessage = (id) => {
    socket.emit('message:remove', id)
  }

  return {
    chats,
    createChat,
    removeMessage
  }
}

function Home() {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.activeChat);
  const userData = useSelector((state) => state.currentUser);

  const [showUserProfile, setShowUserProfile] = useState(false);

  //const chatHook = useChats(userData.email)
  //const { chats } = chatHook;
  //console.log(chats);
  const ChatOnClick = (chatId) => {
    const clickedChat = lchats.find((elem) => elem.id === chatId)
    dispatch({
      type: 'CHANGE_CHAT',
      chat: clickedChat
    })
  }

  const handleShow = () => setShowUserProfile(true);
  const handleClose = () => setShowUserProfile(false);

  return (
    <>
      <div className="Chats-container">
        <div className="Chats-userprofile-container">
          <Link to="/userprofile" className="userprofile-link" onClick={handleShow}>
            <img className="avatar" src={userData.avatar} alt="av" />
            {userData.login}
          </Link>
        </div>
        { ////// fetch chats
          lchats.map((chat) => (
            <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat.id)}>
              <img src={cross} className="chat-avatar" alt="chat-av" />
              {chat.name}
            </div>
          ))
        }
      </div>
      <Chat props={chatData} />
      <Modal show={showUserProfile} onHide={handleClose} centered>
        <UserProfile handleClose={handleClose} />
      </Modal>
    </>
  );
}

export default Home;

