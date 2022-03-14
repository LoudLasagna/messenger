import {
  React,
  useState
} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const userData = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const [login, changeLogin] = useState(userData.login);
  const [email, changeEmail] = useState(userData.email);
  const [password, changePassword] = useState(userData.password);

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
        <Link to="/" className="userprofile-link">
          Назад
        </Link>
      </div>
      <Form className="userprofile-fields-container">
        <Form.Group className="mb-3">
          <Form.Label>Login:</Form.Label>
          <Form.Control type="text" disabled={!edit} placeholder="Change your Login" value={login} onChange={(e) => { changeLogin(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" disabled={!edit} placeholder="Change your Email" value={email} onChange={(e) => { changeEmail(e.target.value) }} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" disabled={!edit} placeholder="Change your Password" value={password} onChange={(e) => { changePassword(e.target.value) }} />
        </Form.Group>
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
