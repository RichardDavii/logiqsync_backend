import redis from "../config/redis.js"

export const chatCodeVerification = async (req, res, next) => {

    const code = req.get('NumberChat');
    const isChatExists = await redis.exists(code);

    if (req.originalUrl !== '/sendInfoAnalytics' && (isChatExists == false)) {
        return res.status(401).send({ message: "Chat inexistente ou não autorizado" })
    } else if (req.originalUrl == '/sendInfoAnalytics' && (isChatExists == false)) {
        return next();
    }

    req.idChat = code;

    next();
}