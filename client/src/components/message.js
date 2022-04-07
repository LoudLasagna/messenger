/* eslint-disable jsx-a11y/media-has-caption */
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
import TimeAgo from 'react-timeago'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Message(props) {
  const {
    userId, content, createdAt, messageType
  } = props.messageData;
  const { currentUser, senderData } = props;
  const contentStyle = { maxWidth: '100%', borderRadius: 10 }
  const pathToFile = `http://localhost:5000/files${content}`

  let element
  switch (messageType) {
    case 'text':
      element = content
      break
    case 'image':
      element = <img src={pathToFile} alt="" style={contentStyle} />
      break
    case 'audio':
      element = <audio src={pathToFile} controls />
      break
    case 'video':
      element = <video src={pathToFile} controls style={contentStyle} />
      break
    default:
      return null
  }

  return (
    <div className={userId === currentUser ? 'Message UM' : 'Message'}>
      <img className="avatar" alt="a" src={senderData.avatar} />
      <div className="Message-text-container">
        <div className="Message-username">
          {senderData.login}
          {createdAt && <TimeAgo className="Message-datetime" date={createdAt} />}
        </div>
        <div className="Message-text">
          {element}
        </div>
      </div>
    </div>
  );
}
