import { Router } from "express";
import { recebeDados, getChat, sendPrompt, resetChat } from "../controllers/geminiController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const geminiRouter = Router();

geminiRouter.post("/sendInfoAnalytics", upload.single('portifolio'), recebeDados)
geminiRouter.get("/getChat", getChat)
geminiRouter.post("/sendPrompt", sendPrompt)
geminiRouter.delete("/resetChat", resetChat)

export default geminiRouter;