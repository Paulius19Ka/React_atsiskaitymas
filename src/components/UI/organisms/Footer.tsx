import styled from "styled-components";

const StyledFooter = styled.footer`
  height: 100px;
  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <span>Copyright</span>
    </StyledFooter>
  );
}
 
export default Footer;