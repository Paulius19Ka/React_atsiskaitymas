import { NavLink } from "react-router";
import styled from "styled-components";

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
      }
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <span>IMAGE</span>
      <nav>
        <ul>
          <li><NavLink to=''>home</NavLink></li>
          <li><NavLink to='login'>login</NavLink></li>
          <li><NavLink to='register'>register</NavLink></li>
          <li><NavLink to='add'>add</NavLink></li>
          <li><NavLink to='user/:id'>user</NavLink></li>
        </ul>
      </nav>
    </StyledHeader>
  );
}
 
export default Header;