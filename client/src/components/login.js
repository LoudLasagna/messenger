import {
  React,
  useEffect,
  useState
} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import useLocalStorage from '../hooks/useLocalStorage'
import { SERVER_URL } from './constants'

export default function Login() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState('');

  const currentUser = useSelector((store) => store.currentUser);

  const [storageEmail, setStorageEmail] = useLocalStorage('email');
  const [storagePassword, setStoragePassword] = useLocalStorage('password');

  const [email, setEmail] = useState(storageEmail || '')
  const [password, setPassword] = useState(storagePassword || '');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
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
            user: {
              ...response.data.user,
              avatar: `${SERVER_URL}/files${response.data.user.avatar}`
            }
          })
        } else setErrors('Неверный email или пароль')
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin()
  }

  useEffect(() => {
    if (storageEmail && storagePassword && storageEmail.length > 0 && storagePassword.length > 0) {
      handleLogin();
    }
  }, [])

  if (currentUser.login) return <Navigate to="/" />;
  return (
    <div className="App">
      <Form
        className="mt-5 info-container"
        style={{
          maxWidth: '320px',
          margin: '0 auto',
          backgroundColor: '#5e6677',
          borderRadius: '10px',
          padding: '2em'
        }}
        onSubmit={handleSubmit}
      >
        <Form.Label className="text-center">Введите информацию для входа</Form.Label>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Введите email" value={email} onChange={handleChangeEmail} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Пароль:</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={handleChangePassword} required />
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="success" type="submit">
            Войти
          </Button>
        </Form.Group>
        <Form.Text className="text-danger">
          {errors}
        </Form.Text>
      </Form>
    </div>
  )
}
