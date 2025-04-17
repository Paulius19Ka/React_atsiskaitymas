import { createContext, useEffect, useReducer } from "react";
import { Post, PostsContextTypes, ChildProp } from "../../types";

type ActionTypes =
{ type: 'setData', data: Post[] } |
{ type: 'addPost', newPost: Post } |
{ type: 'deletePost', id: Post['id'] }

const reducer = (state: Post[], action: ActionTypes) => {
  switch(action.type){
    case 'setData':
      return action.data;
    case 'addPost':
      return [...state, action.newPost];
    case 'deletePost':
      return state.filter(post => post.id !== action.id);
    default:
      console.error('There was an error :(');
      return state;
  }
}

const PostsContext = createContext<PostsContextTypes | undefined>(undefined);
const PostsProvider = ({ children }: ChildProp) => {

  const [posts, dispatch] = useReducer(reducer, []);

  const addPost = (newPost: Post) => {
    fetch(`http://localhost:8080/posts`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newPost)
    });
    dispatch({
      type: "addPost",
      newPost
    });
  };

  const deletePost = (id: Post['id']) => {
    fetch(`http://localhost:8080/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json"
      }
    });
    dispatch({
      type: 'deletePost',
      id
    });
  };

  const findPostById = (id: Post['id']): Post | undefined => {
    return posts.find(post => post.id === id);
  }

  useEffect(() => {
    fetch(`http://localhost:8080/posts`)
    .then(res => res.json())
    .then((data: Post[]) => dispatch({
      type: "setData",
      data
  }));
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        findPostById
      }}
    >
      { children }
    </PostsContext.Provider>
  )
}

export { PostsProvider };
export default PostsContext;