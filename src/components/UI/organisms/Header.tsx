import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import styled from "styled-components";
import LogoutIcon from '@mui/icons-material/Logout';

import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../../types";

const StyledHeader = styled.header`
  height: 100px;
  background-color: var(--background-main-dark);
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > img{
    height: 50%;
    width: auto;
    cursor: pointer;

    &:hover{
      filter: brightness(1.5);
    }
  }

  > nav{

    > ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;

      > li{
        list-style-type: none;

        > a{
          color: var(--font-main);
          text-decoration: none;
          font-weight: 600;

          &.active{
            color: var(--accent-main);
          }
        }

        > div{
          display: flex;
          gap: 10px;
          align-items: center;
          > a{
            color: var(--font-main);
            text-decoration: none;
            font-weight: 700;

            display: flex;
            align-items: center;
            gap: 5px;

            > img{
              width: 35px;
              height: 35px;
              object-fit: cover;
              border-radius: 35px;
            }

            &:hover{
              color: var(--font-hover);

              > img{
                filter: brightness(0.8);
              }
            }

            &.active{
              color: var(--font-active);

              > img{
                filter: brightness(0.6);
              }
            }
          }

          > svg{
            cursor: pointer;
            color: var(--font-hover);

            &:hover{
              color: var(--font-main);
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px){
    padding: 0px 60px;

    > nav{

      > ul{
        gap: 40px;

        > li{

          > div{
            gap: 20px;

            > a{
              gap: 15px;
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
      <img onClick={() => navigate('/')} src="/public/media/favicon_placeholder.png" alt="favicon placeholder image" />
      <nav>
        <ul>
          <li><NavLink to=''>HOME</NavLink></li>
          {
            !loggedInUser ?
            <>
              <li><NavLink to='/login'>LOGIN</NavLink></li>
              <li><NavLink to='/register'>REGISTER</NavLink></li>
            </> :
            <>
              <li><NavLink to='/add'>ADD</NavLink></li>
              <li>
                <div>
                  <NavLink to={`/user`}>
                    {
                      loggedInUser.avatar ?
                      <img src={loggedInUser.avatar} alt={`${loggedInUser.username} avatar`} /> :
                      <img src='https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg' alt='placeholder profile picture' />
                    }
                    <span>{loggedInUser.username}</span>
                  </NavLink>
                  <LogoutIcon onClick={() => handleLogout()}/>
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