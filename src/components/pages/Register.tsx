import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { v4 as genID } from 'uuid';
import { useNavigate } from 'react-router';

import UsersContext from '../contexts/UsersContext';
import { User, UsersContextTypes } from '../../types';

const Register = () => {

  const { setLoggedInUser, addUser, findUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      id: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      avatar: '',
      dob: '',
      role: 'user' as const,
      savedPosts: [],
      stayLoggedIn: false
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, 'Username must be longer than 5 symbols.')
        .max(20, 'Username must be shorter than 20 symbols.')
        .required('Enter a username.')
        .trim(),
      email: Yup.string()
        .email('Enter a valid email.')
        .min(5, 'Email must be longer than 5 symbols.')
        .max(40, 'Email must be shorter than 40 symbols.')
        .required('Enter an email.')
        .trim(),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must include: lower case and upper case characters, number, special symbol and must be between 8 and 20 symbols long.')
        .required('Enter a password.')
        .trim(),
      passwordRepeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match.')
        .required('Confirm password.')
        .trim(),
      avatar: Yup.string()
        .url('Enter a valid url.')
        .matches(/\.(jpg|jpeg|png)$/, 'Enter a valid image url: jpg, jpeg, png')
        .trim(),
      dob: Yup.date()
        .min(new Date(1900), 'Date must be later than 1900.')
        .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13, new Date().getMonth(), new Date().getDate())), 'You must be at least 13 years old.')
        .required('Enter your birth date.')
    }),
    onSubmit: (values) => {
      // console.log(values);
      const foundUser = findUser(values) as User;
      if(foundUser){
        setError('User already exists.');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordRepeat, stayLoggedIn, ...newUser } = values;
        
        newUser.id = genID();
        newUser.role = 'user';

        if(values.stayLoggedIn){
          localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        }

        setLoggedInUser(newUser as User);
        addUser(newUser as User);
        navigate('/');
      }
    }
  })

  return (
    <section>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id='username' name='username'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your username...'
          />
          {
            formik.errors.username && formik.touched.username && <p style={{ color: "red" }}>{formik.errors.username}</p>
          }
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id='email' name='email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your email...'
          />
          {
            formik.errors.email && formik.touched.email && <p style={{ color: "red" }}>{formik.errors.email}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id='password' name='password'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your password...'
          />
          {
            formik.errors.password && formik.touched.password && <p style={{ color: "red" }}>{formik.errors.password}</p>
          }
        </div>
        <div>
          <label htmlFor="passwordRepeat">Confirm Password:</label>
          <input
            type="password"
            id='passwordRepeat' name='passwordRepeat'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your password...'
          />
          {
            formik.errors.passwordRepeat && formik.touched.passwordRepeat && <p style={{ color: "red" }}>{formik.errors.passwordRepeat}</p>
          }
        </div>
        <div>
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="url"
            id='avatar' name='avatar'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your avatar...'
          />
          {
            formik.errors.avatar && formik.touched.avatar && <p style={{ color: "red" }}>{formik.errors.avatar}</p>
          }
        </div>
        <div>
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            id='dob' name='dob'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter your date of birth...'
          />
          {
            formik.errors.dob && formik.touched.dob && <p style={{ color: "red" }}>{formik.errors.dob}</p>
          }
        </div>
        <div>
          <input
            type="checkbox" 
            name='stayLoggedIn' id='stayLoggedIn'
            checked={formik.values.stayLoggedIn}
            onChange={formik.handleChange}
          />
          <label htmlFor="stayLoggedIn">Stay logged in</label>
        </div>
        <input type="submit" />
        {
          error && <p style={{ color: "red" }}>{error}</p>
        }
      </form>
    </section>
  );
}
 
export default Register;