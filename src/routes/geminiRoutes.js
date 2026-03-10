import { Router } from "express";
import { recebeDados } from "../controllers/geminiController.js";

const geminiRouter = Router();

geminiRouter.post("/sendInfoAnalytics", recebeDados)


export default geminiRouter;