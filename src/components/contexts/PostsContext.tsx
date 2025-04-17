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
        posts
      }}
    >
      { children }
    </PostsContext.Provider>
  )
}

export { PostsProvider };
export default PostsContext;