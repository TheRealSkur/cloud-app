const express = require("express");
const cors = require("cors");
const { CosmosClient } = require("@azure/cosmos");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
app.use(cors());
app.use(express.json());

const endpoint = "https://cosmosdb:8081/";
const key =
  "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

const client = new CosmosClient({
  endpoint,
  key,
  connectionPolicy: {
    enableEndpointDiscovery: false,
  },
});

const databaseId = "TaskDb";
const containerId = "Tasks";
let container;

async function initCosmos() {
  const { database } = await client.databases.createIfNotExists({
    id: databaseId,
  });

  const { container: createdContainer } =
    await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: {
        paths: ["/id"],
      },
    });

  container = createdContainer;
  console.log("Połączono z CosmosDB");
}

app.get("/tasks", async (req, res) => {
  try {
    const { resources } = await container.items
      .query({ query: "SELECT * FROM c" })
      .fetchAll();

    res.json(resources);
  } catch (error) {
    console.error("GET /tasks error:", error);
    res.status(500).json({ message: "Błąd odczytu zadań" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const item = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
    };

    const { resource } = await container.items.upsert(item);
    res.status(201).json(resource);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ message: "Błąd zapisu zadania" });
  }
});

initCosmos()
  .then(() => {
    app.listen(8081, "0.0.0.0", () => {
      console.log("Backend działa na porcie 8081");
    });
  })
  .catch((error) => {
    console.error("Błąd połączenia z CosmosDB:", error);
  });