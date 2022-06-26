import {
  React,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import {
  Modal, Button, Form, ButtonGroup, ToggleButton
} from 'react-bootstrap';
import axios from 'axios';

import { SERVER_URL } from '../constants';

export default function ChatCreation() {
  const userData = useSelector((state) => state.currentUser);
  const [newChatFields, setNewChatFields] = useState({
    name: '', description: '', admins: [userData.email], whoCanWrite: 'everyone'
  })
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

  return (
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
      </Modal.Footer>
    </Form>
  )
}
