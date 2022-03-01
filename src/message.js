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
import './App.css';
import gorg from './pics/gorg.jpg';
import danny from './pics/danny.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const userdata = [
  {
    id: 1,
    avatar: gorg,
    login: 'nexman',
    password: 'qwerty'
  },
  {
    id: 2,
    avatar: danny,
    login: 'nexman2',
    password: 'qwerty'
  }
]

const currentUser = 2;

export default function Message(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const { userId, text } = props.messageData;

  return (
    <div className={userId === currentUser ? 'Message UM' : 'Message'}>
      <img className="Message-avatar" alt="a" src={userdata.find((user) => user.id === userId).avatar} />
      <div className="Message-textcontainer">
        <div className="Message-username">{userdata.find((user) => user.id === userId).login}</div>
        <div className="Message-text">
          {text}
        </div>
      </div>
    </div>
  );
}
