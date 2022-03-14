import {
  React
} from 'react';
// eslint-disable-next-line no-unused-vars
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/home';
import Login from './components/login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const userData = useSelector((state) => state.currentUser)
  return ( // надо сделать сначала проверку соответствия локалькой куки куке на сервере
    <div className="App">
      {userData.id ? <Home /> : <Login />}
    </div>
  );
}

export default App;
