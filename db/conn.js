// this is a file that hold a connection to a client or when connecting a new client
// .env file links the database this file creates a database.. in this case we created a new database called "simple_training"
// this file has access to the database of grades
import { MongoClient } from "mongodb";

// Connecting the string in the .env file
const connectionString = process.env.ATLAS_URI || "";

// new connection from the database
const client = new MongoClient(connectionString);

// this is connecting the database
let conn;
try {
  conn = await client.connect();
  console.log("Connecting to mongoDB"); // to see if it works
} catch (e) {
  console.error(e);
}

// this is creating the database with the name sample_training.
let db = conn.db("sample_training");

// exporting the files anywhere we ant to access the database
export default db;
