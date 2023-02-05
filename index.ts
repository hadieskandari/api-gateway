import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";

const cors = require("cors");
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;

app.use("/", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
