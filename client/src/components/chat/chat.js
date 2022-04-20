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
import { io } from 'socket.io-client';
import { SERVER_URL } from '../constants';

// eslint-disable-next-line no-unused-vars
import UseChat from '../hooks/useChat'
import MessageInput from './messageInput'
import FilePreview from './filePreview';
import Message from '../message';
import gorg from '../../pics/gorg.jpg';
import danny from '../../pics/danny.jpg';
import cross from '../../pics/cross.png';
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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

// eslint-disable-next-line no-unused-vars
function luseChat(chatId) {
  const [lusers, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const username = useSelector((store) => store.currentUser.login)
  const userEmail = useSelector((store) => store.currentUser.email)

  const socket = io(
    SERVER_URL,
    { query: { chatId } }
  )
  useEffect(() => {
    socket.on('users', (usrs) => {
      setUsers(usrs)
    })

    socket.emit('message:get', { chatId })

    socket.on('messages', (msgs) => {
      const newMessages = msgs.map((msg) => (msg.userId === userEmail
        ? { ...msg, currentUser: true }
        : msg
      ))
      setMessages(newMessages)
    })
  }, [chatId, userEmail, username])

  const sendMessage = ({ text }) => {
    socket.emit('message:add', {
      chatId,
      senderName: username,
      text
    })
  }

  const removeMessage = (id) => {
    socket.emit('message:remove', id)
  }

  return {
    lusers,
    messages,
    sendMessage,
    removeMessage
  }
}

export default function Chat() {
  const activeChat = useSelector((store) => store.activeChat);
  const currentUserId = useSelector((store) => store.currentUser.id);
  const file = useSelector((store) => store.file);

  const chatHook = UseChat(activeChat.id);

  const messagesEnd = useRef(null);
  const [showChatDetails, setShowChatDetails] = useState(false);
  const handleClose = () => setShowChatDetails(false);
  const handleShow = () => setShowChatDetails(true);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messagesEnd.current])

  // {file && <FilePreview width={windowDimensions.width} />}

  return (
    <div className="Chat-elements-container">
      <div className="Chat-info-container">
        {activeChat.id
        && (
        <a onClick={handleShow}>
          <img className="avatar" src={cross} alt="av" />
          {activeChat.name}
        </a>
        )}
      </div>
      <div className="Chat-history" style={{ height: windowDimensions.height }}>
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
                      currentUser={currentUserId}
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
        {file && <FilePreview />}
      </div>
      {
        // eslint-disable-next-line no-nested-ternary
        activeChat.id && activeChat.id !== '-1'
          && (<MessageInput sendMessage={chatHook.sendMessage} />)
      }
      <Modal show={showChatDetails} onHide={handleClose} centered>
        <Modal.Header closeButton className="info-container">
          <Modal.Title>{activeChat.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="info-container">Woohoo, youre reading this text in a modal!</Modal.Body>
        <Modal.Footer className="info-container" />
      </Modal>
    </div>
  );
}
