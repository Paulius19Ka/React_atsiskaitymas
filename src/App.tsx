import { Routes, Route, Navigate } from 'react-router';

import MainOutlet from './components/outlets/MainOutlet';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AddPost from './components/pages/AddPost';
import UserPage from './components/pages/UserPage';
import { useContext, useEffect } from 'react';
import UsersContext from './components/contexts/UsersContext';
import { User, UsersContextTypes } from './types';

const App = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if(storedUser){
      setLoggedInUser(JSON.parse(storedUser) as User);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Routes>
        <Route path='' element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path='login' element={!loggedInUser ? <Login /> : <Navigate to='/user' replace />} />
          <Route path='register' element={!loggedInUser ? <Register /> : <Navigate to='/user' replace />} />
          <Route path='add' element={loggedInUser ? <AddPost /> : <Navigate to='/login' replace />} />
          <Route path='user' element={loggedInUser ? <UserPage /> : <Navigate to='/login' replace />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
