import styled from "styled-components";
import Theme from "../../../types/Theme";

const Card = styled.div`
  background-color: ${(props : {theme: Theme}) => props.theme.primaryColor};
  border-radius: 10px;
  border: solid 1px rgba(0, 0, 0, 0.2);
`

export default Card;