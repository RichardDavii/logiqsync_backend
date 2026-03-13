import pdfParser from "pdf-parser"

const pdfConversor = async (buffer) => { 

    const data = await pdfParser(buffer);
    return data.text;
}