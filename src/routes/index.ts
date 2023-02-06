import express from "express";
import { channelRoutes } from "./ChannelRoutes";
import { loginRoutes } from "./LoginRoutes";
import { messageRoutes } from "./MessageRoutes";
import { userRoutes } from "./UsersRoutes";

export const routes = (app: express.Application) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "hello world" });
  });
  app.use(
    express.json(),
    loginRoutes,
    channelRoutes,
    messageRoutes,
    userRoutes
  ); // usando rotas existentes
}; // iniciando as rotas
