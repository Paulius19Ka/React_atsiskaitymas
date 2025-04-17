import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const UserPage = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

  return (
    <section>
      <h2>UserPage</h2>
      <span>{loggedInUser?.username}</span>
    </section>
  );
}
 
export default UserPage;