import styled from "styled-components";
import ScheduleEditor from "../components/schedule/ScheduleEditor";

const PageLayout = styled.div`
  display: flex;
  gap: 6px;
  height: 100%;
`

const TempDiv = styled.div`
    
`

function SchedulePage() {
    return (
        <PageLayout>
            <ScheduleEditor />
            <TempDiv>stuff</TempDiv>
        </PageLayout>
    );
}

export default SchedulePage;