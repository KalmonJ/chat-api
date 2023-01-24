import express from "express";
import passport from "passport";
import { connection } from "./config";
import { routes } from "./routes";
import * as passportLogic from "../src/middlewares/passport";
import cors from "cors";
import morgan from "morgan";
import _ from "lodash";
import path from "path";
import * as dotenv from "dotenv";

export const app = express();

app.use(express.static(path.join(__dirname, "../public")));
dotenv.config();

// add middlewares
app.use(passport.initialize(), cors());
app.use(morgan("dev"));
routes(app);
passportLogic;
connection;
