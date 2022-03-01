/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState, React
} from 'react';
import Chat from './chat';
import 'bootstrap/dist/css/bootstrap.min.css';

let chats = [
  {
    channelId: 1,
    id: '1-1',
    name: 'cunny'
  },
  {
    channelId: 1,
    id: '1-2',
    name: 'test'
  },
  {
    channelId: 1,
    id: '1-3',
    name: 'asdaasdsa'
  },
  {
    channelId: 2,
    id: '2-1',
    name: 'test'
  },
  {
    channelId: 2,
    id: '2-2',
    name: 'asdaasdsa'
  }
]

export default function Channel(props) {
  const { id } = props;

  const [ActiveChat, ChangeActiveChat] = useState(-1);

  const ChatOnClick = (chatId) => {
    ChangeActiveChat(chatId);
  }


  return (
    <>
      <div className="Chats-container">
        { ////// fetch chats
          chats.filter((elem) => elem.channelId === id)
            .map((chat) => (
              <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat.id)}>{chat.name}</div>
            ))
        }
      </div>
      <Chat key={id} id={ActiveChat} />
    </>
  )
}
