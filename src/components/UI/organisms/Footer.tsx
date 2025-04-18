import styled from "styled-components";
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import SchoolIcon from '@mui/icons-material/School';

const StyledFooter = styled.footer`
  height: 150px;
  background-color: var(--background-main);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > div.links{
    background-color: var(--background-secondary);
    width: 100%;
    height: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    > ul{
      display: flex;
      gap: 20px;
      margin: 0;

      > li{
        list-style-type: none;

        > a{
          display: flex;

          > svg{
            font-size: 1.3rem;
            color: var(--font-main);

            &:hover{
              color: var(--accent-main);
            }
          }
        }
      }
    }
  }

  > div.terms{

    width: 100%;

    > p{
      margin: 0;
      text-align: center;
    }
  }

  > div.copyright{
    width: 100%;
    height: 25px;
    background-color: var(--background-main-dark);

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="links">
        <ul>
          <li><a href="https://github.com/Paulius19Ka/React_atsiskaitymas"><GitHubIcon /></a></li>
          <li><a href="https://www.facebook.com/paulius.karbauskas/"><FacebookIcon /></a></li>
          <li><a href="https://codeacademy.lt/programavimo-kursai/jaunesniojo-front-end-typescript-programuotojo-kompetenciju-programa-su-di-223003473/"><SchoolIcon /></a></li>
        </ul>
      </div>
      <div className="terms">
        <p>
          By using this platform, you agree to our Terms of Use and Privacy Policy. Violations may result in account actions. Continued use means acceptance.
        </p>
      </div>
      <div className="copyright">
        <span>{new Date().getFullYear()}</span>
        <span>Copyright:</span>
        <span>Paulius Karbauskas</span>
      </div>
    </StyledFooter>
  );
}
 
export default Footer;