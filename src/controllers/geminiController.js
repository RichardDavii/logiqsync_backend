import { sendRequestGemini } from "../services/geminiService.js"
import { selectConversor } from "../utils/selectConversor.js";
import redis from "../config/redis.js";

export const recebeDados = async (req, res) => {

    const fileType = req.file.mimetype;
    const file = req.file.buffer;


    const conteudoPortifolio = await selectConversor(fileType, file);
    const conteudoDescVaga = req.body.descVaga;

    const responseGemini = await sendRequestGemini(conteudoPortifolio, conteudoDescVaga);

    responseGemini ? res.status(200).json(responseGemini) : res.status(400).json({ erro: "Não foi possivel se conectar a IA" });
}

export const getChat = async (req, res) => {

    const chatCode = req.get("NumberChat");


    const chatHistory = await redis.get(chatCode);

    //Por um && do chatCode e do chatHistory
    if (chatHistory) {
        res.status(200).json(JSON.parse(chatHistory))
    } else {
        res.status(403).send({ message: "Usuário não tem histórico salvo!" });
    }
}