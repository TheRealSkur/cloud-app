require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { CosmosClient } = require("@azure/cosmos");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);
app.use(express.json());

const port = process.env.PORT || 8081;

const endpoint = process.env.COSMOS_ENDPOINT;
const key = process.env.COSMOS_KEY;
const databaseId = process.env.COSMOS_DATABASE || "CloudTaskManagerDb";
const containerId = process.env.COSMOS_CONTAINER || "Tasks";

let container;

function createCosmosClient() {
  const isLocalEmulator =
    endpoint &&
    (endpoint.includes("localhost") ||
      endpoint.includes("127.0.0.1") ||
      endpoint.includes("cosmosdb:8081"));

  if (isLocalEmulator) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  return new CosmosClient({
    endpoint,
    key,
    connectionPolicy: isLocalEmulator
      ? {
          enableEndpointDiscovery: false,
        }
      : undefined,
  });
}

async function initCosmos() {
  if (!endpoint || !key) {
    throw new Error(
      "Brakuje COSMOS_ENDPOINT albo COSMOS_KEY w zmiennych środowiskowych."
    );
  }

  const client = createCosmosClient();

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
  console.log("Połączono z Cosmos DB");
}

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    cosmosConnected: !!container,
  });
});

app.get("/tasks", async (req, res) => {
  try {
    const { resources } = await container.items
      .query({
        query: "SELECT * FROM c ORDER BY c._ts DESC",
      })
      .fetchAll();

    res.json(resources);
  } catch (error) {
    console.error("GET /tasks error:", error);
    res.status(500).json({ message: "Błąd odczytu zadań" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { resource } = await container.item(id, id).read();

    if (!resource) {
      return res.status(404).json({ message: "Nie znaleziono zadania" });
    }

    res.json(resource);
  } catch (error) {
    console.error("GET /tasks/:id error:", error);
    res.status(500).json({ message: "Błąd odczytu zadania" });
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
      createdAt: new Date().toISOString(),
    };

    const { resource } = await container.items.create(item);
    res.status(201).json(resource);
  } catch (error) {
    console.error("POST /tasks error:", error);
    res.status(500).json({ message: "Błąd zapisu zadania" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const { resource: existingItem } = await container.item(id, id).read();

    if (!existingItem) {
      return res.status(404).json({ message: "Nie znaleziono zadania" });
    }

    const updatedItem = {
      ...existingItem,
      title:
        typeof title === "string" && title.trim()
          ? title.trim()
          : existingItem.title,
      description:
        typeof description === "string"
          ? description.trim()
          : existingItem.description,
      completed:
        typeof completed === "boolean" ? completed : existingItem.completed,
      updatedAt: new Date().toISOString(),
    };

    const { resource } = await container.items.upsert(updatedItem);
    res.json(resource);
  } catch (error) {
    console.error("PUT /tasks/:id error:", error);
    res.status(500).json({ message: "Błąd aktualizacji zadania" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await container.item(id, id).delete();

    res.status(204).send();
  } catch (error) {
    console.error("DELETE /tasks/:id error:", error);
    res.status(500).json({ message: "Błąd usuwania zadania" });
  }
});

async function startServer() {
  try {
    await initCosmos();

    app.listen(port, "0.0.0.0", () => {
      console.log(`Backend działa na porcie ${port}`);
    });
  } catch (error) {
    console.error("Błąd startu aplikacji:", error);
    process.exit(1);
  }
}

startServer();