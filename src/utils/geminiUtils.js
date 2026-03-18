
export const createPrompt = (portifolio, vaga) => {

    const prompt = "Compare o currículo com a vaga e responda em JSON 'Responda APENAS com JSON válido. Não inclua explicações fora do JSON, obs: Retorne um campo validade:true/false, para ver se o contexto da conversa é valido, se validade = false, mande apenas validade se for true mande os outros campos':\n" +
        "{\"match_score\": number, \"palavras_chave_ausentes\": [\"string\"], \"pontos_melhoria\": [\"string\"], \"resumo\": \"string\"}\n" +
        "CURRÍCULO:\n" + portifolio + "\n" +
        "VAGA:\n" + vaga;

    return prompt;
}

export const saveInfo = (portifolio, vaga) => {

    const info = "CURRÍCULO:\n" + portifolio + "\n" +
        "VAGA:\n" + vaga;

    return info;

}