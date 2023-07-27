import express from "express";
import cors from "cors";
import routers from "./controllers/routes";
import { httpLogger } from "./middleware/logger";
import { handleFatalError } from "./middleware/errorHandler";

const app = express();

// TODO setup cors to work for local development and be secure for production
app.use(cors());

// add logger to request object
app.use(httpLogger);

// Transforms the raw string of req.body into json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Flowers API!");
});

app.use(routers);

// Need to register this as the last middleware in the stack
app.use(handleFatalError);

export default app;
