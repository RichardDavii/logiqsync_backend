import redis from "../config/redis.js"

export const findChatHistory = async (code) =>{

    const response = await redis.get(code);
    const chatHistory = await JSON.parse(response);

    return chatHistory;

}