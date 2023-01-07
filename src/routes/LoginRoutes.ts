import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UsersController } from "../controllers/UsersController";
import * as cors from "../middlewares/cors";

export const loginRoutes = express.Router();

loginRoutes
  .post("/signin", cors.corsWithOptions, AuthController.findUserByEmail)
  .post("/signup", UsersController.create)
  .get("/users", UsersController.getAllUsers);
