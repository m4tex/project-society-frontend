import styled from "styled-components";
import Schedule from "../components/schedule/Schedule";
import ScheduleEditor from "../components/schedule/ScheduleEditor";
import ScheduleControls from "../components/schedule/ScheduleControls";
import ScheduleData from "../types/ScheduleData";

const PageLayout = styled.div`
  display: flex;
  gap: 6px;
  height: 100%;
`

const ACTIVITY = {
    id: Math.random().toString(),

    startTime: 600,
    endTime: 690,
    duration: 90,

    title: 'Meth cooking nice B)',
    teacher: 'Walter White :O',
    place: 'Da RV BABY!!!',

    assignment: false,
    exam: false,
}

const DUMMY_DATA = {
    data: [
        [ACTIVITY],
        [ACTIVITY],
        [ACTIVITY],
        [ACTIVITY],
        [ACTIVITY],
        [ACTIVITY],
        [ACTIVITY],
    ],
} as ScheduleData

function SchedulePage() {
    return (
        <PageLayout>
            <ScheduleEditor/>
            <Schedule data={DUMMY_DATA.data}/>
            <ScheduleControls/>
        </PageLayout>
    );
}

export default SchedulePage;