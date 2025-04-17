import { Routes, Route } from 'react-router';

import MainOutlet from './components/outlets/MainOutlet';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import AddPost from './components/pages/AddPost';
import UserPage from './components/pages/UserPage';

const App = () => {


  return (
    <>
      <Routes>
        <Route path='' element={<MainOutlet />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='add' element={<AddPost />} />
          <Route path='user/:id' element={<UserPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
