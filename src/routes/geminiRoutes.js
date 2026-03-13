import { Router } from "express";
import { recebeDados } from "../controllers/geminiController.js";
import multer from "multer";

const upload = multer();
const geminiRouter = Router();

geminiRouter.post("/sendInfoAnalytics",upload.single('file'), recebeDados)


export default geminiRouter;