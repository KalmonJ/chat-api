import express from "express";
import passport from "passport";
import { connection } from "./config";
import { routes } from "./routes";
import * as passportLogic from "../src/middlewares/passport";
import cors from "cors";

export const app = express();

app.use(passport.initialize(), cors());
routes(app);
passportLogic;
connection;
