import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {useReducer, useRef, useEffect, useState} from "react";
import styled from "styled-components";
import Theme from "../../types/Theme";
import Menu from "../UI/Cards/Menu";

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
`

const NavDropmenu = styled.div`
  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor};
  position: relative;
  height: 100%;
  float: left;
  padding: 0 20px;
  line-height: 65px;
  z-index: 6;

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
    position: relative;
    width: 70px;
  
    top: 5px;
    left: -85px;
    
    border-radius: 18px;
    text-align: center;


    p {
      font-size: 12px;
      line-height: normal;

      position: inherit;

      &:first-child {
        margin-top: 40px;
      }
    }
  }
`

type IndicatorProps = { left: number, width: number, theme: Theme }

function Header() {
    //region stuff I will rarely change
    const [dropdownShown, setDropdownShown] = useState(false);

    function navDropMenuHandler() {
        setDropdownShown((prevState => !prevState));
    }

    //endregion
    //region navigation selection variables
    const navSelectionInitState = {
        selections: [false, true, false, false, false],
        indicatorLeft: 94,
        indicatorWidth: 122
    }

    type NavState = typeof navSelectionInitState

    const nav = useNavigate();
    const location = useLocation();

    const nav1 = useRef<HTMLParagraphElement>(null);
    const nav2 = useRef<HTMLParagraphElement>(null);
    const nav3 = useRef<HTMLParagraphElement>(null);
    const nav4 = useRef<HTMLParagraphElement>(null);
    const nav5 = useRef<HTMLDivElement>(null);

    const navs = [nav1, nav2, nav3, nav4, nav5];

    const [navState, dispatchNavState] = useReducer(navSelectionHandler, navSelectionInitState)

    //In case the user navigates the website by changing the URL
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
            default:
                index = -1;
                break;
            case '/pomodoro':
                index = 4;
                break;
            case '/learn':
                index = 5;
                break;
        }

        dispatchNavState(index);
    }, [location])

    function navSelectionHandler(state: NavState, _index: number) {
        const index = _index > 4 ? 4 : _index;

        if (state.selections.indexOf(true) === index) {
            return state;
        }
        if (dropdownShown) {
            navDropMenuHandler()
        }


        let selections = [false, false, false, false, false];
        selections[index] = true;
        console.log(_index)
        switch (_index) {
            case 0:
                nav('/home');
                break;
            case 1:
                nav('/');
                break;
            case 2:
                nav('/classroom');
                break;
            case 3:
                nav('/overview');
                break;
            case 4:
                nav('/pomodoro');
                break;
            case 5:
                nav('/learn');
                break;
        }

        return {
            selections: selections,
            indicatorWidth: navs[index].current!.offsetWidth,
            indicatorLeft: navs[index].current!.offsetLeft,
        }
    }

    //endregion

    const toolsOptions = [
        {name: 'Pomodoro', click: () => dispatchNavState(4)},
        {name: 'Learn', click: () => dispatchNavState(5)}
    ]

    return (
        <>
            <StyledHeader>
                <h1>Unitor
                    <div className='logo-dot'/>
                </h1>
                <BetaBadge>Beta</BetaBadge>
                <HeaderNavigation>
                    <NavLink selected={navState.selections[0]} ref={nav1}
                             onClick={() => dispatchNavState(0)}>Home</NavLink>
                    <NavLink selected={navState.selections[1]} ref={nav2}
                             onClick={() => dispatchNavState(1)}>Schedule</NavLink>
                    <NavLink selected={navState.selections[2]} ref={nav3}
                             onClick={() => dispatchNavState(2)}>Classroom</NavLink>
                    <NavLink selected={navState.selections[3]} ref={nav4}
                             onClick={() => dispatchNavState(3)}>Overview</NavLink>
                    <NavDropmenu ref={nav5} selected={navState.selections[4]} onClick={navDropMenuHandler}>
                        <p>Tools</p>
                        <span className="material-icons">expand_{dropdownShown ? 'less' : 'more'}</span>
                        {dropdownShown && <Menu className='tools-menu-list' options={toolsOptions}/>}
                    </NavDropmenu>
                    <NavIndicator left={navState.indicatorLeft} width={navState.indicatorWidth}/>
                </HeaderNavigation>
            </StyledHeader>
            <Outlet/>
        </>
    );
}

export default Header; // REMOVE THE NAVVING IN DISPATCH NEW NAV SELECTION