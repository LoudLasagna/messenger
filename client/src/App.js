/* eslint-disable no-unused-vars */
import {
  React,
  useRef,
  useState
} from 'react';
// eslint-disable-next-line no-unused-vars
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import useBeforeUnload from './hooks/useBeforeUnload';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const userData = useSelector((state) => state.currentUser)
  const [storageEmail, setstorageEmail] = useLocalStorage('email');
  return (
    <div className="App">
      { userData.login ? <Home /> : <Login />}
    </div>
  )
}
// { userData.login ? <Home /> : <Login />}
export default App;
