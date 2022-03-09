import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import React, {useRef, useEffect} from "react";
import {animated, useTransition } from "react-spring";
import useResizeAware from 'react-resize-aware';

const StyledMenuCard = styled(MenuCard)`
  display: flex;
  flex-direction: column;
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

function Menu(props: { trigger: boolean, options: MenuOption[], className: string, onClose: () => void,
    parent?: React.RefObject<HTMLDivElement>, h:number}) {

    const transition = useTransition(props.trigger, {
        from: {height: 0, opacity: 0},
        enter: {height: props.h, opacity:1},
        leave: {opacity: 0},
        config: {duration: 100}
    });

    const ref = useRef<HTMLDivElement>(null);

    //Detecting when the user clicks outside of the component
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (props.trigger && ref.current) {
                if (props.parent?.current) {
                    // @ts-ignore
                    if (!props.parent.current.contains(event.target)) {
                        console.log('ignore exists..');
                        props.onClose();
                    }
                } else
                    // @ts-ignore
                if (!ref.current.contains(event.target)) {
                    console.log('on close');
                    props.onClose();
                }
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, [props.trigger]);

    return transition((style, item) => item ?
        <StyledMenuCard as={animated.div} className={props.className} style={style} ref={ref}>
            {props.options.map((option, index) => <Option key={'option'+index} onClick={option.click}>{option.name}</Option>)}
        </StyledMenuCard>
        : null
    )
}

export default Menu;