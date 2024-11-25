export enum PriorityEnum {
    Low = 'Low',
    Normal = 'Normal',
    High = 'High',
    Critical = 'Critical'
}
export enum StatusEnum {
    Open = 'Open',
    InProgress = 'InProgress',
    Closed = 'Closed'
}
export interface MyTicket {
    id: string;
    title: string;
    description: string;
    priority: string;
    assignee: string;
    url: string;
    creationDate: string;
    updateDate: string;
    status: string;
}
export interface Ticket extends MyTicket {
    creator?: string;
}

export interface CreateTicketRequest {
    title: string;
    description: string;
    priority: PriorityEnum;
}

export interface GetMyTicketResult {
    results: MyTicket[];
}

export interface CreateMyTicketResult {
    results: MyTicket;
}

export interface Assignee {
    id: string;
    email: string;
}

export interface TicketService {
    getTicketById(id: string): Promise<CreateMyTicketResult>;
    getTickets(creator: string, title?: string, priority?: string, status?: string): Promise<GetMyTicketResult>;
    createTicket(creator: string, ticket: CreateTicketRequest): Promise<CreateMyTicketResult>;
}