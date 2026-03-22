import { Router } from "express";
import multer from "multer";
import { sendInfoAnalytics, getChat, sendPrompt, resetChat } from "../controllers/geminiController.js";
import { chatCodeVerification } from "../middlewares/chatCodeVerification.js";
import { chatCodeValidation_Analytics } from "../middlewares/chatCodeValidation_Analytics.js";
import { promptLimitValidations } from "../middlewares/promptLimitValidation.js";
import { errorMidleware } from "../middlewares/ErrorMidleware.js";


const storage = multer.memoryStorage();
const upload = multer({ storage });

const geminiRouter = Router();

geminiRouter.post("/sendInfoAnalytics", chatCodeValidation_Analytics, upload.single('portifolio'), sendInfoAnalytics)
geminiRouter.get("/getChat", chatCodeVerification, getChat)
geminiRouter.post("/sendPrompt", chatCodeVerification, promptLimitValidations, sendPrompt)
geminiRouter.delete("/resetChat", chatCodeVerification, resetChat)

geminiRouter.use(errorMidleware);

export default geminiRouter;