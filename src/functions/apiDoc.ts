/* This code sample provides a starter kit to implement server side logic for your Teams App in TypeScript,
 * refer to https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference for complete Azure Functions
 * developer guide.
 */

import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

import { apiDocumentation } from "../docs/apidoc";

/**
 * This function handles the HTTP request and returns the ticket API's OPEN API doc.
 *
 * @param {HttpRequest} req - The HTTP request.
 * @param {InvocationContext} context - The Azure Functions context object.
 * @returns {Promise<Response>} - A promise that resolves with the HTTP response containing the OPEN API doc information.
 */
export async function apiDoc(
    req: HttpRequest,
    context: InvocationContext
): Promise<HttpResponseInit> {
    context.log("HTTP trigger function processed a request.");

    // Initialize response.
    const res: HttpResponseInit = {
        status: 200,
        jsonBody: apiDocumentation()
    };

    return res;
}

app.http("apidoc", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "api-docs/swagger.json",
    handler: apiDoc,
});
