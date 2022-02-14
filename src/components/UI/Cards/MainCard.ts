import styled from "styled-components";
import Theme from "../../../types/Theme";

const Card = styled.div`
  background-color: ${(props : {theme: Theme}) => props.theme.primaryColor};
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`

export default Card;