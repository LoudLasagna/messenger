/* eslint-disable no-unused-vars */
import { React, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import danny from '../pics/danny.jpg'

const userdata = [
  {
    id: 1,
    email: 'ne@ya.ru',
    login: 'nexman',
    password: 'qwerty'
  },
  {
    id: 2,
    email: 'ne2@ya.ru',
    login: 'nexman2',
    password: 'qwerty'
  }
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const dispatch = useDispatch();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const checkResult = checkUsers(email, password);
    if (!checkResult.error) {
      dispatch({
        type: 'CHANGE_USER',
        user: {
          ...checkResult,
          avatar: danny
        }
      })
    } else setErrors(checkResult.error)
  }

  const checkUsers = (temail, tpassword) => {
    const t = userdata.find((elem) => elem.email === temail && elem.password === tpassword);
    const tindex = userdata.findIndex(
      (elem) => elem.email === temail && elem.password === tpassword
    );
    if (t) {
      const tcookie = nanoid(8);
      t.cookie = tcookie;
      userdata[tindex].cookie = tcookie; // надо сделать массив иммутабельным
    }
    return t || { error: 'no users found with such email or password' }
  }

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
        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleChangeEmail} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={handleChangePassword} />
      </Form.Group>
      <Button variant="success" type="submit">
        Chat
      </Button>
      <Form.Label className="text-danger">
        {errors}
      </Form.Label>
    </Form>
  )
}
