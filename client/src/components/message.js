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
import { SERVER_URL } from './constants'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Message(props) {
  const {
    userId, userName, avatar, content, createdAt, messageType
  } = props.messageData;
  const { currentUser } = props;
  const contentStyle = { maxWidth: '100%', borderRadius: 10 }
  const pathToFile = `${SERVER_URL}/files${content}`

  let classes = 'Message'

  let element
  switch (messageType) {
    case 'text':
      element = content
      break
    case 'image':
      classes += ' media'
      element = <img src={pathToFile} alt="" style={contentStyle} />
      break
    case 'audio':
      classes += ' media'
      element = <audio src={pathToFile} controls />
      break
    case 'video':
      classes += ' media'
      element = <video src={pathToFile} controls style={contentStyle} />
      break
    default:
      return null
  }

  if (userId === currentUser) classes += ' UM'

  return (
    <div className={classes}>
      <img className="avatar" alt="a" src={avatar} />
      <div className="Message-text-container">
        <div className="Message-username">
          {userName}
          {createdAt && <TimeAgo className="Message-datetime" date={createdAt} />}
        </div>
        <div className="Message-text">
          {element}
        </div>
      </div>
    </div>
  );
}
