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
import { SocketProvider } from './contexts/SocketProvider';
import useBeforeUnload from './hooks/useBeforeUnload';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const userData = useSelector((state) => state.currentUser)
  const [storageEmail, setstorageEmail] = useLocalStorage('email');

  return (
    <SocketProvider id={storageEmail}>
      <div className="App">
        { userData.login ? <Home /> : <Login />}
      </div>
    </SocketProvider>
  )
}

export default App;
