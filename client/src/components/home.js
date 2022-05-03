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
import axios from 'axios';
import UserProfile from './userprofile';
import Chat from './chat/chat';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SERVER_URL } from './constants';

function Home() {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.activeChat);
  const userData = useSelector((state) => state.currentUser);

  const [showUserProfile, setShowUserProfile] = useState(false);

  const [chats, setChats] = useState([]);

  const getChats = () => {
    axios.get(`${SERVER_URL}/get-chats`)
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

  return (
    <>
      <div className="Chats-container">
        <div className="Chats-userprofile-container">
          <Link to="/userprofile" className="userprofile-link" onClick={handleShow}>
            <img className="avatar" src={userData.avatar} alt="av" />
            {userData.login}
          </Link>
        </div>
        {
          chats.map((chat) => (
            <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat)}>
              <img src={chat.avatar} alt="av" className="chat-avatar" />
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

