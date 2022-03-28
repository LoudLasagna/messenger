/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import {
  useState, React, useEffect, useRef
} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Picker } from 'emoji-mart';
import { FiSend } from 'react-icons/fi';
import { GrEmoji } from 'react-icons/gr';

import { useSocket } from '../contexts/SocketProvider';
import Message from './message';
import gorg from '../pics/gorg.jpg';
import danny from '../pics/danny.jpg';
import cross from '../pics/cross.png';
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

function useChat(chatId) {
  const [lusers, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  const [username] = useSelector((store) => store.currentUser.login || '-1')
  const [userEmail] = useSelector((store) => store.currentUser.email || '-1')

  const socket = useSocket();

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
    console.log(
      chatId,
      username,
      text
    );
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

  const chatHook = useChat(activeChat.id);
  // console.log(chatHook);

  const messagesEnd = useRef(null);
  const [showChatDetails, setShowChatDetails] = useState(false);
  const handleClose = () => setShowChatDetails(false);
  const handleShow = () => setShowChatDetails(true);

  const [userInput, ChangeInput] = useState('');

  const [showEmoji, setShowEmoji] = useState(false);
  const handleEmojiShow = () => {
    setShowEmoji((v) => !v)
  }
  const handleEmojiSelect = (e) => {
    // eslint-disable-next-line no-shadow
    ChangeInput(userInput + e.native)
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const HandleInput = (event) => {
    event.preventDefault();
    event.stopPropagation();
    ChangeInput(event.target.value);
  }

  const HandleSubmit = (event) => {
    ChangeInput('');
    chatHook.sendMessage({ text: userInput })

    scrollToBottom();
    event.preventDefault();
    event.stopPropagation();
  }

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
            ? chatHook.messages.filter((elem) => elem.chatId === activeChat.id).length > 0
              ? (chatHook.messages.map((message, index) => (
                <Message
                  ref={index === chatHook.messages.length - 1 ? messagesEnd : null}
                  key={index}
                  messageData={message}
                  currentUser={currentUserId}
                  senderData={users.find((elem) => elem.email === message.email)}
                />
              )))
              : (
                <div className="SampleText"> You can be the first one to write in this chat! Dont miss this opportunity</div>
              )
            : <div className="SampleText"> Select a chat to start a conversation! </div>
        }
      </div>
      {
        // eslint-disable-next-line no-nested-ternary
        activeChat.id && activeChat.id !== '-1'
          && (
          <Form className="Chat-input-container" onSubmit={HandleSubmit}>
            <Button variant="primary" type="button" onClick={handleEmojiShow}>
              <GrEmoji />
            </Button>
            <Form.Control type="text" className="Chat-input" value={userInput} onChange={HandleInput} />
            <Button variant="success" type="submit">
              <FiSend />
            </Button>
          </Form>
          )
      }
      {showEmoji && <Picker set="apple" theme="dark" style={{ position: 'absolute', bottom: '6vh', left: '340px' }} onSelect={handleEmojiSelect} emojiSize={20} />}
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

/*
    let t = Tmessages.slice();
    t.push({
      chatId: activeChat.id,
      userId: currentUserId,
      text: userInput,
      datetime: new Date()
    })
    console.log(Tmessages);
    CM(t);
  const [Tmessages, CM] = useState(messages); /////////////////
? Tmessages.filter((elem) => elem.chatId === activeChat.id).length > 0
    ? (Tmessages.filter((elem) => elem.chatId === activeChat.id).map((message, index) => (
      <Message
        key={index}
        messageData={message}
        currentUser={currentUserId}
        senderData={users.find((elem) => elem.id === message.userId)}
      />
    )))
    : (
      <div className="SampleText"> You can be the first one to write in this chat! Dont miss this opportunity</div>
    )
  : <div className="SampleText"> Select a chat to start a conversation! </div>
*/

