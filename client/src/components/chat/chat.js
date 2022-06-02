/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  useState,
  React,
  useEffect,
  useRef,
  Fragment
} from 'react';
import {
  Modal
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ChatInfo from './chatInfo';
import { SERVER_URL } from '../constants';

import UseChat from '../../hooks/useChat'
import MessageInput from './messageInput'
import FilePreview from './filePreview';
import Message from '../message';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'emoji-mart/css/emoji-mart.css';

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

  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    setShowInput(true)
    if (activeChat.whoCanWrite === 'admins') {
      setShowInput(false)
      if (activeChat.admins.find((elem) => elem === currentUser.email)) {
        setShowInput(true);
      }
    }
  }, [activeChat])

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
          <img className="avatar" src={`${SERVER_URL}${activeChat.avatar}`} alt="av" />
          {activeChat.name}
        </a>
        )}
      </div>
      <div className="Chat-history" style={showInput ? {} : { height: 'calc(100vh - 80px)' }}>
        {
          // eslint-disable-next-line no-nested-ternary
          activeChat.id
            ? chatHook.messages.length > 0
              ? (chatHook.messages.map((message, index) => {
                const lastMessage = chatHook.messages.length - 1 === index
                return (
                  <Fragment key={message.messageId}>
                    <Message
                      messageData={message}
                      currentUser={currentUser.id}
                    />
                    {lastMessage && <div ref={messagesEnd} />}
                  </Fragment>
                )
              })) : (
                <div className="SampleText"> Будьте первым, написавшим в этот чат!</div>
              )
            : <div className="SampleText"> Выберите чат для начала общения </div>
        }
        {file && fileChatId === activeChat.id && <FilePreview />}
      </div>
      {activeChat.id && showInput && <MessageInput sendMessage={chatHook.sendMessage} />}
      <Modal show={showChatDetails} onHide={handleClose} centered>
        <ChatInfo />
      </Modal>
    </div>
  );
}
