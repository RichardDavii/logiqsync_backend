import redis from "../config/redis.js"

export const chatCodeVerification = async (req, res, next) => {

    const code = req.get('NumberChat');

    if (!code) {
        return res.status(403).send({ message: "Chat inexistente!" })
    }


    if (req.originalUrl !== '/sendInfoAnalytics' && (await redis.exists(code) == false)) {
        return res.status(404).send({ message: "Chat inexistente!" })
    }


    next();
}