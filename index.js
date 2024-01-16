import express from "express";
import "./loadEnv.js";
import grades from "./routes/grades.js";
import inspections from "./routes/inspections.js";

// logging to see if the .env is connecting
console.log(process.env.ATLAS_URI);

// creating the app route and port
const app = express();
// process.env for external deployment route and 3009 internal for local environment
const PORT = process.env.PORT || 3009;

// Convert received data into json body
app.use(express.json());

app.use("/grades", grades);
app.use("/inspections", inspections);

// root router
app.get("/", (req, res) => {
  res.send("Welcome to MongoDB.");
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Seems like we messed up somewhere...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
