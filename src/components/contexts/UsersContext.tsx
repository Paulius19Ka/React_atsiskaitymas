import { createContext, useEffect, useReducer, useState } from "react";
import { ChildProp, User, UsersContextTypes } from "../../types";

type ActionTypes = 
{ type: 'setData', data: User[] } |
{ type: 'addUser', newUser: User }

const reducer = (state: User[], action: ActionTypes): User[] => {
  switch(action.type){
    case 'setData':
      return action.data;
    case 'addUser':
      return [...state, action.newUser];
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

      const storedUser = localStorage.getItem('loggedInUser') ?
      JSON.parse(localStorage.getItem('loggedInUser') as string) : null;
      if(storedUser){
        setLoggedInUser(storedUser);
      }
  }, []);

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

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        loggedInUser,
        setLoggedInUser,
        findUserByMail,
        findUserById
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;