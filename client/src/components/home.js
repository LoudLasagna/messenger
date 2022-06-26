/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  React,
  useState,
  useEffect
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Modal, Button
} from 'react-bootstrap';
import axios from 'axios';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import ChatCreation from './chat/chatCreation';
import UserProfile from './userProfile/userprofile';
import Chat from './chat/chat';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SERVER_URL } from './constants';

function Home() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const userData = useSelector((state) => state.currentUser);
  const isAdmin = userData.rights === 'admin';

  const [showUserProfile, setShowUserProfile] = useState(false);
  const [chats, setChats] = useState([]);

  const [showMenu, setShowMenu] = useState(true);
  const [rotation, setRotation] = useState(0);

  const [showChatModal, setShowChatModal] = useState(false);

  const getChats = () => {
    axios.get(`${SERVER_URL}/get-chats/${userData.id}`)
      .then((response) => {
        if (response.data.chats) {
          setChats(response.data.chats)
        } else console.log('Ошибка получения информации о чатах')
      })
  }

  const ChatOnClick = (clickedChat) => {
    dispatch({
      type: 'CHANGE_CHAT',
      chat: clickedChat
    })
  }

  const handleShow = () => setShowUserProfile(true);
  const handleClose = () => setShowUserProfile(false);

  useEffect(() => {
    getChats()
  }, [])

  const changeShowMenu = () => {
    setShowMenu((v) => !v)
    setRotation((v) => v + 180);
  }

  const deleteChat = (e, id) => {
    e.stopPropagation()
    axios.post(`${SERVER_URL}/remove-chat/${id}`);
  }

  const btnStyle = {
    marginLeft: 'auto',
    borderRadius: '10px',
    height: 30,
    width: 30,
    padding: 0
  }
  return (
    <>
      <div className={isMobile ? 'Chats-container m' : 'Chats-container'} style={showMenu && isMobile ? { left: 0 } : {}}>
        {isMobile ? (
          <div className="Chats-userprofile-container">
            <Link to="/userprofile" className="userprofile-link" onClick={handleShow} title={userData.login} style={{ marginLeft: 50 }}>
              <img className="avatar" src={userData.avatar} alt="av" />
              {userData.login}
            </Link>
            <Button onClick={changeShowMenu} className="mobile-menu-button" style={{ backgroundColor: 'var(--main-color)', border: 'none' }}>
              <FiArrowLeft style={{ transition: '.3s', transform: `rotate(${rotation}deg)` }} />
            </Button>
          </div>
        ) : (
          <div className="Chats-userprofile-container">
            <Link to="/userprofile" className="userprofile-link" onClick={handleShow} title={userData.login}>
              <img className="avatar" src={userData.avatar} alt="av" />
              {userData.login}
            </Link>
          </div>
        )}
        {isAdmin && (
        <div className="Chat" style={{ justifyContent: 'center', backgroundColor: 'var(--main-color)' }} onClick={() => setShowChatModal(true)}>
          Добавить чат
        </div>
        )}
        {
        chats.map((chat) => (
          <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat)}>
            <img src={`${SERVER_URL}${chat.avatar}`} alt="av" className="chat-avatar" />
            {chat.name}
            {chat.admins.find((elem) => elem === userData.email) && <Button variant="btn btn-danger" style={btnStyle} onClick={(e) => deleteChat(e, chat.id)}><FiX style={{ width: 23, height: 23 }} /></Button>}
          </div>
        ))
        }
      </div>
      <Chat />
      <Modal show={showUserProfile} contentClassName="TransparentBackground" onHide={handleClose} centered>
        <UserProfile handleClose={handleClose} />
      </Modal>
      {isAdmin && (
        <Modal show={showChatModal} onHide={() => setShowChatModal(false)} centered>
          <ChatCreation />
        </Modal>
      )}
    </>
  );
}

export default Home;
