import express from "express";
import bodyParser from "body-parser";
import geminiRouter from "./routes/geminiRoutes.js";
import redis from "./config/redis.js";
import cors from "cors"

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(geminiRouter);

async function start() {

    await redis.connect();

    await app.listen(process.env.PORT,
        () => console.log("server rodando em: http://localhost:3000")
    );
}

start();