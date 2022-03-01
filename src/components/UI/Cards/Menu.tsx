import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import {useRef, useEffect} from "react";
import {animated, useTransition} from "react-spring";

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

function Menu(props: { trigger: boolean, options: MenuOption[], className: string, onClose: () => void }) {
    const transition = useTransition(props.trigger, {
        from: {opacity: 0},
        enter: {opacity: 1},
        leave: {opacity: 0}
    })

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            console.log(props.trigger)
            // @ts-ignore
            if(props.trigger && ref.current && !ref.current.contains(event.target)){
                props.onClose();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [props.trigger]);

    return transition((style, item) => item ?
        <StyledMenuCard as={animated.div} className={props.className} style={style} ref={ref}>
            {props.options.map(option => <Option key={Math.random()} onClick={option.click}>{option.name}</Option>)}
        </StyledMenuCard>
        : null
    )
}

export default Menu;