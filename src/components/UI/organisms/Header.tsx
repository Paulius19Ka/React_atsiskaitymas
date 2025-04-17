import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import styled from "styled-components";

import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../../types";

const StyledHeader = styled.header`
  height: 100px;
  background-color: black;

  display: flex;
  justify-content: space-around;
  align-items: center;

  > nav{

    > ul{
      display: flex;
      justify-content: space-between;
      gap: 20px;

      > li{
        list-style-type: none;

        > a{
          color: white;
          text-decoration: none;

          &.active{
            color: red;
          }
        }

        > div{
          
          > a{
            color: yellow;
            text-decoration: none;

            &.active{
              color: red;
            }
          }
        }
      }
    }
  }
`;

const Header = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  }

  return (
    <StyledHeader>
      <span>IMAGE</span>
      <nav>
        <ul>
          <li><NavLink to=''>home</NavLink></li>
          {
            !loggedInUser ?
            <>
              <li><NavLink to='/login'>login</NavLink></li>
              <li><NavLink to='/register'>register</NavLink></li>
            </> :
            <>
              <li><NavLink to='/add'>add</NavLink></li>
              <li>
                <div>
                  <NavLink to={`/user`}>{loggedInUser.username}</NavLink>
                  <button onClick={() => handleLogout()}>Logout</button>
                </div>
              </li>
            </>
          }
        </ul>
      </nav>
    </StyledHeader>
  );
}
 
export default Header;