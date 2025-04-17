import { useContext, useState } from "react";
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router";
import * as Yup from 'yup';
// import bcrypt from 'bcryptjs';

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const Login = () => {

  const { setLoggedInUser, findUserByMail } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      stayLoggedIn: false
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email.')
        .min(5, 'Email must be longer than 5 symbols.')
        .max(40, 'Email must be shorter than 40 symbols.')
        .required('Enter an email.')
        .trim(),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must include: lower case and upper case characters, number, special symbol and must be between 8 and 20 symbols long.')
        .required('Enter a password.')
        .trim()
    }),
    onSubmit: (values) => {
      const foundUser = findUserByMail(values);
      if(foundUser){
        if(values.stayLoggedIn){
          localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
        }
        setLoggedInUser(foundUser);
        setSuccessMsg('Registration complete.');

        setTimeout(() => {
          navigate('/');
        }, 1000);
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
          {
            formik.errors.email && formik.touched.email && <p style={{ color: "red" }}>{formik.errors.email}</p>
          }
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
          {
            formik.errors.password && formik.touched.password && <p style={{ color: "red" }}>{formik.errors.password}</p>
          }
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
        {
          successMsg && <p style={{ color: "green" }}>{successMsg}</p>
        }
        <p>Don't have an account yet? Click <Link to='/register'>here</Link> to register.</p>
      </form>
    </section>
  );
}
 
export default Login;