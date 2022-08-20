import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import React, {useEffect} from "react";
import {animated, useTransition} from "react-spring";

const StyledMenuCard = styled(MenuCard)`
  display: flex;
  flex-direction: column;
`;

const Option = styled.p`
  position: relative;
  display: inline-block;
  padding: 10px .8em;
  
  //Sub-pixel rendering fix
  right: -1px;
  transform: translateX(-1px);
  
  &:last-child {
    bottom: -1px;
    transform: translate(-1px, -1px);
  }
  
  text-align: center;
  font-size: 14px;
  white-space: nowrap;

  color: ${(props: { theme: Theme }) => props.theme.secondaryColor};
  
  &:hover {
    cursor: pointer;
    color: ${(props: { theme: Theme }) => props.theme.interactableColor};
    
    &:first-child {
      border-radius: 9px 9px 0 0;
    }
    
    &:last-child {
      border-radius: 0 0 9px 9px;
    }
    
    background-color: rgba(0, 0, 0, 0.05);
    
    transition: all 100ms ease-in;
  }
`;

interface MenuOption {
    name: string,
    click: () => void
}

function Menu(props: { isOpen: boolean, options: MenuOption[], className: string, onClose: () => void}) {
    const transition = useTransition(props.isOpen, {
        from: {transform: 'scale(70%)', opacity: 0},
        enter: {transform: 'scale(100%)', opacity: 1},
        leave: {transform: 'scale(70%)', opacity: 0},
        config: {duration: 100}
    });

    useEffect(() => {
        function handleClick() {
            if (props.isOpen) {
                props.onClose();
            }
        }
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [props.isOpen]);

    return transition((style, item) => item ?
        <StyledMenuCard as={animated.div} className={props.className} style={style}>
            { props.options.map((option, index) =>
                <Option key={'option' + index} onClick={option.click}>{option.name}</Option>
            )}
        </StyledMenuCard> : null
    )
}

export default Menu;