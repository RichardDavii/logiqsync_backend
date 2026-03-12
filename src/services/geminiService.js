import genai from "../config/gemini.js";

export const sendRequestGemini = async (portifolio, descVaga) => {

    const prompt = "Compare o currículo com a vaga e responda em JSON 'Responda APENAS com JSON válido. Não inclua explicações fora do JSON':\n" +
        "{\"match_score\": number, \"palavras_chave_ausentes\": [\"string\"], \"pontos_melhoria\": [\"string\"], \"resumo\": \"string\"}\n" +
        "CURRÍCULO:\n" + portifolio + "\n" +
        "VAGA:\n" + descVaga;

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