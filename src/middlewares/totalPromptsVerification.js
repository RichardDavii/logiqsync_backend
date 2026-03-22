import redis from "../config/redis.js"

export const totalPromptsVerification = async (req, res, next) => {


    if (req.originalUrl == '/sendInfoAnalytics' || req.originalUrl == '/resetChat') {
        return next()
    }

    const response = await redis.get(req.idChat);
    const chatHistory = await JSON.parse(response);

    if (chatHistory.countPrompts == 10) {
        return res.status(429).send({ message: "Limite de prompts atingido! tente novamente mais tarde!" })
    }

    req.chatHistory = chatHistory;

    next();

}