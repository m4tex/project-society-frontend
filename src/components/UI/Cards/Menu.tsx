import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import {useRef, useEffect} from "react";
import {CSSTransition} from "react-transition-group";

const StyledMenuCard = styled(MenuCard)`
  display: flex;
  flex-direction: column;

  @keyframes transition-anim {
    0% {
      width: 0;
      height: 0;

      p {
        opacity: 0;
      }
    }
    50% {
      width: auto;
      height: auto;
    }
    100% {
      p {
        opacity: 1;
      }
    }
  }

  .t-enter-active {
    color: darkmagenta;
    opacity: 0.5;
  }

  .t-exit-active {
    color: aqua;
    opacity: .1;
  }
`;

const Option = styled.p`
  color: ${(props: { theme: Theme }) => props.theme.secondaryColor};
  position: relative;
  display: inline-block;
  text-align: center;

  &:not(:first-child) {
    padding-top: 10px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
  }

  &:last-child {
    padding-bottom: 10px;
  }

  &:hover {
    cursor: pointer;
    color: ${(props: { theme: Theme }) => props.theme.interactableColor};
  }
`;

interface MenuOption {
    name: string,
    click: () => void
}

function Menu(props: {
    timeout: number, classNames: string, trigger: boolean,
    options: MenuOption[], className: string, onClose: () => void
}) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            // if (props.trigger) {
                props.onClose();
            // }
        }

        document.addEventListener('click', handleClick);

        // return () => {
        //     document.removeEventListener('click', handleClick);
        // }
    }, []);

    return (
        <CSSTransition in={props.trigger} classNames={props.classNames} timeout={props.timeout} mountOnEnter
                       unmountOnExit>
            <StyledMenuCard className={props.className} ref={ref}>
                {props.options.map(option => <Option key={Math.random()} onClick={option.click}>{option.name}</Option>)}
            </StyledMenuCard>
        </CSSTransition>
    );
}

export default Menu;