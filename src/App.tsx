import { Routes, Route, Navigate } from 'react-router';

import MainOutlet from './components/outlets/MainOutlet';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AddPost from './components/pages/AddPost';
import UserPage from './components/pages/UserPage';
import { useContext } from 'react';
import UsersContext from './components/contexts/UsersContext';
import { UsersContextTypes } from './types';

const App = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <>
      <Routes>
        <Route path='' element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='add' element={loggedInUser ? <AddPost /> : <Navigate to='/login' replace />} />
          <Route path='user' element={loggedInUser ? <UserPage /> : <Navigate to='/login' replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
