export enum RequestStatus {
    New = 0,
    Pending = 1,
    Rejected = 2,
    Reviewed = 3,
    Scheduled = 4,
    Unavailable = 5,
    Approved = 6,
    Completed = 7
}

export enum Ministry {
    ENV = 'ENV',
    FIN = 'FIN',
    FOR = 'FOR',
    HLTH = 'HLTH',
    HOUS = 'HOUS'
}

export enum RequestType {
    Information = 0,
    Interview = 1,
    ScrumHalls = 2
}