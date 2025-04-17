import { createContext, useReducer } from "react";
import { ChildProp, User, UsersContextTypes } from "../../types";

type ActionTypes = 
{ type: 'setData', data: User[] }

const reducer = (state: User[], action: ActionTypes): User[] => {
  switch(action.type){
    case 'setData':
      return action.data;
    default:
      console.error('Something went wrong');
      return state;
  }
}

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);
const UsersProvider = ({ children }: ChildProp) => {

  const [users, dispatch] = useReducer(reducer, []);

  return (
    <UsersContext.Provider
      value={{
        users
      }}
    >
      { children }
    </UsersContext.Provider>
  )
}

export { UsersProvider };
export default UsersContext;