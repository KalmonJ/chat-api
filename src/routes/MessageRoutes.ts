import express from "express";
import { MessageController } from "../controllers/MessageController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const [_, extension] = file.mimetype.split("/");
    cb(null, file.fieldname + Date.now() + "." + extension);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    const allowed: string[] = ["image/jpg", "image/jpeg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  },
  storage: storage,
});

export const messageRoutes = express.Router();

messageRoutes
  .post("/messages", MessageController.createMessagesFromChannel)
  .get("/messages/:conversationId", MessageController.getMessagesfromChannel)
  .post("/upload-images", upload.single("files"), MessageController.sendImage);
