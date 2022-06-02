/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  React,
  useState,
  useEffect
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Modal, Button, Form, ButtonGroup, ToggleButton
} from 'react-bootstrap';
import axios from 'axios';
import { FiArrowLeft, FiX } from 'react-icons/fi';
import UserProfile from './userProfile/userprofile';
import Chat from './chat/chat';
import 'bootstrap/dist/css/bootstrap.min.css';

import { SERVER_URL } from './constants';

function Home() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const userData = useSelector((state) => state.currentUser);
  const isAdmin = userData.rights === 'admin';

  const [showUserProfile, setShowUserProfile] = useState(false);
  const [chats, setChats] = useState([]);

  const [showMenu, setShowMenu] = useState(true);
  const [rotation, setRotation] = useState(0);

  const [showChatModal, setShowChatModal] = useState(false);
  const [newChatFields, setNewChatFields] = useState({
    name: '', description: '', admins: [userData.email], whoCanWrite: 'everyone'
  })

  const getChats = () => {
    axios.get(`${SERVER_URL}/get-chats`)
      .then((response) => {
        if (response.data.chats) {
          setChats(response.data.chats)
        } else console.log('Ошибка получения информации о чатах')
      })
  }

  const ChatOnClick = (clickedChat) => {
    dispatch({
      type: 'CHANGE_CHAT',
      chat: clickedChat
    })
  }

  const handleShow = () => setShowUserProfile(true);
  const handleClose = () => setShowUserProfile(false);

  useEffect(() => {
    getChats()
  }, [])

  const changeShowMenu = () => {
    setShowMenu((v) => !v)
    setRotation((v) => v + 180);
  }

  const handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    const tFields = newChatFields
    tFields[name] = value

    setNewChatFields(tFields);
  }

  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await axios.post(`${SERVER_URL}/create-chat`, { chatData: { ...newChatFields } }).then((response) => {
      if (response.status === 200) {
        setMessage('Изменения применены, обновите страницу')
      } else console.log('Произошла ошибка')
    })
  }

  const deleteChat = (id) => {
    // axios.post(`${SERVER_URL}/remove-chat/${id}`);
  }

  const btnStyle = {
    marginLeft: 'auto',
    borderRadius: '10px',
    height: 30,
    width: 30,
    padding: 0
  }
  return (
    <>
      <div className={isMobile ? 'Chats-container m' : 'Chats-container'} style={showMenu && isMobile ? { left: 0 } : {}}>
        {isMobile ? (
          <div className="Chats-userprofile-container">
            <Link to="/userprofile" className="userprofile-link" onClick={handleShow} title={userData.login} style={{ marginLeft: 50 }}>
              <img className="avatar" src={userData.avatar} alt="av" />
              {userData.login}
            </Link>
            <Button onClick={changeShowMenu} className="mobile-menu-button" style={{ backgroundColor: 'var(--main-color)', border: 'none' }}>
              <FiArrowLeft style={{ transition: '.3s', transform: `rotate(${rotation}deg)` }} />
            </Button>
          </div>
        ) : (
          <div className="Chats-userprofile-container">
            <Link to="/userprofile" className="userprofile-link" onClick={handleShow} title={userData.login}>
              <img className="avatar" src={userData.avatar} alt="av" />
              {userData.login}
            </Link>
          </div>
        )}
        {
        chats.map((chat) => (
          <div key={chat.id} className="Chat" onClick={() => ChatOnClick(chat)}>
            <img src={`${SERVER_URL}${chat.avatar}`} alt="av" className="chat-avatar" />
            {chat.name}
            {chat.admins.find((elem) => elem === userData.email) && <Button variant="btn btn-danger" style={btnStyle} onClick={() => deleteChat(chat.id)}><FiX style={{ width: 23, height: 23 }} /></Button>}
          </div>
        ))
        }
        {isAdmin && (
        <div className="Chat" style={{ justifyContent: 'center', backgroundColor: 'var(--main-color)' }} onClick={() => setShowChatModal(true)}>
          Добавить чат
        </div>
        )}
      </div>
      <Chat />
      <Modal show={showUserProfile} contentClassName="TransparentBackground" onHide={handleClose} centered>
        <UserProfile handleClose={handleClose} />
      </Modal>
      {isAdmin && (
      <Modal show={showChatModal} onHide={() => setShowChatModal(false)} centered>
        <Form>
          <Modal.Header style={{ borderBottom: '1px solid #323842', minHeight: 70 }} closeButton className="info-container">
            Добавление чата
          </Modal.Header>
          <Modal.Body className="info-container">
            <Form.Group className="mb-3">
              <Form.Label>Название:</Form.Label>
              <Form.Control type="text" name="name" placeholder="Сюда идёт название" value={newChatFields.login} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание:</Form.Label>
              <Form.Control type="text" name="description" placeholder="Сюда идёт описание" value={newChatFields.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Кто может писать:  </Form.Label>
              <ButtonGroup className="m-2">
                <ToggleButton
                  type="radio"
                  variant="outline-success"
                  name="whoCanWrite"
                  value="everyone"
                  checked={newChatFields.whoCanWrite === 'everyone'}
                  onClick={() => setNewChatFields((v) => ({ ...v, whoCanWrite: 'everyone' }))}
                >
                  Все
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  variant="outline-danger"
                  name="whoCanWrite"
                  value="admins"
                  checked={newChatFields.whoCanWrite === 'admins'}
                  onClick={() => setNewChatFields((v) => ({ ...v, whoCanWrite: 'admins' }))}
                >
                  Администраторы
                </ToggleButton>
              </ButtonGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '1px solid #323842' }} className="info-container">
            <b style={{ fontSize: 13, color: '#3aaf3a' }}>{message}</b>
            <Button className="btn-primary" onClick={handleSubmit}>ОК</Button>
            <Button className="btn-warning" onClick={() => setShowChatModal(false)}>Отмена</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      )}
    </>
  );
}

export default Home;
