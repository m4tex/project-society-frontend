import React from 'react';
import styled from "styled-components";
import {ActivityWeek} from "../../types/ScheduleData";
import Theme from "../../types/Theme";
import Scrollbars from "react-custom-scrollbars-2";

const ScheduleBody = styled.div`
  width: 900px;
  
  background-color: #FAFAFA;
  margin-top: 12px;
  margin-bottom: 6px;
  border: 1px solid ${(props: { theme: Theme }) => props.theme.tertiaryColor};
  border-radius: 8px;
  
  .scroll-thumb-horizontal {
    background-color: ${(props: { theme: Theme }) => props.theme.tertiaryColor };
    border-radius: 3px;
    margin-right: 5px;
  }
`;

function Schedule(props: { data : ActivityWeek }) {
    return (
        <ScheduleBody>
            <Scrollbars style={{left:'-1px', transform:'translateX(1px)'}} renderThumbHorizontal={ props => <div {...props} className='scroll-thumb-horizontal' /> }>

            </Scrollbars>
        </ScheduleBody>
    );
}

export default Schedule;