/* eslint-disable no-unused-vars */
import {
  React,
  useState,
  useRef,
  useEffect
} from 'react';
import {
  Form,
  Button,
  Modal,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import { SERVER_URL } from '../constants';
import fileApi from '../api/fileAPI';
import AvatarInput from '../avatarInput';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatInfo() {
  const userData = useSelector((store) => store.currentUser);
  const activeChat = useSelector((store) => store.activeChat);
  const selectedChatAvatar = useSelector((store) => store.selectedChatAvatar);

  const [edit, setEdit] = useState(false);
  const [rights, setRights] = useState('user');

  const [chatName, setName] = useState(activeChat.name);
  const [description, setDescription] = useState(activeChat.description);
  const [admins, setAdmins] = useState([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (activeChat) {
      axios.get(`${SERVER_URL}/chat/${activeChat.id}/admins`)
        .then((response) => {
          setAdmins(response.data);
          if (response.data.find((elem) => elem === userData.email)) setRights('admin');
        });
    }
  }, [])

  const handleSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const newChatData = {
      id: activeChat.id,
      name: chatName,
      avatar: activeChat.avatar,
      description,
      admins
    }
    if (selectedChatAvatar) {
      try {
        const path = await fileApi.upload({ file: selectedChatAvatar, chatId: 'avatar' })
        newChatData.avatar = `/files${path}`
      } catch (e) {
        console.error(e)
      }
    }
    await axios.post(`${SERVER_URL}/change-chat`, { chatData: { ...newChatData } }).then((response) => {
      if (response.status === 200) {
        setMessage('Изменения применены, обновите страницу')
      } else console.log('ПРоизошла ошибка')
    })
  }

  const [addAdmin, setAddAdmin] = useState(false);
  const [nae, setNae] = useState('');

  const confirmAdmin = () => {
    const tAdmins = admins.slice();
    tAdmins.push(nae);
    setAdmins(tAdmins);
    setAddAdmin(false);
    setNae('');
  }

  const clearAdmin = () => {
    setAddAdmin(false);
    setNae('');
  }

  const deleteAdmin = (email) => {
    const tAdmins = admins.slice();
    const index = tAdmins.findIndex((elem) => elem === email)
    tAdmins.splice(index, 1);
    setAdmins(tAdmins);
  }

  if (rights === 'user') {
    return (
      <>
        <Modal.Header style={{ borderBottom: '1px solid #323842' }} closeButton className="info-container">
          <img src={`${SERVER_URL}${activeChat.avatar}`} style={{ height: 100, width: 100 }} alt="av" className="avatar" />
          {activeChat.name}
        </Modal.Header>
        <Modal.Body
          className="info-container"
          style={{
            borderTop: 'none',
            borderBottomRightRadius: 'calc(0.3rem - 1px)',
            borderBottomLeftRadius: 'calc(0.3rem - 1px)'
          }}
        >
          <Form.Control as="textarea" readOnly style={{ backgroundColor: 'var(--topbar-color)', fontSize: '20px' }} value={activeChat.description} />
        </Modal.Body>
      </>
    )
  }

  return (
    <Form>
      <Modal.Header style={{ borderBottom: '1px solid #323842' }} closeButton className="info-container">
        {edit ? <AvatarInput type="CHANGE_CHAT_AVATAR" currentAvatar={`${SERVER_URL}${activeChat.avatar}`} varName="selectedChatAvatar" /> : <img src={`${SERVER_URL}${activeChat.avatar}`} style={{ height: 100, width: 100 }} alt="av" className="avatar" /> }
        {edit ? <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} value={chatName} style={{ fontSize: '25px', marginRight: 10 }} /> : activeChat.name}
      </Modal.Header>
      <Modal.Body className="info-container" style={{ borderTop: 'none' }}>
        {edit
          ? (
            <>
              <Form.Control as="textarea" name="description" onChange={(e) => setDescription(e.target.value)} value={description} style={{ fontSize: '20px' }} />
              <ListGroup className="list-group-flush pt-4">
                <ListGroupItem style={{ backgroundColor: 'var(--sidebar-color)', color: 'white' }}>
                  Список администраторов:
                  <Button disabled={addAdmin} className="btn-secondary" style={{ marginLeft: 'auto' }} onClick={() => setAddAdmin(true)}>
                    <FiPlus />
                  </Button>
                </ListGroupItem>
                {admins.map((elem) => (
                  <ListGroupItem key={elem} style={{ backgroundColor: 'transparent', color: 'white' }}>
                    <Form.Control disabled value={elem} />
                    <Button className="btn-secondary" style={{ float: 'right' }} onClick={() => deleteAdmin(elem)}><FiX /></Button>
                  </ListGroupItem>
                ))}
                {addAdmin && (
                <ListGroupItem style={{ backgroundColor: 'transparent', color: 'white' }}>
                  <Form.Control type="email" value={nae} placeholder="Введите email администратора" onChange={(e) => setNae(e.target.value)} />
                  <Button className="btn btn-danger" style={{ float: 'right' }} onClick={clearAdmin}><FiX /></Button>
                  <Button className="btn btn-primary" style={{ float: 'right' }} onClick={confirmAdmin}><FiCheck /></Button>
                </ListGroupItem>
                )}
              </ListGroup>
            </>
          )
          : (
            <>
              <Form.Control as="textarea" readOnly style={{ backgroundColor: 'var(--topbar-color)', fontSize: '20px' }} value={activeChat.description} />
              <ListGroup className="list-group-flush pt-4">
                <ListGroupItem style={{ backgroundColor: 'var(--sidebar-color)', color: 'white' }}>
                  Список администраторов:
                </ListGroupItem>
                {admins.map((elem) => (
                  <ListGroupItem key={elem} style={{ backgroundColor: 'transparent', color: 'white' }}>
                    <Form.Control disabled value={elem} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </>
          )}
      </Modal.Body>
      <Modal.Footer className="info-container" style={{ borderTop: '1px solid #323842' }}>
        <b style={{ fontSize: 13, color: '#3aaf3a' }}>{message}</b>
        {edit ? (
          <>
            <Button className="btn-primary" onClick={handleSubmit}>ОК</Button>
            <Button className="btn-warning" onClick={() => setEdit(false)}>Отмена</Button>
          </>
        )
          : <Button className="btn-primary" onClick={() => setEdit(true)}>Изменить</Button>}
      </Modal.Footer>
    </Form>
  )
}
