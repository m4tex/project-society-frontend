import styled from "styled-components";
import Theme from "../../../types/Theme";

const Card = styled.div`
  background-color: ${(props : {theme: Theme}) => props.theme.primaryColor};
  border-radius: 10px;
  padding: 10px;
`

export default Card;