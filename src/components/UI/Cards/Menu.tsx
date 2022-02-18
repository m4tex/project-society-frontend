import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import { useRef, useEffect } from "react";

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
};

function Menu(props: { options: MenuOption[], className: string, onClose: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    function handleClick(event:MouseEvent){
        // @ts-ignore
        if(ref.current === null || ref.current!.contains(event.target)){
            console.log('the click was in component')
            return;
        }
        //Click outside the component

        console.log('the click was outside the component.')
        props.onClose();
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <StyledMenuCard className={props.className} ref={ref}>
            {props.options.map(option => <Option key={Math.random()} onClick={option.click}>{option.name}</Option>)}
        </StyledMenuCard>
    );
}

export default Menu;