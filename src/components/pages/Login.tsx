import { useContext, useState } from "react";
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router";
// import bcrypt from 'bcryptjs';

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const Login = () => {

  const { setLoggedInUser, findUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      stayLoggedIn: false
    },
    onSubmit: (values) => {
      const foundUser = findUser(values);
      if(foundUser){
        if(values.stayLoggedIn){
          localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        }
        setLoggedInUser(foundUser);
        navigate('/');
      } else {
        setError('Wrong email or password.')
      }
    }
  })

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email" name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="enter your email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password" name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="enter your password..."
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="stayLoggedIn" id="stayLoggedIn"
            checked={formik.values.stayLoggedIn}
            onChange={formik.handleChange}
          />
        </div>
        <input type="submit" />
        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
        <p>Don't have an account yet? Click <Link to='/register'>here</Link> to register.</p>
      </form>
    </section>
  );
}
 
export default Login;