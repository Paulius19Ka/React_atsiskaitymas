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
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      picture: '',
      content: ''
    },
    onSubmit: (values) => {
      console.log(values)
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
          <label htmlFor="content">Content:</label>
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
          error && <p style={{ color: "red" }}>{error}</p>
        }
      </form>
    </section>
  );
}
 
export default AddPost;