import redis from "../config/redis.js"

export const chatCodeVerification = async (req, res, next) => {

    const code = req.get('NumberChat');
    const isChatExists = await redis.exists(code);

    if (isChatExists == false) return res.status(404).send({ message: "Chat inexistente!" })

    req.idChat = code;

    next();
}