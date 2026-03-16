import genai from "../config/gemini.js";
import { createPrompt } from "../utils/geminiUtils.js";

export const sendRequestGemini = async (portifolio, descVaga) => {

    const prompt = createPrompt(portifolio, descVaga);

    try {
        const response = await genai.models.generateContent({
            contents: prompt,
            model: "gemini-3-flash-preview",
            config: {
                responseMimeType: "application/json"
            },
        })
        const resultado = response.candidates[0].content.parts[0].text;

        return JSON.parse(resultado);
    } catch (erro) {
        console.log("Erro: ", erro);
        return null;
    }

}

