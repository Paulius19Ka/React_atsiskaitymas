import { createContext, useEffect, useReducer } from "react";
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
  }

  useEffect(() => {
    fetch(`http://localhost:8080/users`)
      .then(res => res.json())
      .then((data: User[]) => dispatch({
        type: 'setData',
        data
      }));
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;