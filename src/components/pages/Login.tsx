import { useContext } from "react";
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router";
// import bcrypt from 'bcryptjs';

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const Login = () => {

  const { users, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);
      navigate('/');
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
        <input type="submit" />
        <p>Don't have an account yet? Click <Link to='/register'>here</Link> to register.</p>
      </form>
    </section>
  );
}
 
export default Login;