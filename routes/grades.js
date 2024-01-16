import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET /:id
// Get a single id grade entry
router.get("/:id", async (req, res) => {
  // to access the database into the collection
  let collection = await db.collection("grades");

  // the _id matches the id in the database and the objectId converts it into M-DB so we could find it in the database
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  // if no results send a message
  if (!result) res.send("Not found from grade collection").status(404);
  // if you do have results send it to the user
  else res.send(result).status(200);
});

// this is a POST request
// Create a single grade entry
router.post("/", async (req, res) => {
  let collection = await db.collection("grades");
  let newDocument = req.body;

  // rename fields for backwards compatibility
  if (newDocument.student_id) {
    newDocument.learner_id = newDocument.student_id;
    delete newDocument.student_id;
  }

  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Get a student's grade from the M-DB database //++ we did some changes in the M-DB and changed the filed from student_id to learner_id--- we changed the code to redirect the users to the new field route- we will still could use this router
router.get("/student/:id", async (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

// updating the new data field from st
router.get("/learner/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  if (!result) res.send("Not Student id found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };
  let result = await collection.find(query).toArray();

  // to get the status (404)
  if (result.length < 1) res.status(404).send("Not Found");
  else res.send(result).status(200);
});

// import it into the main index.js file to be viewed
export default router;
