import {Outlet, useNavigate, useLocation} from "react-router-dom";
import {useReducer, useRef, useEffect} from "react";
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
  font-weight: bold;
  margin-left: 20px;
`

const NavLink = styled.p`
  color: ${(props: { theme: Theme, selected: boolean }) => props.selected ? props.theme.interactableColor : props.theme.secondaryColor};
  float: left;
  height: 100%;
  line-height: 45px;
  padding: 0 20px;
`

const NavIndicator = styled.div`
  position: absolute;
  background-color: ${(props: IndicatorProps) => props.theme.accentColor};

  height: 2px;
  bottom: 0;

  width: ${(props: IndicatorProps) => props.width}px;
  left: ${(props: IndicatorProps) => props.left}px;

  transition: left 0.3s ease-out, width 0.3s ease-in;
`

const NavDropmenu = styled.div`
  height: 100%;
  float: left;
  padding: 0 20px;
  line-height: 45px;

  p {
    float: left;
  }

  span {
    float: left;
    height: 100%;
    line-height: 45px;
    transform: translateY(-1px);
  }
`

type IndicatorProps = { left: number, width: number, theme: Theme }

function Header() {
    const navSelectionInitState = {
        selections: [false, true, false, false],
        indicatorLeft: 265,
        indicatorWidth: 73
    }

    type NavState = typeof navSelectionInitState

    const nav = useNavigate();
    const location = useLocation();

    const nav1 = useRef<HTMLParagraphElement>(null);
    const nav2 = useRef<HTMLParagraphElement>(null);
    const nav3 = useRef<HTMLParagraphElement>(null);
    const nav4 = useRef<HTMLParagraphElement>(null);

    const navs = [nav1, nav2, nav3, nav4];

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
            default: index = -1;
                break;
        }

        dispatchNavState(index);
    }, [location])

    function navSelectionHandler(state: NavState, index: number) {
        if (state.selections.indexOf(true) === index) {
            return state;
        }

        let selections = [false, false, false, false];
        selections[index] = true;
        switch (index) {
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
        }

        return {
            selections: selections,
            indicatorWidth: navs[index].current!.offsetWidth,
            indicatorLeft: navs[index].current!.offsetLeft,
        }
    }

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
                    <NavDropmenu>
                        <p>Tools</p>
                        <span className="material-icons">expand_more</span>
                    </NavDropmenu>
                    <NavIndicator left={navState.indicatorLeft} width={navState.indicatorWidth}/>
                </HeaderNavigation>
            </StyledHeader>
            <Outlet/>
        </>
    );
}

export default Header;