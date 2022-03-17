/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  React
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import cross from '../pics/cross.png';
import Chat from './chat';
import 'bootstrap/dist/css/bootstrap.min.css';


let chats = [
  {
    id: '1-1',
    name: 'arggarh',
    avatar: cross,
    members: [
      1,
      2
    ]
  },
  {
    id: '1-2',
    name: 'тест2',
    avatar: cross,
    members: [
      1,
      2,
      3
    ]
  },
  {
    id: '1-3',
    name: 'тест3',
    avatar: cross,
    members: [
      1,
      2
    ]
  }
]


function Home() {
  const dispatch = useDispatch();
  const chatData = useSelector((state) => state.activeChat);
  const userData = useSelector((state) => state.currentUser);

  const ChatOnClick = (chatId) => {
    const clickedChat = chats.find((elem) => elem.id === chatId)
    dispatch({
      type: 'CHANGE_CHAT',
      chat: clickedChat
    })
  }

  return (
    <>
      <div className="Chats-container">
        <div className="Chats-userprofile-container">
          <Link to="/userprofile" className="userprofile-link">
            <img className="avatar" src={userData.avatar} alt="av" />
            {userData.login}
          </Link>
        </div>
        { ////// fetch chats
            chats.map((chat) => (
              <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat.id)}>
                <img src={cross} className="chat-avatar" alt="chat-av" />
                {chat.name}
              </div>
            ))
          }
      </div>
      <Chat props={chatData} />
    </>
  );
}

export default Home;

