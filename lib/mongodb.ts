import { MongoClient, type Db } from "mongodb";

// One MongoClient per server process. In dev, Next.js hot reload re-runs
// modules, so the client is parked on globalThis to avoid piling up pools.
const globalForMongo = globalThis as unknown as { _mongoClient?: Promise<MongoClient> };

function clientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (see .env.example)");
  globalForMongo._mongoClient ??= new MongoClient(uri, { appName: "TangLak" }).connect();
  return globalForMongo._mongoClient;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise();
  return client.db(process.env.MONGODB_DB ?? "tanglak");
}
