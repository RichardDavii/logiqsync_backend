import redis from "../config/redis.js";

export const chatCodeValidation_Analytics = async (req, res, next) => {

    const idChat = req.get('NumberChat');

    if (await redis.exists(idChat)) return res.status(401).send({ message: "Chat já existente!" })

    next();
}