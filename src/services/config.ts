const config = {
    cosmosDbConfig: {
        CosmosDbEndPoint: process.env.COSMOSDBENDPOINT,
        CosmosDbId: process.env.COSMOSDBID,
        CosmosDbContainerId_APIKeys: "APIKeys",
        CosmosDbContainerId_Tickets: "Tickets",
        CosmosDbContainerId_Assignees: "Assignees",
    }
};

export default config;
