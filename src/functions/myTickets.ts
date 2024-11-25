/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { TicketLocalService } from "../services/TicketLocalService";
import { CreateTicketRequest, StatusEnum } from "../services/TicketService";
import { info, setLogContext } from "../services/log";

class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

/**
 * This function handles the HTTP request and returns the ticket information.
 *
 * @param {HttpRequest} req - The HTTP request.
 * @param {InvocationContext} context - The Azure Functions context object.
 * @returns {Promise<Response>} - A promise that resolves with the HTTP response containing the ticket information.
 */
export async function myTickets(
    req: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    setLogContext(context);
    context.log("HTTP trigger function processed a request.");

    // Initialize response.
    const res: HttpResponseInit = {
        status: 200,
        jsonBody: {
            results: null,
        },
    };
    const ticketService = new TicketLocalService();
    const defaultCreator = "Sonia Rees";
    try {
        switch (req.method) {
            case "GET":
                let title = req.query.get("title")?.toString().toLowerCase() || null;
                let priority = req.query.get("priority")?.toString().toLowerCase() || null;
                let status = req.query.get("status")?.toString().toLowerCase() || null;
                const id = req.params?.id?.toLowerCase();
                info(`getTicket-id: ${id}`);

                if (id) {
                    info(`getTicket-id is not null: ${id}`);
                    const result = await ticketService.getTicketById(id);
                    res.jsonBody = result;
                    info(`getTicket: ${result}`);

                } else {
                    info(`getTicket-id is null: ${id}`);
                    const result = await ticketService.getTickets(defaultCreator, title, priority, status);
                    res.jsonBody = result;
                    info(`getTickets: ${defaultCreator}, priority: ${priority}`);
                }

                break;
            case "POST":
                let body: CreateTicketRequest = null;
                try {
                    const bd = await req.text();
                    body = JSON.parse(bd) as CreateTicketRequest;
                } catch (error) {
                    throw new HttpError(400, `No body to process this request.`);
                }
                if (body) {
                    const result = await ticketService.createTicket(defaultCreator, body);
                    res.jsonBody = result;
                    info(`createTicket: ${defaultCreator}`, result);
                }
                break;
            default:
                res.status = 405;
                res.jsonBody = { error: "Method not allowed" };
                return res;
        }

    } catch (error) {
        const status = <number>error.status || <number>error.response?.status || 500;
        info(`Returning error status code ${status}: ${error.message}`);
        info("error", error);

        res.status = status;
        res.jsonBody.results = {
            status: status,
            message: error.message
        };
    }
    return res;
}

app.http("tickets", {
    methods: ["GET", "POST"],
    authLevel: "anonymous",
    route: "me/tickets/{*id}",
    handler: myTickets,
});
