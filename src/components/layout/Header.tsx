import {useNavigate, useLocation} from "react-router-dom";
import {useRef, useEffect, useState, useContext} from "react";
import styled from "styled-components";
import Theme from "../../types/Theme";
import Menu from "../UI/Cards/Menu";
import AvatarCircle from "../UI/AvatarCircle";
import {MainContext} from "../../store/MainProvider";

const StyledHeader = styled.header`
  position: fixed;
  display: flex;

  height: 65px;
  width: 100%;
  
  top: 0;

  padding-left: 30px;
  padding-right: 10px;
  z-index: 4;

  background-color: ${(props: { theme: Theme }) => props.theme.primaryColor};
  border-bottom: 1px solid ${(props: { theme: Theme }) => props.theme.tertiaryColor};

  //logo
  h1 {
    display: flex;
    align-items: center;
    font-size: 30px;
    font-family: 'Chivo', sans-serif;
    font-weight: bold;
    
    &:hover {
      cursor: pointer;
    }
  }
  
  .interact {
    color: ${(props: { theme: Theme }) => props.theme.secondaryColor };
    &:hover {
      cursor: pointer;
      color: ${(props: { theme: Theme }) => props.theme.interactableColor };
    }
  }
`

const LogoDot = styled.div`
  position: relative;
  display: block;

  top: 36px;

  width: 6px;
  height: 6px;

  border-radius: 50%;
  background-color: ${(props: { theme: Theme }) => props.theme.accentColor};
`

const BetaBadge = styled.div`
  font-size: 8px;
  font-weight: 700;

  color: ${(props: { theme: Theme }) => props.theme.accentColor};
  border: 1px solid ${(props: { theme: Theme }) => props.theme.accentColor};

  border-radius: 8px;

  height: fit-content;
  margin: 25px 20px 0 10px;
  padding: 2px 10px;
`

const HeaderNavigation = styled.nav`
  display: flex;
  font-weight: bold;
  font-size: 18px;
`

const AccountNavSection = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 15px;
  
  display: flex;
  align-items: center;
  gap: 5px;
  
  .material-icons {
    font-size: 30px;
  }
  
  .material-symbols-rounded {
    font-size: 32px;
    margin-right: 12px;
  }
`

const AccountMenu = styled(Menu)`
  position: absolute;
  
  top: 58px;
  left: 22px;
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

const NavLink = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor};

  height: 100%;
  padding: 0 20px;
  z-index: 6;

  &:hover {
    cursor: pointer;
    color: ${(props: { theme: Theme }) => props.theme.interactableColor};
  }
`

const NavDropmenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 10px 0 20px;

  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor} !important;
  z-index: 6;

  &:hover {
    p, span {
      color: ${(props: { theme: Theme }) => props.theme.interactableColor};
    }
  }
  
  .tools-menu-list {
    position: absolute;
    z-index: 10;
    
    top: 50px;
    left: 2.5px;
    
    p {
      font-weight: normal;
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
    });

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

    return (
        <StyledHeader>
            <h1 onClick={() => nav('/home')}>Unitor</h1>
            <LogoDot /> 
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
                <NavDropmenu ref={nav5} selected={navState.navLinkSelection[4]} onClick={() => setDropdownShown(true)}>
                    <p>Tools</p>
                    <span className="material-icons">expand_{dropdownShown ? 'less' : 'more'}</span>
                    <Menu isOpen={dropdownShown} options={toolsOptions} className={'tools-menu-list'}
                          onClose={() => setDropdownShown(false)}/>
                </NavDropmenu>
                <NavIndicator left={navState.indicatorLeft} width={navState.indicatorWidth}/>
            </HeaderNavigation>
            <AccountNavSection>
                <span className='material-symbols-rounded interact'>notifications</span>
                <AvatarCircle onClick={() => setAccountMenuShown(true)} className='avatar' src='none'/>
                <AccountMenu isOpen={accountMenuShown} options={accountOptions} className={'account-menu'}
                      onClose={() => setAccountMenuShown(false)}/>
            </AccountNavSection>
        </StyledHeader>
    );
}

export default Header;
//TRY TO MAKE A ON MOUSE OUT REACT HOOK. MAYBE THEN REPLACE WHEN CLICK OUTSIDE COMPONENT PACKAGE. //// replaced the package with my own solution. The mouse out hook is not needed anymore. //// DONE
//Add hover animations //// DONE
//Change the pointer on hover on clickable items //// DONE
//Remove the spaces between menu buttons. //// DONE
//Add animations when opening menus //// DONE
//Maybe add a gray indicator on hover
//Give better names to the variables once everything is done...
//Split into components... please... do that...
//Add indicator position update
//Fix tool menu highlighting