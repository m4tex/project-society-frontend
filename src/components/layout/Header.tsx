import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {useRef, useEffect, useState, useContext} from "react";
import styled from "styled-components";
import Theme from "../../types/Theme";
import Menu from "../UI/Cards/Menu";
import AvatarCircle from "../UI/AvatarCircle";
import {MainContext} from "../../store/MainProvider";
import {CSSTransition, Transition} from 'react-transition-group';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  gap: 20px;
  justify-items: center;
  background-color: ${(props: { theme: Theme }) => props.theme.primaryColor};
  height: 65px;
  padding-left: 40px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  z-index: 4;

  h1 {
    display: inline;
    font-size: 30px;
    margin: auto 0;
    font-family: 'Chivo', sans-serif;
    font-weight: bold;
  }

  h1:hover {
    cursor: pointer;
  }

  .logo-dot {
    position: absolute;
    display: inline;

    width: 6px;
    height: 6px;
    bottom: 22px;

    background-color: ${(props: { theme: Theme }) => props.theme.accentColor};
    border-radius: 50%;
  }
`

const BetaBadge = styled.div`
  font-size: 8px;
  font-weight: 700;

  color: ${(props: { theme: Theme }) => props.theme.accentColor};
  background-color: transparent;

  border: 1px solid ${(props: { theme: Theme }) => props.theme.accentColor};
  border-radius: 8px;

  margin: auto 0;
  height: 8px;
  padding: 2px 10px;
`

const AccountNavSection = styled.div`
  position: absolute;
  right: 0;
  height: 100%;

  margin-right: 20px;

  .material-icons {
    font-size: 30px;
  }

  .avatar {
    display: inline-block;
    margin: 12.5px 0;
  }

  .account-menu {
    position: relative;
    right: -8px;
    transform: scale(120%);

    p {
      &:first-child {
        padding-top: 10px;
      }

      color: ${(props: { theme: Theme }) => props.theme.secondaryColor};
    }

    p:hover {
      color: ${(props: { theme: Theme }) => props.theme.interactableColor};
    }
  }

  span {
    position: relative;
    line-height: 65px;
    top: -17.5px;
    height: 100%;
  }

  span:hover {
    cursor: pointer;
  }

  span:first-child {
    color: ${(props: { theme: Theme }) => props.theme.secondaryColor};
    margin-right: 10px;
  }
`

const NavIndicator = styled.div`
  position: absolute;
  background-color: ${(props: IndicatorProps) => props.theme.accentColor};

  height: 3px;
  bottom: 0;

  width: ${(props: IndicatorProps) => props.width}px;
  left: ${(props: IndicatorProps) => props.left}px;

  transition: left 0.3s ease-out, width 0.3s ease-in;
`

const HeaderNavigation = styled.nav`
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;
  position: relative;
`

const NavLink = styled.p`
  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor};
  float: left;
  height: 100%;
  line-height: 65px;
  padding: 0 20px;
  z-index: 100;

  &:hover {
    cursor: pointer;
    color: ${(props: { theme: Theme }) => props.theme.interactableColor};
  }
`

const NavDropmenu = styled.div`
  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor};
  position: relative;
  height: 100%;
  float: left;
  padding: 0 10px 0 20px;
  line-height: 65px;
  z-index: 6;
  //max-width: 102px;
  &:hover {
    cursor: pointer;
    color: ${(props: { theme: Theme }) => props.theme.interactableColor};
  }

  p {
    position: relative;
    float: left;
    z-index: 10;
  }

  span {
    position: relative;
    float: left;
    height: 100%;
    line-height: inherit;
    transform: translateY(-1px);
    z-index: inherit;
  }

  .tools-menu-list {
    cursor: default;
    position: absolute;
    width: 90px;

    top: 14px;
    left: 6px;

    border-radius: 18px;
    text-align: center;
    transform: scale(120%);

    font-weight: normal;

    p {
      font-size: 12px;
      line-height: normal;

      position: relative;

      &:first-child {
        margin-top: 45px;
      }
    }
  }
