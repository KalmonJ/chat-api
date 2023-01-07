import cors from "cors";

const allowedOrigins = ["http://localhost:3000", "http://DESKTOP-N83EHF3:3000"];
const corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;
  console.log(req.header("Origin"));
  if (allowedOrigins.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
export const middlecors = cors();
export const corsWithOptions = cors(corsOptionsDelegate);
