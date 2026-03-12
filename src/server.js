import express from "express";
import bodyParser from "body-parser";
import geminiRouter from "./routes/geminiRoutes.js";
import redis from "./config/redis.js";


const app = express();

app.use(bodyParser.json());
app.use("/teste", geminiRouter);


async function start() {

    await redis.connect();

    app.listen(process.env.PORT,
        () => console.log("server rodando em: http://localhost:3000")
    );
}

start();