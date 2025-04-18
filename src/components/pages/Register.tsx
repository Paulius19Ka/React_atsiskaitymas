import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { v4 as genID } from 'uuid';
import { Link, useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';

import UsersContext from '../contexts/UsersContext';
import { User, UsersContextTypes } from '../../types';
import styled from 'styled-components';

const StyledSection = styled.section`
  > h2{
    text-align: center;
    font-size: 1.6rem;
    margin: 10px 0px;
  }

  p.errorMsg, p.successMsg{
    margin: 0;
    font-size: 0.8rem;
  }

  p.errorMsg{
    color: var(--message-error);
    text-align: start;
  }

  p.successMsg{
    color: var(--message-success);
  }

  > form{
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    > div{
      width: 350px;
      
      > div{
        display: flex;
        gap: 5px;
        width: 100%;

        > input{
          flex-grow: 1;
          border: none;
          background-color: var(--background-secondary);
          color: var(--font-main);

          &::placeholder{
            color: var(--background-tertiary);
          }
        }
      }
    }

    > div.checkbox{
      display: flex;
      justify-content: center;
      gap: 5px;
    }

    > input[type="submit"]{
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: var(--button-main);
      font-size: 1rem;
      font-weight: bold;

      &:hover{
        cursor: pointer;
        background-color: var(--accent-main);
      }
    }

    > p{
      margin: 0;
      font-size: 1rem;

      > a{
        text-decoration: none;
        color: var(--accent-main);
        font-weight: bold;

        &:hover{
          color: var(--accent-hover);
        }
      }
    }
  }
`;

const Register = () => {

  const { setLoggedInUser, addUser, users } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
      if(users){
        const foundUser = users.find(user =>
          user.email === values.email ||
          user.username === values.username
        )
        if(foundUser){
          setError('User already exists.');
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { passwordRepeat, stayLoggedIn, ...newUser } = values;

          const hasehedPass = bcrypt.hashSync(newUser.password, 10);
          newUser.password = hasehedPass;
          newUser.id = genID();
          newUser.role = 'user';
  
          setSuccessMsg('Registration complete.');
          setTimeout(() => {
            if(values.stayLoggedIn){
              localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            }
            setLoggedInUser(newUser as User);
            addUser(newUser as User);
            navigate('/');
          }, 1000);
        }
      }
    }
  })

  return (
    <StyledSection>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id='username' name='username'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your username...'
            />
          </div>
          {
            formik.errors.username && formik.touched.username && <p className="errorMsg">{formik.errors.username}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id='email' name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your email...'
            />
          </div>
          {
            formik.errors.email && formik.touched.email && <p className="errorMsg">{formik.errors.email}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id='password' name='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your password...'
            />
          </div>
          {
            formik.errors.password && formik.touched.password && <p className="errorMsg">{formik.errors.password}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="passwordRepeat">Confirm Password:</label>
            <input
              type="password"
              id='passwordRepeat' name='passwordRepeat'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your password...'
            />
          </div>
          {
            formik.errors.passwordRepeat && formik.touched.passwordRepeat && <p className="errorMsg">{formik.errors.passwordRepeat}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="url"
              id='avatar' name='avatar'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your avatar...'
            />
          </div>
          {
            formik.errors.avatar && formik.touched.avatar && <p className="errorMsg">{formik.errors.avatar}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="dob">Date of birth:</label>
            <input
              type="date"
              id='dob' name='dob'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter your date of birth...'
            />
          </div>
          {
            formik.errors.dob && formik.touched.dob && <p className="errorMsg">{formik.errors.dob}</p>
          }
        </div>
        <div className='checkbox'>
          <input
            type="checkbox" 
            name='stayLoggedIn' id='stayLoggedIn'
            checked={formik.values.stayLoggedIn}
            onChange={formik.handleChange}
          />
          <label htmlFor="stayLoggedIn">Stay Logged In</label>
        </div>
        <input type="submit" />
        {
          error && <p className="errorMsg">{error}</p>
        }
        {
          successMsg && <p className="successMsg">{successMsg}</p>
        }
        <p>Have an account already? Click <Link to='/login'>here</Link> to login.</p>
      </form>
    </StyledSection>
  );
}
 
export default Register;