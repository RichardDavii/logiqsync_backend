import { sendQuestionGemini, sendRequestGemini } from "../services/geminiService.js"
import { selectConversor } from "../utils/selectConversor.js";
import { nanoid } from "nanoid";
import redis from "../config/redis.js";
import { createPrompt, saveInfo } from "../utils/geminiUtils.js";


export const recebeDados = async (req, res) => {

    const fileType = req.file.mimetype;
    const file = req.file.buffer;
    const conteudoPortifolio = await selectConversor(fileType, file);
    const conteudoDescVaga = req.body.descVaga;
    const prompt = createPrompt(conteudoPortifolio, conteudoDescVaga);

    const responseGemini = await sendRequestGemini(prompt);

    if (responseGemini) {

        const chatId = nanoid();

        const data = [
            {
                role: 'user',
                parts: [{ text: saveInfo(conteudoPortifolio, conteudoDescVaga) }]
            },
            {
                role: 'model',
                parts: [{ text: JSON.stringify(responseGemini) }]
            }
        ]

        await redis.set(chatId, JSON.stringify(data), 'EX', (60 * 10))

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

export const sendPrompt = async (req, res) => {

    const chatId = req.get("NumberChat");

    const chatHistory = await redis.get(chatId);

    if (!chatHistory) return res.status(400).send({ message: "Chat expirado ou inexistente!" });

    const newHistoryChat = JSON.parse(chatHistory);
    newHistoryChat.push({
        role: 'user',
        parts: [{ text: req.body.prompt }]
    });

    const responseGemini = await sendQuestionGemini(newHistoryChat);

    if (!responseGemini) return res.status(500).send({ message: "Erro ao enviar o PROMPT" });

    newHistoryChat.push({
        role: 'model',
        parts: [{ text: responseGemini }]
    })

    await redis.set(chatId, JSON.stringify(newHistoryChat), "EX", (60 * 10));

    res.status(200).send({ responseGemini })
}

export const resetChat = async (req, res) => {

    const chatId = req.get('NumberChat');

    if (!await redis.exists('NumberChat')) {
        return res.status(404).send({ message: "Conversa inexistente!" })
    }
    
    try {
        await redis.del(chatId);

        res.status(200).send({ message: "Conversa resetada com sucesso" })
    } catch (erro) {

        res.status(500).send({ message: "Não foi possivel resetar a conversa!" })
    }


}