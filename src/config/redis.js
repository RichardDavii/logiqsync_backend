import Redis from "ioredis";

const redis = new Redis({
    username: process.env.REDIS_USERNSME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    db: 0
});

redis.on("ready", () => console.log("Redis conectado"));

