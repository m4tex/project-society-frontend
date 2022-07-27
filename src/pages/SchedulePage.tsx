import styled from "styled-components";

const PageLayout = styled.div`
  display: flex;
  gap: 6px;
`

function SchedulePage() {
    return (
        <PageLayout>
            HEWWOW
            <ScheduleEditor />
        </PageLayout>
    );
}

export default SchedulePage;