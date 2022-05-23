import {
  React
} from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from './components/home';

function App() {
  const userData = useSelector((state) => state.currentUser)
  if (!userData.login) return <Navigate to="/login" />
  return (
    <div className="App">
      <Home />
    </div>
  )
}

export default App;
