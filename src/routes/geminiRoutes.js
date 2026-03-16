import { Router } from "express";
import { recebeDados, getChat } from "../controllers/geminiController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const geminiRouter = Router();

geminiRouter.post("/sendInfoAnalytics", upload.single('portifolio'), recebeDados)
geminiRouter.get("/getChat", getChat)

export default geminiRouter;