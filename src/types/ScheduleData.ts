export interface Activity {
    id: string,

    startTime : Number,
    endTime: Number,
    duration: Number,
    colorStamp: string | null,

    title: string,
    teacher: string | null,
    place: string | null,

    assignment: boolean,
    exam: boolean,
}

export default interface ScheduleData {
    data : [
            Activity[],
            Activity[],
            Activity[],
            Activity[],
            Activity[],
            Activity[],
            Activity[],
        ]
}