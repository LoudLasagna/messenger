/* eslint-disable no-unused-vars */
import {
  React
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
  if (!userData.login) return <Navigate to="/login" />
  return (
    <div className="App">
      <Home />
    </div>
  )
}
// { userData.login ? <Home /> : <Login />}
export default App;
