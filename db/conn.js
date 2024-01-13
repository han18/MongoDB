// this is a file that hold a connection to a client or when connecting a new client

import { MongoClient } from "mongodb";

// this connecting the string in the .env file
const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log("Connecting to mongoDB"); // to see if it works
} catch (e) {
  console.error(e);
}

let db = conn.db("sample_training");

// to access this file out from other files
export default db;
