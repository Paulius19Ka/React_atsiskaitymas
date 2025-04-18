import { useContext, useState } from "react";
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router";
import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import styled from "styled-components";

import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

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
      width: 250px;
      
      > div{
        display: flex;
        gap: 5px;

        > input{
          width: 100%;
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

const Login = () => {

  const { setLoggedInUser, users } = useContext(UsersContext) as UsersContextTypes;
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
      if(users){
        const foundUser = users.find(user =>
          user.email === values.email &&
          bcrypt.compareSync(values.password, user.password)
        )
        if(foundUser){
          setSuccessMsg(`Welcome back ${foundUser.username}.`);
          
          setTimeout(() => {
            if(values.stayLoggedIn){
              localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            }
            setLoggedInUser(foundUser);
            navigate('/');
          }, 1000);
        } else {
          setError('Wrong email or password.')
        }
      }
    }
  })

  return (
    <StyledSection>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
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
          {
            formik.errors.email && formik.touched.email && <p className="errorMsg">{formik.errors.email}</p>
          }
        </div>
        <div>
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
          {
            formik.errors.password && formik.touched.password && <p className="errorMsg">{formik.errors.password}</p>
          }
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="stayLoggedIn" id="stayLoggedIn"
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
        <p>Don't have an account yet? Click <Link to='/register'>here</Link> to register.</p>
      </form>
    </StyledSection>
  );
}
 
export default Login;