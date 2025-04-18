import { useFormik } from 'formik';
import { v4 as genID } from 'uuid';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';

import UsersContext from '../contexts/UsersContext';
import { PostsContextTypes, UsersContextTypes } from '../../types';
import PostsContext from '../contexts/PostsContext';
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

        > input, textarea{
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

const AddPost = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { addPost } = useContext(PostsContext) as PostsContextTypes;
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: '',
      posterId: '',
      dateOfPost: '',
      title: '',
      picture: '',
      content: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(5, 'Title must be longer than 5 symbols.')
        .max(20, 'Title must be shorter than 20 symbols.')
        .required('Enter a title.'),
      picture: Yup.string()
        .url('Enter a valid url.')
        .matches(/\.(jpg|jpeg|png)$/, 'Enter a valid image url: jpg, jpeg, png')
        .required('Add an image.')
        .trim(),
      content: Yup.string()
        .min(15, 'Post content must not be shorter than 20 symbols')
        .max(500, 'Post content must not be longer than 500 symbols')
        .required('Enter the post content.')
    }),
    onSubmit: (values) => {
      if(loggedInUser){
        values.id = genID();
        values.posterId = loggedInUser?.id;
        values.dateOfPost = new Date().toString();
        setSuccessMsg('Post added sussessfully.');
        
        setTimeout(() => {
          addPost(values);
          navigate('/');
        }, 1000);
      }
    },
  })

  return (
    <StyledSection>
      <h2>AddPost</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id='title' name='title'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter the title...'
            />
          </div>
          {
            formik.errors.title && formik.touched.title && <p className="errorMsg">{formik.errors.title}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="picture">Picture:</label>
            <input
              type="url"
              id='picture' name='picture'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter a picture url...'
            />
          </div>
          {
            formik.errors.picture && formik.touched.picture && <p className="errorMsg">{formik.errors.picture}</p>
          }
        </div>
        <div>
          <div>
            <label htmlFor="content">Post Content:</label>
            <textarea
              id='content' name='content'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='enter the content...'
            />
          </div>
          {
            formik.errors.content && formik.touched.content && <p className="errorMsg">{formik.errors.content}</p>
          }
        </div>
        <input type="submit" />
        {
          successMsg && <p className='successMsg'>{successMsg}</p>
        }
      </form>
    </StyledSection>
  );
}
 
export default AddPost;