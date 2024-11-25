import { securitySchemasDoc } from "./securitydoc";
import { getMyTicketsDoc, createMyTicketDoc, ticketSchemas } from "./ticketdoc";

export const apiDocumentation = (hostname: string = "ezcode.ngrok.io") => ({
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Ticket API - Documentation',
        description: 'Description of Ticket API',
        termsOfService: 'https://mysite.com/terms',
        contact: {
            name: 'Developer name',
            email: 'dev@example.com',
            url: 'https://devwebsite.com',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
        },
    },
    servers: [
        {
            url: `https://${hostname}/`,
            description: 'Production Server',
        }
    ],
    tags: [
        {
            name: 'Ticket',
        }
    ],
    paths: {
        '/api/me/tickets': {
            get: getMyTicketsDoc,
            post: createMyTicketDoc,
        },
    },
    components: {
        securitySchemes: securitySchemasDoc,
        schemas: {
            ...ticketSchemas,
        },
    },
});
