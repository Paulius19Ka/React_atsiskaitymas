import { createContext, useEffect, useReducer, useState } from "react";
import { ChildProp, User, UsersContextTypes, Post } from "../../types";

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

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then((data: User[]) => dispatch({
        type: 'setData',
        data
      }));

  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser') ?
    JSON.parse(localStorage.getItem('loggedInUser') as string) : null;
    if(storedUser){
      setLoggedInUser(storedUser); // improve this. probably not a good idea to save the whole user
    };
  }, [])

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

  const findUserByMail = (formikValues: Partial<User>): User | undefined => {
    return users.find(user => 
      user.email === formikValues.email &&
      user.password === formikValues.password
    );
  };

  const findUserById = (id: User['id']): User | undefined => {
    return users.find(user => user.id === id);
  }

  const savePost = (id: Post['id']) => {
    if(loggedInUser){
      setLoggedInUser({
        ...loggedInUser,
        savedPosts: [...loggedInUser.savedPosts, id]
      });
      localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        savedPosts: [...loggedInUser.savedPosts, id]
      }));
      dispatch({
        type: 'savePost',
        postId: id,
        userId: loggedInUser.id
      });
      fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ savedPosts: [...loggedInUser.savedPosts, id] })
      });
    }
  };

  const unsavePost = (id: Post['id']) => {
    if(loggedInUser){
      setLoggedInUser({
        ...loggedInUser,
        savedPosts: loggedInUser.savedPosts.filter(postId => postId !== id)
      });
      localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        savedPosts: loggedInUser.savedPosts.filter(postId => postId !== id)
      }));
      dispatch({
        type: 'unsavePost',
        postId: id,
        userId: loggedInUser.id
      });
      fetch(`http://localhost:8080/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ savedPosts: loggedInUser.savedPosts.filter(postId => postId !== id) })
      });
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        loggedInUser,
        setLoggedInUser,
        findUserByMail,
        findUserById,
        savePost,
        unsavePost
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;