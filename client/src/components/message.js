/* eslint-disable react/destructuring-assignment */
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
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Message(props) {
  const { userId, text, datetime } = props.messageData;
  const { currentUser, senderData } = props;
  return (
    <div className={userId === currentUser ? 'Message UM' : 'Message'}>
      <img className="avatar" alt="a" src={senderData.avatar} />
      <div className="Message-text-container">
        <div className="Message-username">
          {senderData.login}
          <var className="Message-datetime">{datetime ? datetime.toLocaleDateString() : ''}</var>
        </div>
        <div className="Message-text">
          {text}
        </div>
      </div>
    </div>
  );
}
