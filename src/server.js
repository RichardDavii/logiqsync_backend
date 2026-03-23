import express from "express";
import bodyParser from "body-parser";
import geminiRouter from "./routes/geminiRoutes.js";
import redis from "./config/redis.js";
import cors from "cors"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(geminiRouter);

async function start() {

    await redis.connect();

    app.listen(port,
        () => console.log("SERVER RUNNING")
    );
}

start();