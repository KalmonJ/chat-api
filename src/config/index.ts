import * as mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connection = mongoose
  .connect(
    "mongodb+srv://kalmon:kalmon@cluster0.k0hmnyk.mongodb.net/?retryWrites=true"
  )
  .then(() => console.log("db connect succcess"))
  .catch((error) => console.log(error, "error connect db"));
