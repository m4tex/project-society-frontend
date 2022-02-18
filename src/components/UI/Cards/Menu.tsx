import styled from 'styled-components';
import Theme from '../../../types/Theme';
import MenuCard from "./MenuCard";
import {useDetectClickOutside} from 'react-detect-click-outside';

const StyledMenuCard = styled(MenuCard)`
    display: flex;
    flex-direction: column;
`

const Option = styled.p`
  color: ${(props : {theme: Theme }) => props.theme.secondaryColor};
  position: relative;
  display: inline-block;
  
  &:not(:first-child){
    padding-top: 10px;
  }
  
  &:not(:last-child){
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 10px;
  }
  
  &:hover {
    cursor: pointer;
    color: ${(props : {theme: Theme }) => props.theme.interactableColor};
  }
`

interface MenuOption { name:string, click:()=>void }

function Menu(props : { options:MenuOption[], className:string, onClose:()=>void }) {
    const ref = useDetectClickOutside({onTriggered: props.onClose})

    return (
        <StyledMenuCard className={props.className} ref={ref}>
            {props.options.map(option => <Option key={Math.random()} onClick={option.click}>{option.name}</Option>)}
        </StyledMenuCard>
    );
}

export default Menu;