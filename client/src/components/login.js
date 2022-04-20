/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import {
  React,
  useState,
  useEffect,
  useRef
} from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import { useSocket } from '../contexts/SocketProvider'
import danny from '../pics/danny.jpg'
import { SERVER_URL } from './constants'

export default function Login() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');

  const [storageEmail, setStorageEmail] = useLocalStorage('email');
  const [storagePassword, setStoragePassword] = useLocalStorage('password');
  console.log(storageEmail, storagePassword)
  const [email, setEmail] = useState(storageEmail || '')
  const [password, setPassword] = useState(storagePassword || '');

  // const [tryLogin, setTryLogin] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
    console.log(email)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    console.log(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setTryLogin(true);

    tryLogin()
    // socket.emit('user:login', { userId: email, password })
  }

  const tryLogin = async () => {
    axios.post(`${SERVER_URL}/login`, {
      email,
      password
    })
      .then((response) => {
        if (response.data.auth) {
          setStorageEmail(email)
          setStoragePassword(password)
          dispatch({
            type: 'CHANGE_USER',
            user: { ...response.data.user }
          })
        } else setErrors('Неверный email или пароль')
      })
  }

  /*
  if (tryLogin) {
    socket.on('userData', (data) => {
      setTryLogin(false)
      dispatch({
        type: 'CHANGE_USER',
        user: {
          ...data,
          avatar: danny
        }
      })
    });
    socket.on('error', (data) => setErrors(data))
    console.log(errors)
  }
  */

  if (storageEmail && storagePassword) tryLogin();

  return (
    <Form
      className="mt-5"
      style={{
        maxWidth: '320px',
        margin: '0 auto',
        backgroundColor: '#5e6677',
        borderRadius: '10px',
        padding: '2em'
      }}
      onSubmit={handleSubmit}
    >
      <Form.Label>Enter your login information</Form.Label>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleChangeEmail} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={handleChangePassword} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="success" type="submit">
          Chat
        </Button>
      </Form.Group>
      <Form.Text className="text-danger">
        {errors}
      </Form.Text>
    </Form>
  )
}
