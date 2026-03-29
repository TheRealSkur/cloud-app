const { CosmosClient } = require("@azure/cosmos");

async function initCosmos() {
  const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
  });

  await client.databases.createIfNotExists({
    id: process.env.COSMOS_DATABASE,
  });

  const db = client.database(process.env.COSMOS_DATABASE);

  await db.containers.createIfNotExists({
    id: process.env.COSMOS_CONTAINER,
    partitionKey: { paths: ["/id"] },
  });

  return {
    client,
    db,
    container: db.container(process.env.COSMOS_CONTAINER),
  };
}

module.exports = { initCosmos };