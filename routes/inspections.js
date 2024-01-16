import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

/// ======== My Practice code ====
// this retrieves 50 data from the document inspections
router.get("/", async (req, res) => {
  let collection = await db.collection("inspections");
  let results = await collection.find({}).limit(50).toArray();

  if (!results) res.send("This is an inspection file").status(404);
  else res.send(results).status(200);
});
// ======= end of the practice =====

// GET getting data by the id /:id
// Get a single grade entry
router.get("/:id", async (req, res) => {
  // to access the database into the collection
  let collection = await db.collection("inspections");

  // the _id matches the id in the database and the query
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  // if no results send a message
  if (!result) res.send("Not found from inspections collections").status(404);
  // else if there are results send it to user
  else res.send(result).status(200);
});

// import it in the main index.js file
export default router;
