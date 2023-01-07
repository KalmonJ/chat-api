import { Request, Response } from "express";
import { usersModel } from "../models/users";

export class UsersController {
  public static create(req: Request, res: Response) {
    const user = new usersModel(req.body);

    user.save((error) => {
      if (!error) {
        res.status(201).send(user.toJSON());
      } else {
        res.status(500).send({ error });
      }
    });
  }

  public static async getAllUsers(req: Request, res: Response) {
    const users = await usersModel.find();

    if (!users) {
      return res.status(404).send({ error: "Users not found" });
    }

    return res.status(200).send({ users });
  }
}
