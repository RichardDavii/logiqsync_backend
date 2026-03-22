import { sendQuestionGemini, sendRequestGemini } from "../services/geminiService.js"
import { selectConversor } from "../utils/selectConversor.js";
import { nanoid } from "nanoid";
import redis from "../config/redis.js";
import { createMemoryChat, createPrompt } from "../utils/geminiUtils.js";


export const recebeDados = async (req, res) => {

    const fileType = req.file.mimetype;
    const file = req.file.buffer;
    const conteudoPortifolio = await selectConversor(fileType, file);
    const conteudoDescVaga = req.body.descVaga;
    const prompt = createPrompt(conteudoPortifolio, conteudoDescVaga);

    const responseGemini = await sendRequestGemini(prompt);

    if (responseGemini) {

        const chatId = nanoid();
        const data = createMemoryChat(conteudoPortifolio, conteudoDescVaga, responseGemini)

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

    const chatHistory = req.chatHistory;

    res.status(200).send(chatHistory.data);
}

export const sendPrompt = async (req, res) => {

    const chatId = req.idChat;

    const chatHistory = req.chatHistory;

    chatHistory.data.push({
        role: 'user',
        parts: [{ text: req.body.prompt }]
    });

    const responseGemini = await sendQuestionGemini(chatHistory.data);

    if (!responseGemini) return res.status(500).send({ message: "Erro ao enviar o PROMPT" });

    chatHistory.data.push({
        role: 'model',
        parts: [{ text: responseGemini }]
    })

    chatHistory.countPrompts += 1;

    console.log(chatHistory);

    await redis.set(chatId, JSON.stringify(chatHistory), 'KEEPTTL');

    res.status(200).send({ responseGemini })
}

export const resetChat = async (req, res) => {

    const chatId = req.idChat;

    try {
        await redis.del(chatId);

        res.status(200).send({ message: "Conversa resetada com sucesso" })
    } catch (erro) {

        res.status(500).send({ message: "Não foi possivel resetar a conversa!" })
    }
}