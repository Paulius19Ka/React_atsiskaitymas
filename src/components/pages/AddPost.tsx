import { useFormik } from 'formik';
import { v4 as genID } from 'uuid';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';

import UsersContext from '../contexts/UsersContext';
import { PostsContextTypes, UsersContextTypes } from '../../types';
import PostsContext from '../contexts/PostsContext';

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
        addPost(values);
        setSuccessMsg('Post added sussessfully.')
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    },
  })

  return (
    <section>
      <h2>AddPost</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id='title' name='title'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter the title...'
          />
          {
            formik.errors.title && formik.touched.title && <p style={{ color: "red" }}>{formik.errors.title}</p>
          }
        </div>
        <div>
          <label htmlFor="picture">Picture:</label>
          <input
            type="url"
            id='picture' name='picture'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter a picture url...'
          />
          {
            formik.errors.picture && formik.touched.picture && <p style={{ color: "red" }}>{formik.errors.picture}</p>
          }
        </div>
        <div>
          <label htmlFor="content">Post Content:</label>
          <textarea
            id='content' name='content'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder='enter the content...'
          />
          {
            formik.errors.content && formik.touched.content && <p style={{ color: "red" }}>{formik.errors.content}</p>
          }
        </div>
        <input type="submit" />
        {
          successMsg && <p style={{ color: "green" }}>{successMsg}</p>
        }
      </form>
    </section>
  );
}
 
export default AddPost;