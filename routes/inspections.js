import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET /:id
// Get a single grade entry
router.get("/:id", async (req, res) => {
  // to access the database into the collection
  let collection = await db.collection("inspections");

  // the _id matches the id in the database and the query
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  // if no results send a message
  if (!result) res.send("Not found").status(404);
  // if you do have results send it
  else res.send(result).status(200);
});

export default router;
