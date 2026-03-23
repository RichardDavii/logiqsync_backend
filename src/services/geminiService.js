import genai from "../config/gemini.js";

export const sendRequestGemini = async (prompt) => {

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

export const sendQuestionGemini = async (chatHistory) => {

    try {

        const chatHistoryWithPrompt = structuredClone(chatHistory);
        chatHistoryWithPrompt[chatHistory.length - 1].parts[0].text += ` (Retorne apenas um json com um atributo chamado resposta, e a sua opiniao resumida, caso a pergunta não tenha nada a ver com tecnologia retorne "não posso responder isso")`

        const response = await genai.models.generateContent({
            contents: chatHistoryWithPrompt,
            model: "models/gemini-3-flash-preview"
        })
        const data = response.candidates[0].content.parts[0].text;

        return data

    } catch (error) {
        console.log("Erro no gemini", error)
        return null
    }
}

