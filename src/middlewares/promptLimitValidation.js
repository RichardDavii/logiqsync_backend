import redis from "../config/redis.js"

export const promptLimitValidations = async (req, res, next) => {

    const chatHistory = await redis.get(req.idChat);
    const chatHistory_JSON = JSON.parse(chatHistory);

    if (chatHistory_JSON.countPrompts == 3) return res.status(429).send({ message: "Limite de prompts atingido! Tente novamente mais tarde!" });

    next();
}