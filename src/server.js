import express from "express";
import bodyParser from "body-parser";
import geminiRouter from "./routes/geminiRoutes.js";
mu

const app = express();

app.use(bodyParser.json());
app.use("/teste",geminiRouter);


app.listen(3000,
    () => console.log("server rodando em: http://localhost:3000")
);