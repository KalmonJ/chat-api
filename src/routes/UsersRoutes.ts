import express from "express";
import { UsersController } from "../controllers/UsersController";

export const userRoutes = express.Router();

userRoutes.put("/update/:userId", UsersController.update);
