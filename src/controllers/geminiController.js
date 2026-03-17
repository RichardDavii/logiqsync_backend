import { sendRequestGemini } from "../services/geminiService.js"
import { selectConversor } from "../utils/selectConversor.js";
import { nanoid } from "nanoid";
import redis from "../config/redis.js";

export const recebeDados = async (req, res) => {

    const fileType = req.file.mimetype;
    const file = req.file.buffer;

    const conteudoPortifolio = await selectConversor(fileType, file);
    const conteudoDescVaga = req.body.descVaga;

    const responseGemini = await sendRequestGemini(conteudoPortifolio, conteudoDescVaga);

    if (responseGemini) {

        const chatId = nanoid();

        const data = [
            {
                role: 'user',
                parts: [{ text: conteudoPortifolio }]
            },
            {
                role: 'model',
                parts: [{ text: conteudoPortifolio }]
            }
        ]

        await redis.set(chatId, JSON.stringify(data), 'EX', 120)

        const responseData = {
            responseGemini,
            uuid: chatId
        }

        res.status(200).send(responseData);
    } else {
        res.status(400).send({ message: "Erro ao se conectar com IA" })
    }
}

export const getChat = async (req, res) => {

    const chatCode = req.get("NumberChat");
    
    const chatHistory = await redis.get(chatCode);

    if (chatHistory) {
        res.status(200).send(JSON.parse(chatHistory));
    } else {
        res.status(403).send({ message: "Usuário não tem histórico salvo!" });
    }
}