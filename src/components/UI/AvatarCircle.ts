import styled from "styled-components";

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props : { src:string }) => props.src === 'none' ? 'gray' : props.src };
`;

export default AvatarCircle;