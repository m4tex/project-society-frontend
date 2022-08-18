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
  
  overflow: hidden;
  
  .scroll-thumb-horizontal {
    background-color: ${(props: { theme: Theme }) => props.theme.tertiaryColor };
    border-radius: 3px;
    margin-right: 5px;
  }
`;

function Schedule(props: { data : ActivityWeek }) {
    return (
        <ScheduleBody>
            <Scrollbars renderThumbHorizontal={ props => <div {...props} className='scroll-thumb-horizontal' /> }>
                <div style={{width:'950px', backgroundColor:'darkgray'}}>AAA</div>
            </Scrollbars>
        </ScheduleBody>
    );
}

export default Schedule;