export interface Activity {
    id: string,

    startTime : Number,
    endTime: Number,
    duration: Number,
    colorStamp?: string | undefined,

    title: string,
    teacher?: string | undefined,
    place?: string | undefined,

    assignment: boolean,
    exam: boolean,
}

export type ActivityWeek = [
    Activity[],
    Activity[],
    Activity[],
    Activity[],
    Activity[],
    Activity[],
    Activity[],
]

export default interface ScheduleData {
    data : ActivityWeek
}