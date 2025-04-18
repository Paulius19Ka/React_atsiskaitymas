import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { ChildProp, User, UsersContextTypes, Post, PostsContextTypes } from "../../types";
import PostsContext from "./PostsContext";

type ActionTypes = 
{ type: 'setData', data: User[] } |
{ type: 'addUser', newUser: User } |
{ type: 'savePost', userId: User['id'], postId: Post['id'] } |
{ type: 'unsavePost', userId: User['id'], postId: Post['id'] }

const reducer = (state: User[], action: ActionTypes): User[] => {
  switch(action.type){
    case 'setData':
      return action.data;
    case 'addUser':
      return [...state, action.newUser];
    case 'savePost':
      return state.map(user => {
        if(user.id === action.userId){
          return {
            ...user,
            savedPosts: [...user.savedPosts, action.postId]
          }
        } else {
          return user;
        }
      });
    case 'unsavePost':
      return state.map(user => {
        if(user.id === action.userId){
          return {
            ...user,
            savedPosts: user.savedPosts.filter(postId => postId !== action.postId)
          }
        } else {
          return user;
        }
      });
    default:
      console.error('Something went wrong');
      return state;
  }
}

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildProp) => {

  const [users, dispatch] = useReducer(reducer, []);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const { posts } = useContext(PostsContext) as PostsContextTypes;

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then((data: User[]) => dispatch({
        type: 'setData',
        data
      }));

  }, []);

  useEffect(() => {
    const storedUser: User = localStorage.getItem('loggedInUser') ?
    JSON.parse(localStorage.getItem('loggedInUser') as string) : null;

    if(storedUser && posts.length > 0){

      // remove non existant posts from saved posts
      const existingPosts = posts.map(post => post.id);
      const filterSavedPosts = storedUser.savedPosts.filter(postId => existingPosts.includes(postId));

      const doSavedPostsMatch = storedUser.savedPosts.every(postId => filterSavedPosts.includes(postId)) &&
      filterSavedPosts.every(postId => storedUser.savedPosts.includes(postId));

      if(!doSavedPostsMatch){
        const updatedUser: User = { ...storedUser, savedPosts: filterSavedPosts };
        setLoggedInUser(updatedUser);
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        fetch(`http://localhost:8080/users/${storedUser.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({ savedPosts: filterSavedPosts })
        });
      } else {
        setLoggedInUser(storedUser);
      };
    };
  }, [posts])

  const addUser = (newUser: User) => {
    fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newUser)
    });
    dispatch({
      type: 'addUser',
      newUser
    })
  };

  const findUserById = (id: User['id']): User | undefined => {
    return users.find(user => user.id === id);
  }

  const savePostToggle = (id: Post['id']) => {
    
    if(loggedInUser){
      const postSaved = loggedInUser.savedPosts.includes(id);
      const newSavedPosts = postSaved ?
      loggedInUser.savedPosts.filter(postId => postId !== id) :
      [...loggedInUser.savedPosts, id];

      setLoggedInUser({
        ...loggedInUser,
        savedPosts: newSavedPosts
      });

      localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        savedPosts: newSavedPosts
      }));

      dispatch({
        type: postSaved ? 'unsavePost' : 'savePost',
        postId: id,
        userId: loggedInUser.id
      });

      fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ savedPosts: newSavedPosts })
      });
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        loggedInUser,
        setLoggedInUser,
        findUserById,
        savePostToggle
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;