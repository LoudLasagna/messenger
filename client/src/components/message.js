/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import {
  React,
  useState
} from 'react';
import { Modal } from 'react-bootstrap';
import TimeAgo from 'react-timeago'
import { SERVER_URL } from './constants'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Message(props) {
  const {
    userId, userName, avatar, content, createdAt, messageType
  } = props.messageData;
  const { currentUser } = props;
  const contentStyle = { maxWidth: '100%', borderRadius: 10, cursor: 'pointer' }
  const pathToFile = `${SERVER_URL}/files${content}`

  const [showFullScreen, setShowFullScreen] = useState(false);

  let classes = 'Message'

  let element
  let elementFullScreen

  switch (messageType) {
    case 'text':
      element = content
      break
    case 'image':
      element = <a onClick={() => setShowFullScreen(true)}><img src={pathToFile} alt="" style={contentStyle} /></a>
      elementFullScreen = <img src={pathToFile} alt="" />
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
      {messageType === 'image' && <Modal size="xl" centered dialogClassName="picModalDialog" show={showFullScreen} onHide={() => setShowFullScreen(false)}>{elementFullScreen}</Modal>}
    </div>
  );
}
