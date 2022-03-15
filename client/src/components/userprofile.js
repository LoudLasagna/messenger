import {
  React,
  useState
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const userData = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [login, changeLogin] = useState(userData.login);
  const [email, changeEmail] = useState(userData.email);
  const [password, changePassword] = useState('');
  const [confirmPassword, changeConfirmPassword] = useState('');

  const confirmChanges = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setEdit(false);
    dispatch({
      type: 'CHANGE_USER',
      user: {
        ...userData,
        login,
        email,
        password
      }
    })
  }

  return (
    <div className="userprofile">
      <div className="Chats-userprofile-container">
        <Link to="/" style={{ width: 330, margin: 10 }} className="userprofile-link">
          Назад
        </Link>
      </div>
      <Form className="userprofile-fields-container">
        <div style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          margin: '0 auto'
        }}
        >
          <img src={userData.avatar} style={{ height: 100, width: 100, marginRight: 30 }} alt="av" className="avatar" />
          Профиль пользователя
          {` ${userData.login}`}
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Login:</Form.Label>
          <Form.Control type="text" disabled={!edit} placeholder="Change your Login" value={login} onChange={(e) => { changeLogin(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" disabled={!edit} placeholder="Change your Email" value={email} onChange={(e) => { changeEmail(e.target.value) }} />
        </Form.Group>
        {edit && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%' }}>
              <Form.Control autoComplete="off" type={showPassword ? 'text' : 'password'} disabled={!edit} placeholder="You can even change your password!" value={password} onChange={(e) => { changePassword(e.target.value) }} />
              <Button variant="outline-light" onClick={() => setShowPassword((v) => !v)}>
                <FiEye />
              </Button>
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm assword:</Form.Label>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', width: '100%' }}>
              <Form.Control autoComplete="off" type={showConfirmPassword ? 'text' : 'password'} disabled={!edit} placeholder="This is where your mind will be put to the short memory test" value={confirmPassword} onChange={(e) => { changeConfirmPassword(e.target.value) }} />
              <Button variant="outline-light" onClick={() => setShowConfirmPassword((v) => !v)}>
                <FiEye />
              </Button>
            </div>
          </Form.Group>
        </>
        )}
        {
        edit
          ? <Button variant="primary" onClick={(event) => confirmChanges(event)}> Подтвердить изменения </Button>
          : <Button variant="primary" onClick={() => setEdit(true)}> Изменить профиль </Button>
        }
      </Form>
    </div>
  );
}

export default UserProfile;
