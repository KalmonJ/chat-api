import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { usersModel } from "../models/users";
import { sign } from "jsonwebtoken";

export class AuthController {
  public static async findUserByEmail(req: Request, res: Response) {
    const payload = req.body;
    const user = await usersModel.findOne({ email: payload.email });

    if (!user) {
      res.status(500).send({ error: "User not found" });
    } else {
      const auth = new AuthController();
      const matchPasswords = await auth.comparePasswords(
        payload.password,
        user
      );

      if (!matchPasswords) {
        return res.status(500).send({ error: "Email or password invalid" });
      }

      const token = auth.createJwt(user.id);

      return res.status(200).send({
        success: true,
        message: "Logged in successfully!",
        token,
        username: user.username,
        email: user.email,
        uid: user.id,
        friends: user.friends,
      });
    }
  }

  private createJwt(userId: string) {
    const token = sign({ userId }, "asodkaosdoaksdoakd", {
      expiresIn: "30min",
    });
    return token;
  }

  private async comparePasswords(password: string, user: any) {
    const match = await bcrypt.compare(password, user.password);
    return match;
  }
}
