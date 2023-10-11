import { MongoClient } from "mongodb";

const MONGODB_URL = process.env.MONGODB_URL || "";
const MONGODB_DB = process.env.DB_NAME || "";

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (!MONGODB_URL) {
    throw new Error("Define the MONGODB_URL environmental variable");
  }
  if (!MONGODB_DB) {
    throw new Error("Define the DB_NAME environmental variable");
  }

  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(MONGODB_URL, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
