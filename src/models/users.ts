import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const UsersModel = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  profileImage: { type: String },
  friends: Array,
});

UsersModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this["password"] = await bcrypt.hash(this.password, 10); // encriptografando a senha criada antes de salvar no banco
});

export const usersModel = mongoose.model("users", UsersModel);
