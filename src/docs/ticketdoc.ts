import { PriorityEnum, StatusEnum } from "../services/TicketService"

export const ticketSchemas = {
    "ticketId": {
        "type": "string",
        "description": "The ticket ID",
        "example": "TK1731142105634"
    },
    "ticketPriority": {
        "type": "string",
        enum: Object.values(PriorityEnum),
        "description": "The priority of the ticket",
        "example": "Normal"
    },
    "ticketStatus": {
        "type": "string",
        enum: Object.values(StatusEnum),
        "description": "The status of the ticket",
        "example": "Open"
    },
    "ticketTitle": {
        "type": "string",
        "description": "The title of the ticket",
        "example": "Title of the ticket"
    },
    "ticketDescription": {
        "type": "string",
        "description": "The description of the ticket",
        "example": "Description of the ticket"
    },
    "ticketCreationDate": {
        "type": "string",
        "description": "The creation date of the ticket",
        "example": "2021-09-01T00:00:00Z"
    },
    "ticketUpdateDate": {
        "type": "string",
        "description": "The update date of the ticket",
        "example": "2021-09-01T00:00:00Z"
    },
    "ticketAssignee": {
        "type": "string",
        "description": "The assignee of the ticket",
        "example": "frank@m365cpi78904853.onmicrosoft.com"
    },
    "ticketUrl": {
        "type": "string",
        "description": "The URL of the ticket",
        "example": "https://ezcode.org/api/me/tickets/TK1234567890"
    },
    "MyTicket": {
        "type": "object",
        "properties": {
            "id": {
                $ref: "#/components/schemas/ticketId"
            },
            "title": {
                $ref: "#/components/schemas/ticketTitle"
            },
            "description": {
                $ref: "#/components/schemas/ticketDescription"
            },
            "priority": {
                $ref: "#/components/schemas/ticketPriority"
            },
            "assignee": {
                $ref: "#/components/schemas/ticketAssignee"
            },
            "url": {
                $ref: "#/components/schemas/ticketUrl"
            },
            "status": {
                $ref: "#/components/schemas/ticketStatus"
            },
            "creationDate": {
                $ref: "#/components/schemas/ticketCreationDate"
            },
            "updateDate": {
                $ref: "#/components/schemas/ticketUpdateDate"
            }
        }
    },
    "CreateMyTicketRequest": {
        "type": "object",
        "properties": {
            "title": {
                $ref: "#/components/schemas/ticketTitle"
            },
            "description": {
                $ref: "#/components/schemas/ticketDescription"
            },
            "priority": {
                $ref: "#/components/schemas/ticketDescription"
            }
        }
    },
    "GetMyTicketResult": {
        "type": "object",
        "properties": {
            "results": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/MyTicket"
                }
            }
        }
    },
    "CreateMyTicketResult": {
        "type": "object",
        "properties": {
            "results": {
                $ref: "#/components/schemas/MyTicket"
            }
        }
    }
}

export const getMyTicketsDoc = {
    tags: [
        "Ticket"
    ],
    summary: "Get my ticket based on optional title, priority and/or status query parameters",
    description: "Get my ticket by query",
    operationId: "getMyticket",
    parameters: [
        {
            name: "title",
            in: "query",
            description: "the title of the ticket",
            schema: {
                type: "string"
            }
        },
        {
            name: "priority",
            in: "query",
            description: "the priority of the ticket which can be Low, Normal, High, Critical",
            schema: {
                type: "string"
            }
        },
        {
            name: "status",
            in: "query",
            description: "the status of the ticket which can be Open, InProgress, Closed",
            schema: {
                type: "string"
            }
        }
    ],
    responses: {
        200: {
            description: "Successful operation",
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/GetMyTicketResult"
                    }
                }
            }
        },
        400: {
            description: "Invalid parameters"
        },
        401: {
            description: "Unauthorized"
        }
    },
    security: [
        {
            "bearerAuth": []
        }
    ]
}
export const createMyTicketDoc = {
    tags: [
        "Ticket"
    ],
    summary: "Create a ticket on behalf of the logged in user and return the created ticket information including ticket id, title, description, priority, creator and url",
    description: "Create a ticket on behalf of the logged in user and return the created ticket information",
    operationId: "createMyTicket",
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/CreateMyTicketRequest'
                }
            }
        },
        required: true
    },
    responses: {
        200: {
            description: "Successful operation",
            content: {
                'application/json': {
                    schema: {
                        $ref: "#/components/schemas/CreateMyTicketResult"
                    }
                }
            }
        },
        400: {
            description: "Invalid CreateMyTicketRequest"
        },
        401: {
            description: "Unauthorized"
        }
    },
    security: [
        {
            "bearerAuth": []
        }
    ]

}