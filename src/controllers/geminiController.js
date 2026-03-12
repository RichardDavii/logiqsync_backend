import { sendRequestGemini } from "../services/geminiService.js"

export const recebeDados = async (req, res) => {
    var portifolio = req.body.portifolio;
    var descVaga = req.body.descVaga;


    const response = await sendRequestGemini(portifolio, descVaga);

    response ? res.status(200).json(response) : res.status(400).json({ erro: "Não foi possivel se conectar a IA" });

}