`

type IndicatorProps = { left: number, width: number, theme: Theme }

function Header() {
    //region stuff I will rarely change
    const [dropdownShown, setDropdownShown] = useState(false);
    const [accountMenuShown, setAccountMenuShown] = useState(false);

    const [navState, setNavState] = useState({
        navLinkSelection: [false, true, false, false, false],
        indicatorLeft: 0,
        indicatorWidth: 0,
    })

    function navDropMenuHandler() {
        setDropdownShown(prevState => !prevState);
        console.log('state changed.')
    }

    function accountMenuHandler() {
        setAccountMenuShown(prevState => !prevState)
    }

    const mainContext = useContext(MainContext);
    //endregion
    //region navigation selection variables
    const nav = useNavigate();
    const location = useLocation();

    const nav1 = useRef<HTMLParagraphElement>(null);
    const nav2 = useRef<HTMLParagraphElement>(null);
    const nav3 = useRef<HTMLParagraphElement>(null);
    const nav4 = useRef<HTMLParagraphElement>(null);
    const nav5 = useRef<HTMLDivElement>(null);
    const navs = [nav1, nav2, nav3, nav4, nav5];

    //When the direction changes
    useEffect(() => {
        let index: number;

        switch (location.pathname) {
            case '/home':
                index = 0;
                break;
            case '/':
                index = 1;
                break;
            case '/classroom':
                index = 2;
                break;
            case '/overview':
                index = 3;
                break;
            case '/pomodoro':
                index = 4;
                break;
            case '/learn':
                index = 4;
                break;
            default:
                index = -1;
                break;
        }

        let selections = [false, false, false, false, false];
        selections[index] = true;

        setNavState({
            navLinkSelection: selections,
            indicatorLeft: navs[index].current!.offsetLeft,
            indicatorWidth: navs[index].current!.offsetWidth
        });
    }, [location]); //eslint-disable-line
    //Disabled the eslint above because it wanted me to add a dependency that would cause a loop.
    //endregion

    const toolsOptions = [
        {name: 'Pomodoro', click: () => nav('/pomodoro')},
        {name: 'Learn', click: () => nav('/learn')},
    ]
    const accountOptions = [
        {name: 'Account', click: () => nav('/account')},
        {name: 'Settings', click: () => nav('/settings')},
        {name: 'About Us', click: () => nav('/about-us')},
        {name: 'Log Out', click: () => mainContext.logOut()},
    ]

    type TransitionStates = {
        [key: string]: string;
    }

    return (
        <>
            <StyledHeader>
                <h1 onClick={() => nav('/home')}>Unitor
                    <div className='logo-dot'/>
                </h1>
                <BetaBadge>Beta</BetaBadge>
                <HeaderNavigation>
                    <NavLink selected={navState.navLinkSelection[0]} ref={nav1}
                             onClick={() => nav('/home')}>Home</NavLink>
                    <NavLink selected={navState.navLinkSelection[1]} ref={nav2}
                             onClick={() => nav('/')}>Schedule</NavLink>
                    <NavLink selected={navState.navLinkSelection[2]} ref={nav3}
                             onClick={() => nav('/classroom')}>Classroom</NavLink>
                    <NavLink selected={navState.navLinkSelection[3]} ref={nav4}
                             onClick={() => nav('/overview')}>Overview</NavLink>
                    <NavDropmenu ref={nav5} selected={navState.navLinkSelection[4]} onClick={navDropMenuHandler}>
                        <p>Tools</p>
                        <span className="material-icons">expand_{dropdownShown ? 'less' : 'more'}</span>
                        <Menu timeout={300} classNames={'t'} trigger={dropdownShown} options={toolsOptions}
                              className={'tools-menu-list'} onClose={() => setDropdownShown(false)} />
                    </NavDropmenu>
                    <NavIndicator left={navState.indicatorLeft} width={navState.indicatorWidth}/>
                </HeaderNavigation>
                <AccountNavSection>
                    <span className='material-icons'>notifications</span>
                    <AvatarCircle className='avatar' src='none'/>
                    <span className="material-icons" onClick={accountMenuHandler}>more_vert</span>
                    {/*<Transition timeout={300} in={accountMenuShown} mountOnEnter={true} unmountOnExit={true}>*/}
                    {/*    {state => <Menu options={accountOptions} onClose={accountMenuHandler}*/}
                    {/*                    className={`account-menu t-${state}`}/>}*/}
                    {/*</Transition>*/}
                </AccountNavSection>
            </StyledHeader>
            <Outlet/>
        </>
);
}

export default Header;
//TRY TO MAKE A ON MOUSE OUT REACT HOOK. MAYBE THEN REPLACE WHEN CLICK OUTSIDE COMPONENT PACKAGE. //// replaced the package with my own solution. The mouse out hook is not needed anymore. //// DONE
//Add hover animations //// DONE
//Change the pointer on hover on clickable items //// DONE
//Remove the spaces between menu buttons. //// DONE
//Add animations when opening menus
//Maybe add a gray indicator on hover
//Give better names to the variables once everything is done..