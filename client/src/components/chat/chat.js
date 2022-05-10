/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState,
  React,
  useEffect,
  useRef,
  Fragment
} from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// eslint-disable-next-line no-unused-vars
import UseChat from '../../hooks/useChat'
import MessageInput from './messageInput'
import FilePreview from './filePreview';
import Message from '../message';
import gorg from '../../pics/gorg.jpg';
import danny from '../../pics/danny.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'emoji-mart/css/emoji-mart.css';

const users = [
  {
    id: '1',
    avatar: gorg,
    login: 'nexman',
    password: 'qwerty'
  },
  {
    id: '2',
    avatar: danny,
    login: 'nexman2',
    password: 'qwerty'
  }
]

export default function Chat() {
  const activeChat = useSelector((store) => store.activeChat);
  const currentUser = useSelector((store) => store.currentUser);
  const file = useSelector((store) => store.file);
  const fileChatId = useSelector((store) => store.fileChatId);
  const chatHook = UseChat(activeChat.id);

  const messagesEnd = useRef(null);
  const [showChatDetails, setShowChatDetails] = useState(false);
  const handleClose = () => setShowChatDetails(false);
  const handleShow = () => setShowChatDetails(true);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom()
  }, [messagesEnd.current, activeChat.id])

  return (
    <div className="Chat-elements-container">
      <div className="Chat-info-container">
        {activeChat.id
        && (
        <a onClick={handleShow} className="Chat-info-link">
          <img className="avatar" src={activeChat.avatar} alt="av" />
          {activeChat.name}
        </a>
        )}
      </div>
      <div className="Chat-history" style={{ height: '100vh' }}>
        {
          // eslint-disable-next-line no-nested-ternary
          activeChat.id
            ? chatHook.messages.length > 0
              ? (chatHook.messages.map((message, index) => {
                const lastMessage = chatHook.messages.length - 1 === index
                return (
                  <Fragment key={index}>
                    <Message
                      messageData={message}
                      currentUser={currentUser.id}
                      senderData={users.find((elem) => elem.email === message.email)}
                    />
                    {lastMessage && <div ref={messagesEnd} />}
                  </Fragment>
                )
              })) : (
                <div className="SampleText"> You can be the first one to write in this chat! Dont miss this opportunity</div>
              )
            : <div className="SampleText"> Select a chat to start a conversation! </div>
        }
        {file && fileChatId === activeChat.id && <FilePreview />}
      </div>
      { activeChat.id && activeChat.id !== '-1' && (<MessageInput sendMessage={chatHook.sendMessage} />) }
      <Modal show={showChatDetails} onHide={handleClose} centered>
        <Modal.Header style={{ borderBottom: '1px solid #323842' }} closeButton className="info-container">
          <img src={activeChat.avatar} style={{ height: 100, width: 100 }} alt="av" className="avatar" />
          {activeChat.name}
        </Modal.Header>
        <Modal.Body className="info-container" style={{ borderTop: 'none' }}>
          {activeChat.description}
        </Modal.Body>
        <Modal.Footer className="info-container" style={{ borderTop: '1px solid #323842' }} />
      </Modal>
    </div>
  );
}
