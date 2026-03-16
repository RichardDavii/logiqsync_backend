
export const createPrompt = (portifolio, vaga) =>{

    const prompt = "Compare o currículo com a vaga e responda em JSON 'Responda APENAS com JSON válido. Não inclua explicações fora do JSON':\n" +
        "{\"match_score\": number, \"palavras_chave_ausentes\": [\"string\"], \"pontos_melhoria\": [\"string\"], \"resumo\": \"string\"}\n" +
        "CURRÍCULO:\n" + portifolio + "\n" +
        "VAGA:\n" + vaga;

        return prompt;
}