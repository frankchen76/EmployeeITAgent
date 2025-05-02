import { info } from 'console';
import { CreateMyTicketResult, MyTicket, GetMyTicketResult, TicketService, CreateTicketRequest, PriorityEnum, StatusEnum, Ticket } from './TicketService';
import { stat } from 'fs';
import ticketRecords from "../data/SampleTickets.json";
import assigneeRecords from "../data/SampleAssignees.json";
import { randomUUID } from 'crypto';

export class TicketLocalService implements TicketService {
    private static tickets: MyTicket[] = null;
    private getTicketsInstance = (): Ticket[] => {
        if (!TicketLocalService.tickets) {
            TicketLocalService.tickets = ticketRecords;
        }
        return TicketLocalService.tickets;
    }
    private getNextAssignee(): string {
        const i = Math.random() * 3;
        return assigneeRecords[Math.floor(i)].email;
    }
    async createTicket(creator: string, ticketRequest: CreateTicketRequest): Promise<CreateMyTicketResult> {
        console.log(`createTicket:`, ticketRequest);
        return new Promise<CreateMyTicketResult>((resolve, reject) => {
            const id = randomUUID();
            const newMyTicket: MyTicket = {
                ...ticketRequest,
                id: id,
                status: StatusEnum.Open,
                creationDate: new Date().toISOString(),
                updateDate: new Date().toISOString(),
                assignee: this.getNextAssignee(),
                url: `${process.env.OPENAPI_SERVER_URL}/api/me/tickets/${id}`
            };
            const newTicket: Ticket = {
                ...newMyTicket,
                creator: creator
            }
            let sampleTickets = this.getTicketsInstance();
            sampleTickets.push(newTicket);
            info(`New Ticket was created:`, newMyTicket);
            resolve({
                results: newMyTicket
            });
        });
    }
    async getTickets(creator?: string, title?: string, priority?: string, status?: string): Promise<GetMyTicketResult> {
        info(`getTickets: creator:${creator}; title: ${title}; priority: ${priority}; status: ${status}`);
        return new Promise<GetMyTicketResult>((resolve, reject) => {
            const sampleTickets = this.getTicketsInstance();
            const tickets = sampleTickets.map((item: Ticket) => {
                if ((!priority || item.priority.toLowerCase() === priority.toLowerCase()) &&
                    (!status || item.status.toLowerCase() === status.toLowerCase()) &&
                    (!title || item.title.toLowerCase().includes(title.toLowerCase())) &&
                    (!creator || item.creator.toLowerCase() === creator.toLowerCase())) {

                    let cloneItem = { ...item };
                    delete cloneItem.creator;

                    cloneItem.updateDate = new Date().toISOString();
                    cloneItem.url = `${process.env.OPENAPI_SERVER_URL}/api/me/tickets/${item.id}`;
                    return cloneItem;
                }
            });
            resolve({
                results: tickets
            });
        });

    }
    async getTicketById(id: string): Promise<CreateMyTicketResult> {
        info(`getTicket: id:${id}`);
        return new Promise<CreateMyTicketResult>((resolve, reject) => {
            const sampleTickets = this.getTicketsInstance();
            const ticket = sampleTickets.find((item: Ticket) => item.id === id);
            if (ticket) {
                let cloneItem = { ...ticket };
                delete cloneItem.creator;
                cloneItem.updateDate = new Date().toISOString();
                cloneItem.url = `${process.env.OPENAPI_SERVER_URL}/api/me/tickets/${ticket.id}`;
                resolve({
                    results: cloneItem
                });
            } else {
                reject(new Error(`Ticket with id ${id} not found`));
            }
        });
    }
}
