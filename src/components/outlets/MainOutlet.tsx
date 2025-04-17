import { NavLink, Outlet } from "react-router";

const MainOutlet = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><NavLink to=''>home</NavLink></li>
            <li><NavLink to='login'>login</NavLink></li>
            <li><NavLink to='register'>register</NavLink></li>
            <li><NavLink to='add'>add</NavLink></li>
            <li><NavLink to='user/:id'>user</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
 
export default MainOutlet;