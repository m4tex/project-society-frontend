import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import styled from "styled-components";
import Theme from "../../types/Theme";

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  gap: 12px;
  justify-items: center;
  background-color: ${(props: { theme: Theme }) => props.theme.primaryColor};
  height: 45px;
  padding-left: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);

  h1 {
    display: inline;
    font-size: 20px;
    margin: auto 0;
    font-family: 'Chivo', sans-serif;
    font-weight: bold;
  }

  .logo-dot {
    position: absolute;
    display: inline;
    width: 6px;
    height: 6px;
    bottom: 15px;
    border-radius: 50%;
    background-color: ${(props: { theme: Theme }) => props.theme.accentColor};
  }
`

const BetaBadge = styled.div`
  font-size: 5px;
  font-weight: 600;

  color: ${(props: { theme: Theme }) => props.theme.accentColor};
  background-color: transparent;

  border: 1px solid ${(props: { theme: Theme }) => props.theme.accentColor};
  border-radius: 5px;

  margin: auto 0;
  height: 5px;
  padding: 2px 10px;
`

const HeaderNavigation = styled.nav`
  margin-left: 20px;
  font-weight: bold;
`

const NavUnderline = styled.div`
  position: absolute;
  height: 10spx;
  width: 100px;
  left: 100px;
  top: 100px;
  color: ${(props : {theme: Theme }) => props.theme.accentColor};
`

function Header() {
    const [navSelected, setNavSelected] = useState(0);
    const nav = useNavigate();

    return (
        <>
            <StyledHeader>
                <h1>Unitor<div className='logo-dot'/></h1>
                <BetaBadge>Beta</BetaBadge>

                <HeaderNavigation>
                    <p onClick={() => nav('/')} >Home</p>
                    <p onClick={() => nav('/schedule')}>Schedule</p>
                    <p onClick={() => nav('/classroom')}>Classroom</p>
                    <p onClick={() => nav('/overview')}>Overview</p>
                    <p onClick={() => nav('/tools')}>Tools</p>
                    <NavUnderline />
                </HeaderNavigation>
            </StyledHeader>
            <Outlet />
        </>
    );
}

export default Header;