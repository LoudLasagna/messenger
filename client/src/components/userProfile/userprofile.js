/* eslint-disable no-unused-vars */
import {
  React,
  useState,
  useRef,
  useEffect
} from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FiEye } from 'react-icons/fi';
import axios from 'axios';
import fileApi from '../api/fileAPI';
import { SERVER_URL } from '../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import AvatarInput from '../avatarInput';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const userData = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [storageEmail, setStorageEmail] = useLocalStorage('email');
  const [storagePassword, setStoragePassword] = useLocalStorage('password');

  const selectedAvatar = useSelector((store) => store.selectedAvatar);

  const [fields, setFields] = useState({
    login: userData.login,
    email: userData.email,
    password: '',
    newPassword: '',
    checkNewPassword: ''
  })

  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({});

  const leave = () => {
    setStorageEmail('')
    setStoragePassword('')
    setTimeout(() => dispatch({
      type: 'CHANGE_USER',
      user: {}
    }), 50)
  }

  const validateInput = () => {
    let formIsValid = true;
    const tErrors = {}

    if (fields.password !== storagePassword) {
      formIsValid = false;
      tErrors.password = 'Введён неправильный пароль';
    }
    if (!fields.password && fields.password.length < 6) {
      formIsValid = false;
      tErrors.password = 'Длина пароля должна быть как минимум 6 символов';
    }
    if (changePassword) {
      if (!fields.newPassword && fields.newPassword.length < 6) {
        formIsValid = false;
        tErrors.newPassword = 'Длина пароля должна быть как минимум 6 символов';
      }
      if (!fields.checkNewPassword && fields.checkNewPassword.length < 6) {
        formIsValid = false;
        tErrors.checkNewPassword = 'Длина пароля должна быть как минимум 6 символов';
      }
      if (fields.newPassword !== fields.checkNewPassword) {
        formIsValid = false;
        tErrors.newPassword = 'Пароли не совпадают';
        tErrors.checkNewPassword = 'Пароли не совпадают';
      }
    }

    setErrors(tErrors);
    return formIsValid;
  }

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const tFields = fields
    tFields[name] = value

    const fixPassword = (psw) => psw.replace(/(?!\w|\s)./g, '')
      .replace(/\s+/g, ' ')
      .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')

    switch (name) {
      case 'password':
        tFields.password = fixPassword(tFields.password)
        break
      case 'newPassword':
        tFields.newPassword = fixPassword(tFields.newPassword)
        break
      case 'checkNewPassword':
        tFields.checkNewPassword = fixPassword(tFields.checkNewPassword)
        break
      default:
        break
    }

    setFields(tFields)
    setValidated(validateInput())
  }

  const confirmChanges = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    if (validated) {
      const newUserData = {
        id: userData.id,
        avatar: userData.avatar,
        login: fields.login,
        email: userData.email,
        password: fields.newPassword.length > 0 ? fields.newPassword : fields.password
      }
      if (selectedAvatar) {
        try {
          const path = await fileApi.upload({ file: selectedAvatar, chatId: 'avatar' })
          newUserData.avatar = path
        } catch (e) {
          console.error(e)
        }
      }
      await axios.post(`${SERVER_URL}/change-profile`, { userData: newUserData })
        .then((response) => {
          if (response.status === 200) {
            if (fields.newPassword.length > 0) setStoragePassword(fields.newPassword)
            dispatch({
              type: 'CHANGE_USER',
              user: {
                ...userData,
                login: fields.login,
                email: fields.email,
                password: fields.password
              }
            })
          } else setErrors('Неверный email или пароль')
        })
    }
  }

  return (
    <Form className="info-container" style={{ borderRadius: 'inherit' }}>
      <Modal.Header closeButton>
        {edit ? (
          <AvatarInput type="CHANGE_SELECTED_AVATAR" currentAvatar={userData.avatar} varName="selectedAvatar" />
        ) : (
          <img src={userData.avatar} style={{ height: 100, width: 100 }} alt="av" className="avatar" />
        )}
        {userData.login}
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Login:</Form.Label>
          <Form.Control type="text" name="login" disabled={!edit} placeholder="Change your Login" value={fields.login} onChange={handleChange} required />
          <Form.Text style={{ color: 'red' }}>
            {errors.login}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" disabled={!edit} placeholder="Change your Email" value={fields.email} onChange={handleChange} required />
          <Form.Text style={{ color: 'red' }}>
            {errors.email}
          </Form.Text>
        </Form.Group>
        {edit && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%' }}>
              <Form.Control autoComplete="off" type={showPassword ? 'text' : 'password'} name="password" disabled={!edit} placeholder="Your old password goes here" value={fields.password} onChange={handleChange} required />
              <Button variant="outline-light" onClick={() => setShowPassword((v) => !v)}>
                <FiEye />
              </Button>
            </div>
            <Form.Text style={{ color: 'red' }}>
              {errors.password}
            </Form.Text>
          </Form.Group>
          {changePassword
          && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>New password:</Form.Label>
              <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%' }}>
                <Form.Control autoComplete="off" type={showNewPassword ? 'text' : 'password'} name="newPassword" disabled={!edit} placeholder="You can even change your password!" value={fields.newPassword} onChange={handleChange} required />
                <Button variant="outline-light" onClick={() => setShowNewPassword((v) => !v)}>
                  <FiEye />
                </Button>
              </div>
              <Form.Text style={{ color: 'red' }}>
                {errors.newPassword}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm password:</Form.Label>
              <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%' }}>
                <Form.Control autoComplete="off" type={showConfirmPassword ? 'text' : 'password'} name="checkNewPassword" disabled={!edit} placeholder="This is where your mind will be put to the short memory test" value={fields.confirmPassword} onChange={handleChange} required />
                <Button variant="outline-light" onClick={() => setShowConfirmPassword((v) => !v)}>
                  <FiEye />
                </Button>
              </div>
              <Form.Text style={{ color: 'red' }}>
                {errors.checkNewPassword}
              </Form.Text>
            </Form.Group>
          </>
          )}
        </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center', borderTopColor: '#323842' }}>
        <Button variant="danger" onClick={leave}>Выйти</Button>
        {
        edit
          ? (
            <>
              <Button variant="warning" onClick={() => setChangePassword((v) => !v)}>{changePassword ? 'Не менять пароль' : 'Изменить пароль'}</Button>
              <Button variant="primary" onClick={confirmChanges}> ОК </Button>
              <Button variant="primary" onClick={() => setEdit(false)}> Отмена </Button>
            </>
          )
          : <Button variant="primary" onClick={() => setEdit(true)}>Изменить профиль</Button>
        }
      </Modal.Footer>
    </Form>
  );
}

export default UserProfile;